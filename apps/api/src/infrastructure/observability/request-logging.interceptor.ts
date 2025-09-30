import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logging: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const start = process.hrtime.bigint();

    this.logging.info('Request started', {
      method: request.method,
      path: request.originalUrl ?? request.url,
    });

    return next.handle().pipe(
      tap(() => {
        const durationMs = this.getDurationMs(start);
        this.logging.info('Request completed', {
          method: request.method,
          path: request.originalUrl ?? request.url,
          statusCode: response.statusCode,
          durationMs,
        });
      }),
      catchError((err: unknown) => {
        const durationMs = this.getDurationMs(start);
        this.logging.error('Request failed', err, {
          method: request.method,
          path: request.originalUrl ?? request.url,
          statusCode: response.statusCode,
          durationMs,
        });
        return throwError(() => err);
      }),
    );
  }

  private getDurationMs(start: bigint): number {
    const diff = process.hrtime.bigint() - start;
    return Number(diff) / 1_000_000;
  }
}
