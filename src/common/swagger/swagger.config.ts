import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the NestJS application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'header',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  document.paths = Object.entries(document.paths).reduce(
    (acc, [path, methods]) => {
      Object.values(methods).forEach((method: any) => {
        method.security = method.security || [{ Authorization: [] }];
      });
      acc[path] = methods;
      return acc;
    },
    {},
  );

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
