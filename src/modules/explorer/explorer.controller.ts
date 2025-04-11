import { Controller, Get, Render } from '@nestjs/common';
import { ExplorerService } from './explorer.service';
import { getBreadcrumbs } from 'src/utils/path-utils';
import { Breadcrumb, FileItem } from 'src/utils/types';

@Controller()
export class ExplorerController {
  constructor(private readonly explorerService: ExplorerService) {}

  @Get()
  @Render('index')
  getHome() {
    const items: FileItem[] = this.explorerService.getExplorerItems();
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs('');
    return {
      title: 'My File Explorer',
      items,
      breadcrumbs,
    };
  }
}