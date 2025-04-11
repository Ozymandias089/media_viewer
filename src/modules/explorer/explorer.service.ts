// src/modules/explorer/explorer.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FileItem, FileType } from '../../utils/types';

@Injectable()
export class ExplorerService {
  private readonly contentPath = path.join(process.cwd(), 'content');

  /**
   * Returns a list of file and directory items for a given path.
   * @param pathParam - Path parameter (either string or array of strings).
   * @returns Array of FileItem objects representing the contents of the directory.
   * @throws NotFoundException if the given path does not exist or is inaccessible.
   */
  getExplorerItems(pathParam: string | string[] = ''): FileItem[] {
    const subPath: string = Array.isArray(pathParam) ? pathParam.join('/') : pathParam;
    const targetPath: string = path.join(this.contentPath, subPath);

    try {
      const entries = fs.readdirSync(targetPath, { withFileTypes: true });

      const items: FileItem[] = entries
        .map((entry) => this.createItem(entry, subPath))
        .filter((item): item is FileItem => item !== null)
        .sort((a, b) => this.sortItems(a, b));

      return items;
    } catch (error) {
      console.error('파일 탐색 중 오류:', error.message);
      throw new NotFoundException(`경로를 찾을 수 없습니다: ${subPath}`);
    }
  }

  /**
   * Creates a FileItem object from a filesystem entry.
   * @param entry - fs.Dirent object representing a directory entry.
   * @param parentPath - The relative parent path of the entry.
   * @returns A FileItem object or null if the entry is neither a file nor a directory.
   */
  private createItem(entry: fs.Dirent, parentPath: string): FileItem | null {
    const name = entry.name;
    const encodedName = encodeURIComponent(name);
    const fullPath = parentPath ? `${parentPath}/${encodedName}` : encodedName;

    if (entry.isDirectory()) {
      return {
        name,
        type: FileType.Directory,
        url: `/browse/${fullPath}`,
      };
    } else if (entry.isFile()) {
      const ext = path.extname(name).toLowerCase();
      const type = this.getFileType(ext);

      return {
        name,
        type,
        url: `/content/${fullPath}`,
      };
    }

    return null;
  }

   /**
   * Determines the file type based on its extension.
   * @param ext - File extension (lowercase, including dot, e.g. ".jpg").
   * @returns FileType enum value indicating the type of file.
   */
  private getFileType(ext: string): FileType {
    if ([
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
    ].includes(ext)) return FileType.Image;
    if ([
      '.mp4',
      '.mov',
      '.avi',
      '.webm',
    ].includes(ext)) return FileType.Video;
    return FileType.Other;
  }

  /**
   * Sorting function that prioritizes directories over files and sorts alphabetically.
   * @param a - First FileItem to compare.
   * @param b - Second FileItem to compare.
   * @returns Sorting value: -1, 0, or 1.
   */
  private sortItems(a: FileItem, b: FileItem): number {
    if (a.type === FileType.Directory && b.type !== FileType.Directory) return -1;
    if (a.type !== FileType.Directory && b.type === FileType.Directory) return 1;
    return a.name.localeCompare(b.name);
  }
}
