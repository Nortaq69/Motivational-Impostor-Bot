// components/ui/NeonToggle.js

/**
 * NeonToggle - creates a neon cyberpunk toggle switch
 * @param {Object} opts
 *   - checked: boolean (initial state)
 *   - onChange: function (handler, receives new state)
 *   - accent: string (optional, neon color CSS var)
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function NeonToggle({ checked = false, onChange, accent = 'var(--color-neon-magenta)', id = '' }) {
  const wrapper = document.createElement('label');
  wrapper.className = 'neon-toggle-wrapper';
  if (id) wrapper.id = id;
  wrapper.style.setProperty('--neon-accent', accent);

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'neon-toggle-input';
  input.checked = checked;

  const slider = document.createElement('span');
  slider.className = 'neon-toggle-slider';

  input.addEventListener('change', () => {
    slider.classList.toggle('on', input.checked);
    if (onChange) onChange(input.checked);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(slider);
  // Set initial state
  if (checked) slider.classList.add('on');
  return wrapper;
} 