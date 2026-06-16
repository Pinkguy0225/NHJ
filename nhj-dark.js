/**
 * Natural Harmony Journey — 다크모드 제거됨 (라이트 모드 전용)
 * NHJDarkMode stub — 다른 파일에서 참조하는 경우 에러 방지용
 */

// 라이트 모드 고정
(function() {
  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  // light 모드 고정 — html.dark CSS가 적용되지 않도록
})();

const NHJDarkMode = {
  toggle: function() {},
  applyDarkToPopup: function() {}
};

// 전역 호환성 (기존 코드에서 _applyToggleBtn 호출 방어)
function _applyToggleBtn() {}

// Light Rays (다크모드 전용 기능 — 라이트모드에서 비활성)
const NHJLightRays = {
  initIfDark: function() {},
  start: function() {},
  stop: function() {}
};
