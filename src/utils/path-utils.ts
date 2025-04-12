import { Breadcrumb } from "./types";

/**
 * 주어진 경로 파라미터를 기반으로 탐색 경로(Breadcrumb) 배열을 생성합니다.
 *
 * 예를 들어, `"foo/bar"` 또는 `["foo", "bar"]`를 입력하면 다음과 같은 배열을 반환합니다:
 * ```
 * [
 *   { name: 'Home', url: '/' },
 *   { name: 'foo', url: '/browse/foo' },
 *   { name: 'bar', url: '/browse/foo/bar' }
 * ]
 * ```
 *
 * @param {string | string[]} pathParam - 문자열 또는 문자열 배열 형식의 경로 정보.
 *   예: `"category/item"` 또는 `["category", "item"]`
 * @returns {Breadcrumb[]} Breadcrumb 객체 배열. 경로의 각 부분을 나타냅니다.
 */
export function getBreadcrumbs(pathParam: string | string[]): Breadcrumb[] { // TODO: 데이터 반환할때 DTO로 반환할 수 있도록
  const pathStr = Array.isArray(pathParam) ? pathParam.join('/') : pathParam || '';
  const parts = pathStr.split('/').filter(Boolean);

  const breadcrumbs = parts.map((part, index) => ({
    name: decodeURIComponent(part),
    url: '/browse/' + parts.slice(0, index + 1).join('/'),
  }));

  return [{ name: 'Home', url: '/' }, ...breadcrumbs];
}

  