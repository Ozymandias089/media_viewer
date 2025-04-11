import { Controller, Get, Param, Render } from '@nestjs/common';
import { ExplorerService } from './explorer.service';
import { getBreadcrumbs } from 'src/utils/path-utils';
import { Breadcrumb, FileItem } from 'src/utils/types';
import { ExplorerResponseDto } from './dto/explorer-response.dto';

@Controller()
export class ExplorerController {
  constructor(private readonly explorerService: ExplorerService) {}

  /**
   * 루트 페이지 (홈) 렌더링
   * @returns 홈 디렉토리 탐색 결과
   */
  @Get()
  @Render('index')
  getHome(): ExplorerResponseDto {
    const items: FileItem[] = this.explorerService.getExplorerItems();
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs('');
    return new ExplorerResponseDto(items, breadcrumbs);
  }

  /**
   * 하위 경로 탐색 뷰
   * @param pathParam 탐색할 경로 (URL 인코딩된 문자열)
   * @returns 탐색 디렉토리의 항목 목록 및 breadcrumb
   */
  @Get('browse/*path')
  @Render('index')
  getFolder(@Param('path') pathParam: string | string[]): ExplorerResponseDto {
    const items: FileItem[] = this.explorerService.getExplorerItems(pathParam);
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs(pathParam);
    return new ExplorerResponseDto(items, breadcrumbs);
  }
}