// components/ui/NeonModal.js

/**
 * NeonModal - creates a cyberpunk glassmorphic modal dialog
 * @param {Object} opts
 *   - title: string (modal title)
 *   - content: HTMLElement|string (modal body)
 *   - onClose: function (close handler)
 *   - accent: string (optional, neon color CSS var)
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function NeonModal({ title = '', content = '', onClose, accent = 'var(--color-neon-cyan)', id = '' }) {
  const overlay = document.createElement('div');
  overlay.className = 'neon-modal-overlay';
  overlay.style.setProperty('--neon-accent', accent);
  if (id) overlay.id = id;
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  const headerId = id ? `${id}-header` : `modal-header-${Math.random().toString(36).slice(2,8)}`;
  modal.setAttribute('aria-labelledby', headerId);
  header.id = headerId;
  closeBtn.setAttribute('aria-label', 'Close modal');

  const modal = document.createElement('div');
  modal.className = 'neon-modal glass-panel';

  const header = document.createElement('div');
  header.className = 'neon-modal-header neon-text';
  header.textContent = title;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'neon-modal-close';
  closeBtn.setAttribute('aria-label', 'Close modal');
  closeBtn.innerHTML = `<svg class='modal-close-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.5s" repeatCount="indefinite"/>
    </path>
  </svg>`;
  closeBtn.onclick = () => {
    overlay.classList.remove('open');
    setTimeout(() => overlay.remove(), 300);
    if (onClose) onClose();
  };
  header.appendChild(closeBtn);
  modal.appendChild(header);

  const body = document.createElement('div');
  body.className = 'neon-modal-body';
  if (typeof content === 'string') {
    body.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    body.appendChild(content);
  }
  modal.appendChild(body);
  overlay.appendChild(modal);

  setTimeout(() => overlay.classList.add('open'), 10);
  return overlay;
} 