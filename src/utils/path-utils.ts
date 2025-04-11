import { Breadcrumb } from "./types";

export function getBreadcrumbs(pathParam: string | string[]): Breadcrumb[] {
  const pathStr = Array.isArray(pathParam) ? pathParam.join('/') : pathParam || '';
  const parts = pathStr.split('/').filter(Boolean);

  const breadcrumbs = parts.map((part, index) => ({
    name: decodeURIComponent(part),
    url: '/browse/' + parts.slice(0, index + 1).join('/'),
  }));

  return [{ name: 'Home', url: '/' }, ...breadcrumbs];
}

  