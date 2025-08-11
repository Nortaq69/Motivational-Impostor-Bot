// components/ui/Tooltip.js

/**
 * Tooltip - attaches a neon tooltip to a target element
 * @param {HTMLElement} target - the element to attach the tooltip to
 * @param {string} text - the tooltip text
 * @param {Object} opts - { position: 'top'|'bottom'|'left'|'right', accent: string }
 */
export function Tooltip(target, text, opts = {}) {
  const tooltip = document.createElement('div');
  tooltip.className = 'neon-tooltip';
  tooltip.textContent = text;
  if (opts.accent) tooltip.style.setProperty('--neon-accent', opts.accent);
  document.body.appendChild(tooltip);

  function show() {
    tooltip.classList.add('show');
    const rect = target.getBoundingClientRect();
    const tRect = tooltip.getBoundingClientRect();
    let top = rect.top - tRect.height - 8;
    let left = rect.left + (rect.width - tRect.width) / 2;
    if (opts.position === 'bottom') top = rect.bottom + 8;
    if (opts.position === 'left') { left = rect.left - tRect.width - 8; top = rect.top + (rect.height-tRect.height)/2; }
    if (opts.position === 'right') { left = rect.right + 8; top = rect.top + (rect.height-tRect.height)/2; }
    tooltip.style.top = `${Math.max(top, 4)}px`;
    tooltip.style.left = `${Math.max(left, 4)}px`;
  }
  function hide() { tooltip.classList.remove('show'); }
  target.addEventListener('mouseenter', show);
  target.addEventListener('focus', show);
  target.addEventListener('mouseleave', hide);
  target.addEventListener('blur', hide);
  target.addEventListener('mousedown', hide);
} 