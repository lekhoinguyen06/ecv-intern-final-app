import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SuccessResponseDTO } from 'src/dto/res.dto';
export declare class SuccessResponseTransformInterceptor<T> implements NestInterceptor<T, SuccessResponseDTO<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponseDTO<T>>;
}
