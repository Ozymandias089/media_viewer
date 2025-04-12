// src/modules/explorer/dto/explorer-response.dto.ts
import { FileItem } from 'src/utils/types';
import { FileItemDto } from './file-item.dto';
import { BreadcrumbDto } from './breadcrumb.dto';

/**
 * Explorer 페이지 응답 DTO
 */
export class ExplorerResponseDto {
  /**
   * 현재 디렉토리 또는 파일 목록
   */
  items: FileItemDto[];

  /**
   * 탐색 경로를 나타내는 breadcrumb 목록
   */
  breadcrumbs: BreadcrumbDto[];

  constructor(items: FileItem[], breadcrumbs: BreadcrumbDto[]) {
    this.items = items;
    this.breadcrumbs = breadcrumbs;
  }
}
