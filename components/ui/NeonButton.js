// components/ui/NeonButton.js

/**
 * NeonButton - creates a neon cyberpunk button element
 * @param {Object} opts
 *   - text: string (button label)
 *   - onClick: function (event handler)
 *   - accent: string (optional, neon color CSS var)
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function NeonButton({ text, onClick, accent = 'var(--color-neon-cyan)', id = '' }) {
  const btn = document.createElement('button');
  btn.className = 'neon-btn';
  btn.textContent = text;
  if (id) btn.id = id;
  btn.style.setProperty('--neon-accent', accent);
  btn.addEventListener('click', onClick);
  btn.addEventListener('mouseenter', () => {
    btn.classList.add('neon-btn-hover');
  });
  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('neon-btn-hover');
    btn.classList.remove('neon-btn-active');
  });
  btn.addEventListener('mousedown', () => {
    btn.classList.add('neon-btn-active');
  });
  btn.addEventListener('mouseup', () => {
    btn.classList.remove('neon-btn-active');
  });
  return btn;
} 