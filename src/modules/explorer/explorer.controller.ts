import { Controller, Get, Render } from '@nestjs/common';
import { ExplorerService } from './explorer.service';

@Controller()
export class ExplorerController {
  constructor(private readonly explorerService: ExplorerService) {}

  @Get()
  @Render('index')
  getHome() {
    const items = this.explorerService.getExplorerItems();
    return {
      title: 'My File Explorer',
      items,
    };
  }
}