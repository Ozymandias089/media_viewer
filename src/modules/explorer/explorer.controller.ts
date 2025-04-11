import { Controller, Get, Param, Render } from '@nestjs/common';
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

  @Get('browse/*path')
  @Render('index')
  getFolder(@Param('path') params: any) {
    const subPath: string = decodeURIComponent(params[0] || '');
    const items: FileItem[] = this.explorerService.getExplorerItems(subPath);
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs(subPath);

    return {
      title: `Folder: ${subPath || 'Home'}`,
      items,
      breadcrumbs,
    };
  }
}