import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { RequestContextService } from './request-context.service';

type LogPayload = Record<string, unknown>;

@Injectable()
export class LoggingService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly context: RequestContextService,
  ) {}

  debug(message: string, payload?: LogPayload): void {
    this.logger.debug(this.enrich(payload), message);
  }

  info(message: string, payload?: LogPayload): void {
    this.logger.info(this.enrich(payload), message);
  }

  warn(message: string, payload?: LogPayload): void {
    this.logger.warn(this.enrich(payload), message);
  }

  error(message: string, error: unknown, payload?: LogPayload): void {
    const base = this.enrich(payload);

    if (error instanceof Error) {
      this.logger.error({ ...base, err: error }, message);
    } else {
      this.logger.error({ ...base, err: { value: error } }, message);
    }
  }

  private enrich(payload: LogPayload = {}): LogPayload {
    const requestId = this.context.getRequestId();
    return requestId ? { requestId, ...payload } : { ...payload };
  }
}
