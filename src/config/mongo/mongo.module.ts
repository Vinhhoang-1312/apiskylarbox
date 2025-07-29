import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoConfigService } from './mongo.service';

@Module({
  imports: [ConfigModule],
  providers: [MongoConfigService],
  exports: [MongoConfigService],
})
export class MongoConfigModule {}
