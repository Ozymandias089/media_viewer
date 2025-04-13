# Masonry Layout 프로젝트

이 프로젝트는 Masonry Layout을 활용하여 동적인 타일을 배치하고, 다양한 기능을 추가한 웹 애플리케이션입니다. 주로 **HTML**, **CSS**, **JavaScript**를 사용하며, 다크모드/라이트모드 지원, 타일 클릭 시 액션 처리 등을 구현하고 있습니다.
---
# 📁 Media Viewer 디렉토리 및 썸네일 규칙

이 문서는 `media_viewer` 프로젝트에서 **폴더 구조**와 **썸네일 파일명** 규칙을 정의합니다.

---

## 1️⃣ 디렉토리 구조
```md
content/
 ├── thumbs/
 │ ├── 게임()fm.jpg
 │ ├── 게임()fm.png 
 │ └── 기타()예제()폴더.webp 
 ├── 게임/
 │ └── fm/ 
 │ └── 실제파일들... 
 └── 기타/
      └── 예제/
      └── 폴더/
           └── 실제파일들...
```

- `content/` : 실제 폴더 및 파일이 존재하는 경로
- `thumbs/` : 썸네일 이미지가 저장되는 전용 폴더
- 썸네일은 폴더 경로를 `(__)` 문자열로 연결한 파일명으로 저장함.

---

## 2️⃣ 썸네일 파일명 규칙

| 원본 폴더 경로                       | 썸네일 파일명                          |
|------------------------------------|-------------------------------------|
| `게임/fm/`                         | `게임(__)fm.jpg`                     |
| `기타/예제/폴더/`                   | `기타(__)예제(__)폴더.png`           |

✅ **구분자** : `(__)`  
✅ **파일 확장자** : `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` 중 하나  
✅ 폴더 경로 전체를 연결한 문자열을 파일명으로 사용  
✅ 동일한 폴더 이름이 중복될 경우에도 고유한 파일명이 보장됨.

---

## 3️⃣ 썸네일 탐색 로직

- `createItem`에서 폴더 경로를 `(__)` 구분자로 조합.
- `getThumbnailUrl`에서 해당 경로 문자열을 기반으로 `thumbs` 폴더 안을 탐색.
- 파일명이 `경로(__)경로(__)폴더명.확장자` 형태로 정확히 일치하는 썸네일을 반환.

예시:

```ts
const dirParts = parentPath ? `${parentPath.replace(/\//g, '(__)')}(__)${name}` : name;
```

이렇게 경로 문자열을 조합하여 thumbs 폴더 내 파일을 찾는다.

## 4️⃣ 장점
- 폴더 이름 중복 가능 (게임/fm, 음악/fm 등)
- 트리 구조와 무관하게 썸네일 관리가 편리함
- 확장자만 맞춰 저장하면 자동으로 UI에서 썸네일 적용.
---
### ✅ 유지보수 주의사항
- 디렉토리명이 변경되면, 썸네일 파일명도 동일하게 수정 필요.
- 경로 문자열 중 (__)은 폴더 이름 내에서 사용할 수 없는 예약어임.

## 진행 상황

## 🔥 파일 관리 API 설계
### 1️⃣ `POST /api/files/upload`
파일 업로드 + 타겟 경로 저장
- 📥 multipart/form-data
   - `targetPath: string` (예: `/images/2025/04/`)
   - `files: File[]` (여러 개 가능)
- ⚡️ 백엔드 작업
   - targetPath 없으면 생성.
   - 파일 저장.
   - 성공 여부 반환.
### 2️⃣ `POST /api/files/move`
파일(또는 폴더) 위치 변경 or 이름 변경
- 🧾 JSON
```json
{
  "sourcePath": "/images/2025/photo.jpg",
  "targetPath": "/images/2025/renamed_photo.jpg"
}
```
- ⚡️ 백엔드 작업
   - fs.rename으로 이동 및 이름변경 처리.
   - 관련 썸네일 경로도 함께 수정.
   - 성공 여부 반환.

> 💡 이름 변경도 targetPath를 새 이름으로 주면 끝!

### 3️⃣ `DELETE /api/files`
파일 또는 폴더 삭제
- 🧾 JSON
```json
{
  "targetPath": "/images/2025/photo.jpg"
}
```
- ⚡️ 백엔드 작업
   - 파일/폴더 구분.
   - 폴더일 경우 recursive 삭제.
   - 해당 경로 썸네일도 같이 삭제.
   - 성공 여부 반환.
### 4️⃣ `POST /api/thumbs/upload`
썸네일 업로드 및 지정
- 📥 multipart/form-data
   - targetPath: string (예: /images/2025/)
   - thumbnail: File (이미지 1개)
- ⚡️ 백엔드 작업
   - 파일명을 targetPath 기준으로 __구분자 이름 규칙 적용.
   - .jpg로 확장자 고정.
   - 기존 썸네일 있으면 덮어쓰기.
   - 성공 여부 반환.
### 5️⃣ `DELETE /api/thumbs`
썸네일 삭제
- 🧾 JSON
```json
{
  "targetPath": "/images/2025/"
}
```
- ⚡️ 백엔드 작업
   - 해당 경로의 썸네일만 삭제.
   - 상위 폴더는 건드리지 않음.
   - 성공 여부 반환.
### 6️⃣ POST /api/thumbs/cleanup
썸네일 캐시 정리
- 호출시 자동 정리.
- ⚡️ 백엔드 작업
   - content 내 실폴더 검사.
   - thumbs 내부의 orphan 파일들 삭제.
   - 성공 여부 반환.

## 설치 방법

1. 이 프로젝트를 클론합니다.
   ```bash
   git clone https://github.com/yourusername/masonry-layout.git
   cd masonry-layout
   ```
2. index.html 파일을 브라우저에서 엽니다.

## 기술 스택
- HTML5
- CSS3 (CSS Grid, Flexbox, CSS Variables)
- JavaScript (DOM 조작, 이벤트 리스너)

## 향후 계획
- 애니메이션 효과 추가 (예: 테마 전환 시 부드러운 효과)
- 타일 드래그 앤 드롭 기능 추가
- 서버와 연동하여 데이터 저장 및 불러오기