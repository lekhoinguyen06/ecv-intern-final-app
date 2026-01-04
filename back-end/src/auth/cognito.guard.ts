// auth/cognito.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import jwksClient from "jwks-rsa"

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  private jwks

  constructor() {
    this.jwks = jwksClient({
      jwksUri: `https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_4G7kcguGH/.well-known/jwks.json`,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 24 * 60 * 60 * 1000,
      rateLimit: true,
      jwksRequestsPerMinute: 10
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers["authorization"]
    if (!authHeader) throw new UnauthorizedException("Missing Authorization header")

    const token = authHeader.replace("Bearer ", "")
    const decoded: any = jwt.decode(token, { complete: true })
    if (!decoded) throw new UnauthorizedException("Invalid token")

    const kid = decoded.header.kid

    // Lấy key từ JWKS (không ép kiểu CertSigningKey)
    const key = await this.jwks.getSigningKey(kid)
    const publicKey = key.getPublicKey() // <- getPublicKey() luôn có sẵn

    try {
      jwt.verify(token, publicKey, { algorithms: ["RS256"] })
      return true
    } catch (err) {
      throw new UnauthorizedException("Token verification failed")
    }
  }
}
