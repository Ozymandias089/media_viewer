import { Controller, Get, Param, Render } from '@nestjs/common';
import { ExplorerService } from './explorer.service';
import { getBreadcrumbs } from 'src/utils/path-utils';
import { ExplorerResponseDto } from './dto/explorer-response.dto';
import { FileItemDto } from './dto/file-item.dto';
import { BreadcrumbDto } from './dto/breadcrumb.dto';

@Controller()
export class ExplorerController { // TODO: 결과에 폴더가 있으면 폴더 썸네일도 받아오기.
  constructor(private readonly explorerService: ExplorerService) {}

  /**
   * 홈 디렉터리(루트 경로)를 탐색합니다.
   * 
   * - index 템플릿을 렌더링합니다.
   * - 루트 디렉터리의 파일 및 폴더 목록을 가져옵니다.
   * - 'Home'만 포함된 기본 빵부스러기(Breadcrumb)를 생성합니다.
   * 
   * @returns ExplorerResponseDto - 파일 항목과 빵부스러기 정보를 포함한 응답 객체
   */
  @Get()
  @Render('index')
  getHome(): ExplorerResponseDto {
    const items: FileItemDto[] = this.explorerService.getExplorerItems();
    const breadcrumbs: BreadcrumbDto[] = getBreadcrumbs('');
    return new ExplorerResponseDto(items, breadcrumbs);
  }

  /**
   * 특정 하위 디렉터리를 탐색합니다.
   * 
   * - index 템플릿을 렌더링합니다.
   * - 경로 파라미터를 기반으로 해당 폴더의 파일 및 폴더 목록을 가져옵니다.
   * - 경로에 따른 빵부스러기(Breadcrumb)를 생성합니다.
   * 
   * @param pathParam - 탐색할 하위 경로. 문자열 또는 문자열 배열 형태로 전달됩니다.
   * @returns ExplorerResponseDto - 파일 항목과 빵부스러기 정보를 포함한 응답 객체
   */
  @Get('browse/*path')
  @Render('index')
  getFolder(@Param('path') pathParam: string | string[]): ExplorerResponseDto {
    const items: FileItemDto[] = this.explorerService.getExplorerItems(pathParam);
    const breadcrumbs: BreadcrumbDto[] = getBreadcrumbs(pathParam);
    return new ExplorerResponseDto(items, breadcrumbs);
  }
}