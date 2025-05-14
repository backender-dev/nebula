import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FileModule } from './modules/file/file.module';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const apiPrefix = process.env.API_PREFIX || 'api';

  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.enableCors({
    origin: process.env.CORS_URI_LIST?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
  });

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerDocs = [
    {
      title: 'Nebula API',
      description: 'Nebula API description',
      version: 'v1',
      endpoint: 'swagger',
      include: [FileModule],
    },
  ];

  for (const item of swaggerDocs) {
    const options = new DocumentBuilder()
      .setTitle(item.title)
      .setDescription(item.description)
      .setVersion(item.version)
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      include: item.include,
    });
    SwaggerModule.setup(item.endpoint, app, document);
    SwaggerModule.setup(item.endpoint, app, document, {
      useGlobalPrefix: true,
    });
  }

  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
