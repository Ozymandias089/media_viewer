/**
 * 초기 테마 토글 기능을 설정합니다.
 * 사용자 클릭에 따라 다크 모드와 라이트 모드를 전환하며,
 * localStorage에 테마 정보를 저장하고, 해당 테마 CSS 파일을 동적으로 로드합니다.
 * 또한 테마에 따라 해/달 아이콘을 전환합니다.
 */
export function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLink = document.getElementById('theme-style');
  const themeIcon = document.getElementById('theme-icon');

  // SVG 아이콘 코드
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-moon" id="theme-icon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;
  
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-sun" id="theme-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

  /**
   * 테마를 설정하고 CSS 및 아이콘을 업데이트합니다.
   * @param {'light' | 'dark'} theme - 적용할 테마 이름
   */
  const setTheme = (theme) => {
    const timestamp = Date.now();
    themeLink.href = `/styles/themes/${theme}.css?v=${timestamp}`;
    localStorage.setItem('theme', theme);
    console.log("새 테마 로드됨:", themeLink.href);
    console.log("테마 설정 완료:", theme);

    // Switch Icons
    if (theme == 'dark') {
      themeIcon.innerHTML = moonIcon; // 달 아이콘 삽입
    } else {
      themeIcon.innerHTML = sunIcon; // 해 아이콘 삽입
    }
  };

   /**
   * 현재 테마를 반전시켜 변경합니다.
   */
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log("현재 테마:", currentTheme);
    console.log("테마 전환 요청:", newTheme);
    setTheme(newTheme);
  };

  themeToggleBtn.addEventListener('click', () => {
    console.log("버튼 클릭됨");
    toggleTheme();
  });

  // 페이지 로드 시 초기 테마 설정
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log("로컬스토리지에 저장된 테마:", savedTheme);
  setTheme(savedTheme);
}
