import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as csurf from 'csurf';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(csurf());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log('Application is running on port:', process.env.PORT);
}
bootstrap();