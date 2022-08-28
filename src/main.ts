import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as initialize_env } from 'dotenv';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(3000);
}
initialize_env();
bootstrap();

// TODO: Implement video stream
// TODO: Implement views count
