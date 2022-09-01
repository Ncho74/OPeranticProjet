import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials:true,
    origin:"http://127.0.0.1:4200"
  } )
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
