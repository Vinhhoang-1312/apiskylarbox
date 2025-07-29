import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracerIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest();
    const response: Response = httpContext.getResponse();
    const tracerId = request.headers['tracerId'] || uuidv4();

    request.headers['tracer'] = tracerId;
    response.setHeader('tracer', tracerId);

    return next.handle();
  }
}
