import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModuleSetup } from './config';
import { LoggerModule } from '@shared/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { MongoConfigModule } from './config/mongo/mongo.module';
import { MongoConfigService } from './config/mongo/mongo.service';
import { PartnersModule } from './modules/partners/partners.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FeaturedBoxesModule } from './modules/featured-boxes/featured-boxes.module';
import { BlogModule } from './modules/blog/blog.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
    PartnersModule,
    ProductsModule,
    CategoriesModule,
    FeaturedBoxesModule,
    BlogModule,
    TestimonialsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
  ],
})
export class AppModule { }
