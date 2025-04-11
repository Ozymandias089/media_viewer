// /public/scripts/main.js
import { initThemeToggle } from './component/theme.js';
import { initLightbox } from './component/lightbox.js';

console.log("main.js 시작됨");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded 실행됨");
  initThemeToggle();
  initLightbox();
});
