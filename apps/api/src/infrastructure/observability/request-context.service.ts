import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { RequestContext } from './request-context.types';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  run(context: RequestContext, callback: () => void): void {
    this.storage.run(context, callback);
  }

  setContext(values: Partial<RequestContext>): void {
    const store = this.storage.getStore();
    if (store) {
      Object.assign(store, values);
    }
  }

  getRequestId(): string | undefined {
    return this.storage.getStore()?.requestId;
  }
}
