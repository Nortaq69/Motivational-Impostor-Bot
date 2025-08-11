// utils/themeManager.js

const THEMES = {
  dark: {
    '--color-bg': '#10131a',
    '--color-accent': 'var(--color-neon-cyan)',
  },
  synthwave: {
    '--color-bg': '#1a0033',
    '--color-accent': 'var(--color-neon-magenta)',
  },
  frost: {
    '--color-bg': '#e6f7ff',
    '--color-accent': 'var(--color-neon-cyan)',
  },
};

export function setTheme(theme) {
  const vars = THEMES[theme] || THEMES.dark;
  Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  localStorage.setItem('theme', theme);
}

export function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}
