import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwksRsa from 'jwks-rsa';
import jwt from 'jsonwebtoken';

const region = process.env.COGNITO_REGION || 'ap-southeast-1';
const userPoolId = process.env.COGNITO_USER_POOL_ID || 'ap-southeast-1_4G7kcguGH';
const clientId = process.env.COGNITO_APP_CLIENT_ID || '5kuv35ke2b3jvggf65rhu52t9e';
const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
const jwksUri = `${issuer}/.well-known/jwks.json`;

const jwksClient = jwksRsa({
  jwksUri,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 10 * 60 * 1000,
});

function getKey(header: any, callback: (err: Error | null, key?: string) => void) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = (key as any).getPublicKey();
    callback(null, signingKey);
  });
}

@Injectable()
export class CognitoAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = (req.headers['authorization'] || req.headers['Authorization']) as string | undefined;
      if (!authHeader) throw new UnauthorizedException('Missing Authorization header');

      const m = authHeader.match(/^Bearer (.+)$/);
      if (!m) throw new UnauthorizedException('Invalid Authorization header format');

      const token = m[1];

      jwt.verify(
        token,
        getKey as any,
        {
          issuer,
        },
        (err, decoded: any) => {
          if (err) {
            res.status(401).json({ message: 'Invalid token', detail: err.message });
            return;
          }
          if (decoded.token_use !== 'access') {
            res.status(401).json({ message: 'Invalid token_use' });
            return;
          }
          if (decoded.client_id !== clientId) {
            res.status(401).json({ message: 'Invalid client_id' });
            return;
          }

          (req as any).user = decoded;
          next();
        },
      );
    } catch (e: any) {
      res.status(401).json({ message: e?.message || 'Unauthorized' });
    }
  }
}
