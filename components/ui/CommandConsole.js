// components/ui/CommandConsole.js

/**
 * CommandConsole - creates a live console panel with output and input
 * @param {Object} opts
 *   - onCommand: function (handler, receives command string)
 *   - id: string (optional)
 * @returns {HTMLElement}
 */
export function CommandConsole({ onCommand, id = '' }) {
  const panel = document.createElement('div');
  panel.className = 'command-console glass-panel';
  if (id) panel.id = id;

  const output = document.createElement('div');
  output.className = 'console-output';
  output.innerHTML = '<div class="console-line">[Impostor Bot Console Ready]</div>';

  const form = document.createElement('form');
  form.className = 'console-form';
  const input = document.createElement('input');
  input.className = 'console-input';
  input.type = 'text';
  input.placeholder = 'Type a command...';
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Command input');
  form.appendChild(input);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'console-submit-btn';
  submitBtn.setAttribute('aria-label', 'Send command');
  submitBtn.innerHTML = `<svg class='console-send-icon' width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2 10L10 2L18 10L10 18L2 10Z" stroke="currentColor" stroke-width="2">
      <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1.2s" repeatCount="indefinite"/>
    </path>
    <path d="M10 2V18" stroke="currentColor" stroke-width="2">
      <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.2s" repeatCount="indefinite"/>
    </path>
  </svg>`;
  form.appendChild(submitBtn);

  form.onsubmit = e => {
    e.preventDefault();
    const cmd = input.value.trim();
    if (cmd) {
      if (onCommand) onCommand(cmd, output);
      input.value = '';
    }
  };

  panel.appendChild(output);
  panel.appendChild(form);
  return panel;
} 