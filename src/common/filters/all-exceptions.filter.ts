import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { AppLogger } from '../../shared/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new AppLogger(this.constructor.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = exception['response'] || {};
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.logger.setContext(response['name'] || 'Request Error');
    this.logger.error(response['message'], response['tracerId']);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    httpAdapter.reply(ctx.getResponse(), exception['response'], httpStatus);
  }
}
