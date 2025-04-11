import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Decode + Static file serving
  app.use(
    '/content', 
    (req, res, next) => {
      req.url = decodeURIComponent(req.url);
      next();
    },
    express.static(join(__dirname, '..', 'content'))
  );

  await app.listen(3000);
}
bootstrap();
