import { HttpException, HttpStatus } from "@nestjs/common";
import { BreadcrumbDto } from "src/modules/explorer/dto/breadcrumb.dto";
import * as path from 'path';

export function getBreadcrumbs(pathParam: string | string[]): BreadcrumbDto[] { // TODO: 데이터 반환할때 DTO로 반환할 수 있도록
  const pathStr = Array.isArray(pathParam) ? pathParam.join('/') : pathParam || '';
  const parts = pathStr.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbDto[] = parts.map((part, index) => {
    const name = decodeURIComponent(part);
    const url = '/browse/' + parts.slice(0, index + 1).join('/');
    return new BreadcrumbDto(name, url);
  });

  return [new BreadcrumbDto('Home', '/') , ...breadcrumbs];
}  

export function validatePath(path: string): void {
  if (path.includes('..')) {
    throw new HttpException('Invalid target path', HttpStatus.BAD_REQUEST);
  }
}

export function getFullPath(targetPath: string): string {
  return path.join(this.contentRootPath, targetPath);
}
