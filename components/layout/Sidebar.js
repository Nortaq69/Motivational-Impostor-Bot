// components/layout/Sidebar.js

/**
 * Sidebar - creates a vertical sidebar with neon icon buttons
 * @param {Object} opts
 *   - items: array of { icon: string (SVG), label: string, onClick: function, active: boolean }
 *   - accent: string (optional, neon color CSS var)
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function Sidebar({ items = [], accent = 'var(--color-neon-cyan)', id = '' }) {
  const sidebar = document.createElement('nav');
  sidebar.className = 'neon-sidebar glass-panel';
  sidebar.style.setProperty('--neon-accent', accent);
  if (id) sidebar.id = id;

  items.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'sidebar-btn' + (item.active ? ' active' : '');
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', item.label);
    if (item.active) btn.setAttribute('aria-current', 'page');
    let iconMarkup = '';
    if (item.label === 'Home') {
      iconMarkup = `<svg class='sidebar-anim-icon' width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16L16 6L28 16" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#39ff14;#00fff7" dur="1.5s" repeatCount="indefinite"/></path><rect x="10" y="16" width="12" height="10" rx="2" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#ff00ea;#00fff7" dur="2s" repeatCount="indefinite"/></rect></svg>`;
    } else if (item.label === 'Console') {
      iconMarkup = `<svg class='sidebar-anim-icon' width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4" y="8" width="24" height="16" rx="3" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#ff00ea;#00fff7" dur="2s" repeatCount="indefinite"/></rect><path d="M11 13L15 16L11 19" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#39ff14;#00fff7" dur="1.5s" repeatCount="indefinite"/></path><circle cx="22" cy="20" r="2" fill="#ff00ea"><animate attributeName="fill" values="#ff00ea;#39ff14;#ff00ea" dur="1.2s" repeatCount="indefinite"/></circle></svg>`;
    } else if (item.label === 'Settings') {
      iconMarkup = `<svg class='sidebar-anim-icon' width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="5" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#ff1744;#00fff7" dur="2s" repeatCount="indefinite"/></circle><path d="M26 21A2.5 2.5 0 0 0 29 18.5V13.5A2.5 2.5 0 0 0 26 11" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#ff00ea;#00fff7" dur="1.5s" repeatCount="indefinite"/></path><path d="M6 11A2.5 2.5 0 0 0 3 13.5v5A2.5 2.5 0 0 0 6 21" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#39ff14;#00fff7" dur="1.5s" repeatCount="indefinite"/></path></svg>`;
    } else if (item.label === 'Macro') {
      iconMarkup = `<svg class='sidebar-anim-icon' width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M8 8L24 8L24 24L8 24Z" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#39ff14;#00fff7" dur="1.8s" repeatCount="indefinite"/></path><path d="M12 12L20 12M12 16L20 16M12 20L16 20" stroke="#00fff7" stroke-width="2" stroke-linecap="round"><animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.5s" repeatCount="indefinite"/></path><circle cx="26" cy="6" r="3" fill="#ff00ea"><animate attributeName="fill" values="#ff00ea;#39ff14;#ff00ea" dur="1.2s" repeatCount="indefinite"/></circle></svg>`;
    } else if (item.label === 'History') {
      iconMarkup = `<svg class='sidebar-anim-icon' width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="12" stroke="#00fff7" stroke-width="2"><animate attributeName="stroke" values="#00fff7;#ff00ea;#00fff7" dur="2s" repeatCount="indefinite"/></circle><path d="M16 8V16L22 20" stroke="#00fff7" stroke-width="2" stroke-linecap="round"><animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1.5s" repeatCount="indefinite"/></path><path d="M8 12L12 16L8 20" stroke="#00fff7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.8s" repeatCount="indefinite"/></path></svg>`;
    } else {
      iconMarkup = `<span class='sidebar-icon' aria-hidden='true'>${item.icon}</span>`;
    }
    btn.innerHTML = `${iconMarkup}<span class='sidebar-label sr-only'>${item.label}</span>`;
    btn.onclick = item.onClick;
    sidebar.appendChild(btn);
  });

  return sidebar;
} 