import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import 'tsconfig-paths/register';

import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';

import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { TracerIdInterceptor } from '@common/interceptors/tracer.interceptor';
import { setupSwagger } from '@common/swagger/swagger.config';

import { AppLogger } from '@shared/logger/logger.service';

import { AppModule } from './app.module';

declare const module: {
  hot: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(express.json({ limit: '5mb' }));
  app.enableCors({
    origin: '*',
    // Align with interceptor and controllers: single lowercase header 'tracer'
    allowedHeaders: 'Content-Type, Authorization, tracer',
  });
  setupSwagger(app);

  app.useGlobalInterceptors(new TracerIdInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {},
    }),
  );
  app.useLogger(new AppLogger('EKATE-CORE'));
  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
