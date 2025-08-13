import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as mongoose from 'mongoose';

import { AppLogger } from '@shared/logger/logger.service';

@Injectable()
export class MongoConfigService {
  private readonly logger = new AppLogger(this.constructor.name);

  constructor(private readonly config: ConfigService) { }

  getMongoURI(): string {
    // Directly return MongoDB Atlas URI for Render deployment
    return "mongodb+srv://printapp:printapppw@cluster0.ignmi9w.mongodb.net/skylarbox?retryWrites=true&w=majority";
  }

  getMongoOptions(): Record<string, unknown> {
    // Return empty options since URI already has credentials
    return {};
  }

  // Avoid opening a connection here; connection is managed by MongooseModule.forRootAsync
  async testConnection(): Promise<void> {
    const uri = this.getMongoURI();
    this.logger.debug(`Mongo URI configured: ${uri ? 'provided' : 'missing'}`);
  }
}
