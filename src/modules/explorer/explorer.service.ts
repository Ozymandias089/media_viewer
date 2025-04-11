// src/modules/explorer/explorer.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FileItem, FileType } from '../../utils/types';

@Injectable()
export class ExplorerService {
  private readonly contentPath = path.join(process.cwd(), 'content');

  getExplorerItems(): FileItem[] {
    const entries = fs.readdirSync(this.contentPath, { withFileTypes: true });

    const items: FileItem[] = entries
      .map((entry) => this.createItem(entry))
      .filter((item): item is FileItem => item !== null)
      .sort((a, b) => this.sortItems(a, b));

    return items;
  }

  private createItem(entry: fs.Dirent): FileItem | null {
    const name = entry.name;
    const encodedName = encodeURIComponent(name);

    if (entry.isDirectory()) {
      return {
        name,
        type: FileType.Directory,
        url: `/browse/${encodedName}`,
      };
    } else if (entry.isFile()) {
      const ext = path.extname(name).toLowerCase();
      const type = this.getFileType(ext);

      return {
        name,
        type,
        url: `/content/${encodedName}`,
      };
    }

    return null;
  }

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

  private sortItems(a: FileItem, b: FileItem): number {
    if (a.type === FileType.Directory && b.type !== FileType.Directory) return -1;
    if (a.type !== FileType.Directory && b.type === FileType.Directory) return 1;
    return a.name.localeCompare(b.name);
  }
}
