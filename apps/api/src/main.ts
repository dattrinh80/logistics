import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { initializeTelemetry } from './observability/telemetry';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  initializeTelemetry();

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.use(helmet());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`API listening on port ${port}`, 'Bootstrap');
}

void bootstrap();
