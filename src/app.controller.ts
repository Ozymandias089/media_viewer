import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index') // index.hbs
  getHome() {
    return {
      title: 'My File Explorer',
      items: [
        { name: 'Documents', description: '폴더입니다.' },
        { name: 'project.ts', description: '타입스크립트 파일' },
        { name: 'image.png', description: '이미지 파일' },
        { name: 'Documents', description: '폴더입니다.' },
        { name: 'project.ts', description: '타입스크립트 파일' },
        { name: 'image.png', description: '이미지 파일' },
        { name: 'Documents', description: '폴더입니다.' },
        { name: 'project.ts', description: '타입스크립트 파일' },
        { name: 'image.png', description: '이미지 파일' },
        { name: 'Documents', description: '폴더입니다.' },
        { name: 'project.ts', description: '타입스크립트 파일' },
        { name: 'image.png', description: '이미지 파일' },
        { name: 'Documents', description: '폴더입니다.' },
        { name: 'project.ts', description: '타입스크립트 파일' },
        { name: 'image.png', description: '이미지 파일' },
        { name: 'Documents', description: '폴더입니다.' },
        { name: 'project.ts', description: '타입스크립트 파일' },
        { name: 'image.png', description: '이미지 파일' },
      ]
    };
  }
}
