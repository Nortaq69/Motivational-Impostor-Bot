// CommandHistory.js
export function CommandHistory({ history = [], onExecute, onExport, onImport, id = '' }) {
  const panel = document.createElement('div');
  panel.className = 'command-history glass-panel';
  if (id) panel.id = id;

  const header = document.createElement('div');
  header.className = 'history-header';
  header.innerHTML = `
    <h3 class="neon-text">
      <svg class="history-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2">
          <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.5s" repeatCount="indefinite"/>
        </path>
      </svg>
      Command History
    </h3>
  `;

  const controls = document.createElement('div');
  controls.className = 'history-controls';

  const exportBtn = document.createElement('button');
  exportBtn.className = 'neon-btn history-export-btn';
  exportBtn.innerHTML = `
    <svg class="export-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <path d="M2 14H14" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.8s" repeatCount="indefinite"/>
      </path>
    </svg>
    Export
  `;
  exportBtn.onclick = () => {
    if (onExport) onExport(history);
  };

  const importBtn = document.createElement('button');
  importBtn.className = 'neon-btn history-import-btn';
  importBtn.innerHTML = `
    <svg class="import-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 14V6M8 6L5 9M8 6L11 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <animate attributeName="stroke" values="#ff00ea;#39ff14;#ff00ea" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <path d="M2 2H14" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1.8s" repeatCount="indefinite"/>
      </path>
    </svg>
    Import
  `;
  importBtn.onclick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file && onImport) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            onImport(data);
          } catch (err) {
            console.error('Failed to import history:', err);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  controls.appendChild(exportBtn);
  controls.appendChild(importBtn);

  const historyList = document.createElement('div');
  historyList.className = 'history-list';

  history.forEach((item, index) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div class="history-item-content">
        <span class="history-command">${item.command}</span>
        <span class="history-timestamp">${item.timestamp}</span>
      </div>
      <button class="history-execute-btn" aria-label="Execute command">
        <svg class="execute-small-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6L10 6M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <animate attributeName="stroke" values="#39ff14;#ff00ea;#39ff14" dur="1s" repeatCount="indefinite"/>
          </path>
        </svg>
      </button>
    `;
    
    const executeBtn = historyItem.querySelector('.history-execute-btn');
    executeBtn.onclick = () => {
      if (onExecute) onExecute(item.command);
    };

    historyList.appendChild(historyItem);
  });

  panel.appendChild(header);
  panel.appendChild(controls);
  panel.appendChild(historyList);

  return panel;
} 