import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as mongoose from 'mongoose';

import { AppLogger } from '@shared/logger/logger.service';

@Injectable()
export class MongoConfigService {
  private readonly logger = new AppLogger(this.constructor.name);

  constructor(private readonly config: ConfigService) { }

  getMongoURI(): string {
    return this.config.get<string>('dbConfig.mongo.host');
  }

  getMongoOptions(): Record<string, unknown> {
    return {
      user: this.config.get<string>('dbConfig.mongo.options.user'),
      pass: this.config.get<string>('dbConfig.mongo.options.pass'),
      authSource: this.config.get<string>('dbConfig.mongo.options.auth.authdb'),
    };
  }

  // Avoid opening a connection here; connection is managed by MongooseModule.forRootAsync
  async testConnection(): Promise<void> {
    const uri = this.getMongoURI();
    this.logger.debug(`Mongo URI configured: ${uri ? 'provided' : 'missing'}`);
  }
}
