// src/modules/explorer/dto/explorer-response.dto.ts
import { Breadcrumb, FileItem } from 'src/utils/types';

/**
 * Explorer 페이지 응답 DTO
 */
export class ExplorerResponseDto {
  /**
   * 현재 디렉토리 또는 파일 목록
   */
  items: FileItem[];

  /**
   * 탐색 경로를 나타내는 breadcrumb 목록
   */
  breadcrumbs: Breadcrumb[];

  constructor(items: FileItem[], breadcrumbs: Breadcrumb[]) {
    this.items = items;
    this.breadcrumbs = breadcrumbs;
  }
}
