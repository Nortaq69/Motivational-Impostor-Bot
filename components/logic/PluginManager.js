// components/logic/PluginManager.js

/**
 * PluginManager - creates a plugin toggle manager panel
 * @param {Object} opts
 *   - plugins: array of { name: string, enabled: boolean, onToggle: function }
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function PluginManager({ plugins = [], id = '' }) {
  const panel = document.createElement('div');
  panel.className = 'plugin-manager glass-panel';
  if (id) panel.id = id;

  plugins.forEach(plugin => {
    const row = document.createElement('div');
    row.className = 'plugin-row';
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = plugin.enabled;
    toggle.className = 'plugin-toggle';
    toggle.setAttribute('aria-label', `Toggle ${plugin.name}`);
    toggle.onchange = () => {
      plugin.enabled = toggle.checked;
      if (onToggle) onToggle(plugin.name, toggle.checked);
    };

    const icon = document.createElement('span');
    icon.className = 'plugin-icon';
    icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2">
        <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="2s" repeatCount="indefinite"/>
      </circle>
      <path d="M6 8L8 10L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.5s" repeatCount="indefinite"/>
      </path>
    </svg>`;

    const label = document.createElement('span');
    label.className = 'plugin-label';
    label.textContent = plugin.name;
    row.appendChild(icon);
    row.appendChild(label);
    row.appendChild(toggle);
    panel.appendChild(row);
  });
  return panel;
} 