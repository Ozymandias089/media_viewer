import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExplorerModule } from './modules/explorer/explorer.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'content'),
      serveRoot: '/content',
    }),
    ExplorerModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
