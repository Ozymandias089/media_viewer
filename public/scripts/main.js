// /public/scripts/main.js
/**
 * Entry point script for initializing frontend components after DOM load.
 * 
 * - Loads and initializes theme toggle functionality.
 * - Loads and initializes lightbox feature.
 */

import { initThemeToggle } from './component/theme.js';
import { initLightbox } from './component/lightbox.js';

console.log("main.js 시작됨");

/**
 * Runs once the DOM is fully loaded.
 * Initializes UI components.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded 실행됨");
  initThemeToggle();
  initLightbox();
});
