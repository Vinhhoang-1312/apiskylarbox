import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  private readonly winstonLogger: winston.Logger;
  private tracerId: string | null = null;

  constructor(context: string) {
    super();
    this.context = context;
    this.winstonLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}] ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logs/application.log' }),
      ],
    });
  }

  private getTracerId(): string {
    if (!this.tracerId) {
      this.tracerId = uuidv4();
    }
    return this.tracerId;
  }

  private resultLogs(message: string, tracerId?: string): string {
    tracerId = tracerId || this.getTracerId();
    const finalMessage = ` ${message} - [${tracerId}]`;
    return finalMessage;
  }

  log(message: string, tracerId?: string): void {
    const logMessage = this.resultLogs(message, tracerId);
    const context = this.context;
    super.log(logMessage, context);
    this.winstonLogger.info(`${context} - ${logMessage}`);
  }

  error(message: string, tracerId?: string): void {
    const logMessage = this.resultLogs(message, tracerId);
    const context = this.context;
    super.error(logMessage, context);
    this.winstonLogger.error(`${context} - ${logMessage}`);
  }

  warn(message: string, tracerId?: string): void {
    const logMessage = this.resultLogs(message, tracerId);
    const context = this.context;
    super.warn(logMessage, context);
    this.winstonLogger.warn(`${context} - ${logMessage}`);
  }

  debug(message: string, tracerId?: string): void {
    const logMessage = this.resultLogs(message, tracerId);
    const context = this.context;
    super.debug(logMessage, context);
    this.winstonLogger.debug(`${context} - ${logMessage}`);
  }

  verbose(message: string, tracerId?: string): void {
    const logMessage = this.resultLogs(message, tracerId);
    const context = this.context;
    super.verbose(logMessage, context);
    this.winstonLogger.verbose(`${context} - ${logMessage}`);
  }
}
