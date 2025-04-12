import { BreadcrumbDto } from "src/modules/explorer/dto/breadcrumb.dto";

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