import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as initialize_env } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
initialize_env();
bootstrap();
