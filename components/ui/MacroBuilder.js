// MacroBuilder.js
export function MacroBuilder({ onSave, onExecute, id = '' }) {
  const panel = document.createElement('div');
  panel.className = 'macro-builder glass-panel';
  if (id) panel.id = id;

  const header = document.createElement('div');
  header.className = 'macro-header';
  header.innerHTML = `
    <h3 class="neon-text">
      <svg class="macro-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2">
          <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2">
          <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.8s" repeatCount="indefinite"/>
        </path>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2">
          <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1.6s" repeatCount="indefinite"/>
        </path>
      </svg>
      Macro Builder
    </h3>
  `;

  const form = document.createElement('form');
  form.className = 'macro-form';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Macro name';
  nameInput.className = 'macro-input';
  nameInput.setAttribute('aria-label', 'Macro name');

  const commandsInput = document.createElement('textarea');
  commandsInput.placeholder = 'Enter commands (one per line)';
  commandsInput.className = 'macro-textarea';
  commandsInput.setAttribute('aria-label', 'Macro commands');
  commandsInput.rows = 6;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'macro-buttons';

  const saveBtn = document.createElement('button');
  saveBtn.type = 'button';
  saveBtn.className = 'neon-btn macro-save-btn';
  saveBtn.innerHTML = `
    <svg class="save-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3H13V13H3V3Z" stroke="currentColor" stroke-width="2">
        <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <path d="M5 5H11V7H5V5Z" fill="currentColor">
        <animate attributeName="fill" values="#39ff14;#ff00ea;#39ff14" dur="1.5s" repeatCount="indefinite"/>
      </path>
    </svg>
    Save Macro
  `;
  saveBtn.onclick = () => {
    const name = nameInput.value.trim();
    const commands = commandsInput.value.trim().split('\n').filter(cmd => cmd.trim());
    if (name && commands.length > 0) {
      if (onSave) onSave({ name, commands });
      nameInput.value = '';
      commandsInput.value = '';
    }
  };

  const executeBtn = document.createElement('button');
  executeBtn.type = 'button';
  executeBtn.className = 'neon-btn macro-execute-btn';
  executeBtn.innerHTML = `
    <svg class="execute-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8L13 8M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.2s" repeatCount="indefinite"/>
      </path>
    </svg>
    Execute
  `;
  executeBtn.onclick = () => {
    const commands = commandsInput.value.trim().split('\n').filter(cmd => cmd.trim());
    if (commands.length > 0 && onExecute) {
      onExecute(commands);
    }
  };

  buttonGroup.appendChild(saveBtn);
  buttonGroup.appendChild(executeBtn);

  form.appendChild(nameInput);
  form.appendChild(commandsInput);
  form.appendChild(buttonGroup);

  panel.appendChild(header);
  panel.appendChild(form);

  return panel;
} 