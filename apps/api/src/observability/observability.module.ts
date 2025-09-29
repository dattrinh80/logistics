import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { randomUUID } from 'crypto';
import type { IncomingMessage, ServerResponse } from 'http';
import { LoggerModule } from 'nestjs-pino';
import { LoggingService } from './logging.service';
import { RequestContextMiddleware } from './request-context.middleware';
import { RequestContextService } from './request-context.service';
import { RequestLoggingInterceptor } from './request-logging.interceptor';

type RequestWithId = IncomingMessage & { requestId?: string };

type ResponseWithStatus = ServerResponse & { statusCode: number };

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          level: process.env.LOG_LEVEL ?? 'info',
          autoLogging: false,
          base: {
            service: process.env.APP_NAME ?? 'logistics-api',
            environment: process.env.NODE_ENV ?? 'development',
          },
          transport:
            process.env.NODE_ENV === 'production'
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: true,
                    translateTime: 'SYS:standard',
                  },
                },
          genReqId: (req: RequestWithId) => req.requestId ?? randomUUID(),
          customProps: (req: RequestWithId) => ({
            requestId: req.requestId,
          }),
          serializers: {
            req(request: RequestWithId) {
              return {
                method: request.method,
                url: request.url,
                requestId: request.requestId,
              };
            },
            res(response: ResponseWithStatus) {
              return {
                statusCode: response.statusCode,
              };
            },
          },
        },
      }),
    }),
  ],
  providers: [
    LoggingService,
    RequestContextMiddleware,
    RequestContextService,
    RequestLoggingInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
  exports: [LoggingService, RequestContextMiddleware, RequestContextService],
})
export class ObservabilityModule {}
