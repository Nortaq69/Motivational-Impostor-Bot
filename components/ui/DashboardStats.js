// components/ui/DashboardStats.js

/**
 * DashboardStats - creates a cyberpunk stats panel with animated gauges
 * @param {Object} opts
 *   - stats: array of { label: string, value: number (0-100), color: string (CSS var) }
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function DashboardStats({ stats = [], id = '' }) {
  const panel = document.createElement('div');
  panel.className = 'dashboard-stats glass-panel';
  if (id) panel.id = id;

  stats.forEach(stat => {
    const statWrap = document.createElement('div');
    statWrap.className = 'stat-wrap';
    const label = document.createElement('div');
    label.className = 'stat-label neon-text';
    label.textContent = stat.label;
    const meter = document.createElement('div');
    meter.className = 'stat-meter';
    const fill = document.createElement('div');
    fill.className = 'stat-fill';
    fill.style.width = stat.value + '%';
    fill.style.background = stat.color;
    meter.appendChild(fill);
    statWrap.appendChild(label);
    statWrap.appendChild(meter);
    panel.appendChild(statWrap);
  });
  return panel;
} 