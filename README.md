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

### 1. **타일 레이아웃**
- **완료**: Masonry 타일을 **왼쪽에서 오른쪽까지 꽉 채우는 방식**으로 구현.
- **현재 작업**: 타일들이 양 옆에 여백을 가지도록 **정렬 수정**.
- **예정 작업**: 타일의 크기 및 간격을 동적으로 설정할 수 있도록 **반응형 조정**.

### 2. **테마 전환 (다크모드/라이트모드)**
- **완료**: 색상 테마 전환 기능 추가 (다크모드와 라이트모드).
- **현재 작업**: 버튼 클릭으로 테마 변경 시 **CSS 변수**를 이용해 색상 값 동적 적용.
- **예정 작업**: 테마 전환 시 **애니메이션** 추가 및 **저장** 기능 구현.

### 3. **타일 클릭 시 액션 처리**
- **완료**: 타일 클릭 시 **상세보기** 또는 **카테고리 보기**로 이동하는 이벤트 처리.
- **현재 작업**: 각 타일에 대해 **추가 액션** 처리 (예: 삭제, 편집 등).
- **예정 작업**: 클릭한 타일의 정보를 **로컬스토리지**나 **세션스토리지**에 저장해 페이지 리로드 시에도 상태 유지.

### 4. **박스 스타일 조정**
- **완료**: 타일 종류에 따라 **다양한 스타일**을 적용 (폴더, 파일 등).
- **현재 작업**: 박스 크기 및 **모양 조정** (타일 크기 동적 변경).
- **예정 작업**: 타일의 종류별로 **아이콘** 추가 및 **배경 색상** 변경.

### 5. **반응형 디자인**
- **완료**: 화면 크기에 맞춰 **타일 정렬** 자동 조정.
- **현재 작업**: 타일 간격 및 크기 **미세 조정**.
- **예정 작업**: 모바일 화면을 위한 **버튼 및 메뉴** 배치 수정.

### 6. **기타**
- **완료**: 기본적인 **HTML 구조** 및 **CSS 스타일** 적용.
- **현재 작업**: 코드 **최적화** 및 **사용자 인터페이스** 개선.
- **예정 작업**: **접근성** 향상을 위한 ARIA 태그 추가.

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