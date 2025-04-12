// src/modules/explorer/explorer.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Extension, FileItem, FileType } from '../../utils/types';
import { FileItemDto } from './dto/file-item.dto';
import { getFileType } from 'src/utils/file-utils';

@Injectable()
export class ExplorerService {
  private readonly contentPath = path.join(process.cwd(), 'content');

  /**
   * 주어진 경로에 있는 디렉터리 및 파일 항목을 탐색하여 DTO 배열로 반환합니다.
   * 
   * - 경로가 없을 경우 루트 디렉터리를 탐색합니다.
   * - 디렉터리/파일을 필터링 및 정렬하고 FileItemDto로 변환합니다.
   * - 탐색 중 오류가 발생하면 NotFoundException을 던집니다.
   * 
   * @param pathParam - 탐색할 경로 (문자열 또는 문자열 배열)
   * @returns FileItemDto[] - 파일 및 폴더 항목 DTO 배열
   * @throws NotFoundException - 경로가 유효하지 않거나 접근할 수 없는 경우
   */
  getExplorerItems(pathParam: string | string[] = ''): FileItemDto[] {
    const subPath: string = Array.isArray(pathParam) ? pathParam.join('/') : pathParam;
    const targetPath: string = path.join(this.contentPath, subPath);

    try {
      const entries: fs.Dirent[] = fs.readdirSync(targetPath, { withFileTypes: true });

      const items: FileItemDto[] = entries
        .map((entry) => this.createItem(entry, subPath))
        .filter((item): item is FileItem => item !== null)
        .filter(item => item.name !== 'thumbs')
        .sort((a, b) => this.sortItems(a, b));

      return items;
    } catch (error) {
      console.error('파일 탐색 중 오류:', error.message);
      throw new NotFoundException(`경로를 찾을 수 없습니다: ${subPath}`);
    }
  }

  /**
   * 파일 시스템 항목(파일 또는 디렉터리)을 FileItemDto로 변환합니다.
   * 
   * - 디렉터리일 경우 썸네일 존재 여부를 확인합니다.
   * - 파일일 경우 확장자 기반으로 FileType을 판별합니다.
   * - 파일이 아니거나 디렉터리가 아닌 경우(null) 반환합니다.
   * 
   * @param entry - fs.Dirent 객체
   * @param parentPath - 부모 경로 (상대 경로 기준)
   * @returns FileItemDto | null - 변환된 DTO 객체 또는 처리 불가한 항목은 null
   */
  private createItem(entry: fs.Dirent, parentPath: string): FileItemDto | null {
    const name: string = entry.name;
    const encodedName: string = encodeURIComponent(name);
    const fullPath: string = parentPath ? `${parentPath}/${encodedName}` : encodedName;

    if (entry.isDirectory()) {
      const dirParts = parentPath ? `${parentPath.replace(/\//g, '(__)')}(__)${name}` : name;
      const thumbnailUrl: string | undefined = this.getThumbnailUrl(dirParts);
      return new FileItemDto(name, FileType.Directory, `/browse/${fullPath}`, thumbnailUrl);
    } else if (entry.isFile()) {
      const ext: string = path.extname(name).toLowerCase();
      const type: FileType = getFileType(ext);

      return new FileItemDto(name, type, `/content/${fullPath}`);
    }

    return null;
  }

  /**
   * 특정 디렉터리 이름에 해당하는 썸네일 이미지가 존재하는지 확인하고, 경로를 반환합니다.
   * 
   * - .thumbs 디렉터리 내에서 [디렉터리명 + 확장자] 형식으로 썸네일을 탐색합니다.
   * - jpg 확장자만 검사합니다.
   * 
   * @param dirName - 디렉터리 이름
   * @returns string | undefined - 존재할 경우 썸네일 경로, 없을 경우 undefined
   */
  private getThumbnailUrl(dirName: string | undefined): string | undefined {
    if (!dirName) return undefined;
    const thumbsPath: string = path.join(this.contentPath, 'thumbs');
  
    const dirParts = dirName.split('(__)');
  
    const thumbnailFileName = dirParts.join('(__)');
  
    const fileName = `${thumbnailFileName}.jpg`;  // 확장자 .jpg만 사용
    const fullPath = path.join(thumbsPath, fileName);
  
    return fs.existsSync(fullPath) ? `/content/thumbs/${fileName}` : undefined;
  }

  /**
   * 파일 및 디렉터리 항목을 정렬합니다.
   * 
   * - 디렉터리를 먼저 정렬합니다.
   * - 같은 타입이면 이름순으로 정렬합니다.
   * 
   * @param a - 첫 번째 항목
   * @param b - 두 번째 항목
   * @returns number - 정렬 기준 (Array.prototype.sort에 사용)
   */
  private sortItems(a: FileItem, b: FileItem): number {
    if (a.type === FileType.Directory && b.type !== FileType.Directory) return -1;
    if (a.type !== FileType.Directory && b.type === FileType.Directory) return 1;
    return a.name.localeCompare(b.name);
  }
}
