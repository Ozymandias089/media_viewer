import { Breadcrumb } from "./types";

export function getBreadcrumbs(path: string): Breadcrumb[] {
    const parts = path.split('/').filter(Boolean);
  
    const breadcrumbs = parts.map((part, index) => {
      return {
        name: part,
        url: '/browse/' + parts.slice(0, index + 1).join('/'),
      };
    });
  
    // 루트 홈 추가
    return [{ name: 'Home', url: '/' }, ...breadcrumbs];
  }
  