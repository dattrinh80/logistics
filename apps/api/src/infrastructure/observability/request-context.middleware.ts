import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from './request-context.service';

interface RequestWithContext extends Request {
  requestId?: string;
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContextService) {}

  use(req: RequestWithContext, res: Response, next: NextFunction): void {
    const headerId = this.extractRequestId(req);
    const requestId = headerId ?? randomUUID();

    req.requestId = requestId;
    req.id = requestId;
    res.setHeader('x-request-id', requestId);

    this.context.run({ requestId }, () => {
      next();
    });
  }

  private extractRequestId(req: Request): string | undefined {
    const header = req.header('x-request-id') ?? req.header('x-requestid');
    return header && header.length > 0 ? header : undefined;
  }
}
