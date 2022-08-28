import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as initialize_env } from 'dotenv';
import { connectDatabase } from './database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectDatabase();
  await app.listen(3000);
}
initialize_env();
bootstrap();
