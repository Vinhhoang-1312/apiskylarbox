import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModuleSetup } from './config';
import { LoggerModule } from '@shared/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { MongoConfigModule } from './config/mongo/mongo.module';
import { MongoConfigService } from './config/mongo/mongo.service';

@Module({
  imports: [
    ConfigModuleSetup,
    LoggerModule,
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => {
        await mongoConfigService.testConnection();
        return {
          uri: mongoConfigService.getMongoURI(),
          ...mongoConfigService.getMongoOptions(),
        };
      },
      inject: [MongoConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
