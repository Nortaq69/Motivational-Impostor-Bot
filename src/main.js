// main.js
import { NeonButton } from '../components/ui/NeonButton.js';
import { NeonToggle } from '../components/ui/NeonToggle.js';
import { NeonModal } from '../components/ui/NeonModal.js';
import { Sidebar } from '../components/layout/Sidebar.js';
import { DashboardStats } from '../components/ui/DashboardStats.js';
import { CommandConsole } from '../components/ui/CommandConsole.js';
import { PluginManager } from '../components/logic/PluginManager.js';
import { Tooltip } from '../components/ui/Tooltip.js';
import { MacroBuilder } from '../components/ui/MacroBuilder.js';
import { CommandHistory } from '../components/ui/CommandHistory.js';
import { setTheme, getTheme } from '../utils/themeManager.js';
import { playSFX, playAmbience, setVolume } from '../utils/soundEngine.js';
import { validateInput } from '../utils/validateInput.js';

// State management
let commandHistory = [];
let savedMacros = [];

const icons = {
  home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4L21 12" stroke="#00fff7" stroke-width="2"/><rect x="7" y="12" width="10" height="8" rx="2" stroke="#00fff7" stroke-width="2"/></svg>`,
  console: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#00fff7" stroke-width="2"/><path d="M8 9L10.5 12L8 15" stroke="#00fff7" stroke-width="2"/><circle cx="16" cy="14" r="1" fill="#00fff7"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#00fff7" stroke-width="2"/><path d="M19.4 15A1.65 1.65 0 0 0 21 13.35V10.65A1.65 1.65 0 0 0 19.4 9M4.6 9A1.65 1.65 0 0 0 3 10.65v2.7A1.65 1.65 0 0 0 4.6 15" stroke="#00fff7" stroke-width="2"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  // Add animated background canvas
  const bgCanvas = document.createElement('canvas');
  bgCanvas.id = 'bg-vfx';
  bgCanvas.style.position = 'fixed';
  bgCanvas.style.top = '0';
  bgCanvas.style.left = '0';
  bgCanvas.style.width = '100vw';
  bgCanvas.style.height = '100vh';
  bgCanvas.style.zIndex = '0';
  bgCanvas.style.pointerEvents = 'none';
  document.body.prepend(bgCanvas);
  startCodeRain(bgCanvas);

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="glass-panel" id="welcome-panel">
      <h1 class="neon-text">MOTIVATIONAL IMPOSTOR BOT</h1>
      <div style="margin:2rem 0;">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="#00fff7" stroke-width="4" fill="#181c24"/>
          <ellipse cx="27" cy="38" rx="6" ry="10" fill="#00fff7" opacity="0.7"/>
          <ellipse cx="53" cy="38" rx="6" ry="10" fill="#00fff7" opacity="0.7"/>
          <ellipse cx="40" cy="56" rx="12" ry="6" fill="#ff00ea" opacity="0.5"/>
        </svg>
        <p style="font-family:var(--font-title);font-size:1.2rem;margin-top:1rem;">Your cyberpunk mentor is watching.<br><span style="color:var(--color-neon-magenta);">Every move. Every line.</span></p>
      </div>
      <div id="neon-btn-container"></div>
      <div style="margin-top:2rem;text-align:center;">
        <span class="neon-text" style="font-size:1rem;">Judgement Mode:</span>
        <span id="toggle-label" class="neon-text" style="margin-left:1rem;font-size:1rem;">OFF</span>
        <span id="neon-toggle-container" style="margin-left:1rem;"></span>
      </div>
    </div>
  `;

  const btnContainer = document.getElementById('neon-btn-container');
  const startBtn = NeonButton({
    text: 'Begin Session',
    onClick: () => {
      renderMainApp();
    },
    accent: 'var(--color-neon-cyan)',
    id: 'start-btn'
  });
  btnContainer.appendChild(startBtn);

  const toggleContainer = document.getElementById('neon-toggle-container');
  const toggleLabel = document.getElementById('toggle-label');
  const neonToggle = NeonToggle({
    checked: false,
    onChange: (state) => {
      toggleLabel.textContent = state ? 'ON' : 'OFF';
      toggleLabel.style.color = state ? 'var(--color-neon-green)' : 'var(--color-neon-magenta)';
    },
    accent: 'var(--color-neon-magenta)',
    id: 'judgement-toggle'
  });
  toggleContainer.appendChild(neonToggle);

  // Play ambient sound
  if (!localStorage.getItem('mute')) {
    playAmbience('/assets/sound/ambience.mp3');
  }
});

function startCodeRain(canvas) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const columns = Math.floor(width / 22);
  const drops = Array(columns).fill(1);
  function draw() {
    ctx.fillStyle = 'rgba(10,18,28,0.18)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '18px JetBrains Mono, monospace';
    ctx.fillStyle = '#00fff7';
    for (let i = 0; i < drops.length; i++) {
      const char = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(char, i * 22, drops[i] * 22);
      if (drops[i] * 22 > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
}

function renderMainApp() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  // Sidebar
  const sidebarItems = [
    { label: 'Home', icon: '🏠', active: true, onClick: () => { playSFX('tab'); showPanel('home'); } },
    { label: 'Console', icon: '💻', active: false, onClick: () => { playSFX('tab'); showPanel('console'); } },
    { label: 'Macro', icon: '⚡', active: false, onClick: () => { playSFX('tab'); showPanel('macro'); } },
    { label: 'History', icon: '📜', active: false, onClick: () => { playSFX('tab'); showPanel('history'); } },
    { label: 'Settings', icon: '⚙️', active: false, onClick: () => { playSFX('tab'); showPanel('settings'); } }
  ];
  const sidebar = Sidebar({
    items: sidebarItems,
    accent: 'var(--color-neon-cyan)',
    id: 'main-sidebar'
  });
  root.appendChild(sidebar);

  // Add tooltips to sidebar buttons
  setTimeout(() => {
    const btns = document.querySelectorAll('.sidebar-btn');
    sidebarItems.forEach((item, i) => {
      Tooltip(btns[i], item.label, { position: 'right', accent: 'var(--color-neon-cyan)' });
    });
  }, 10);

  // Main dashboard panel
  const mainPanel = document.createElement('div');
  mainPanel.className = 'glass-panel';
  mainPanel.id = 'main-panel';
  mainPanel.style.marginLeft = '120px';
  mainPanel.innerHTML = `<h2 class="neon-text">Welcome, Operator</h2><div id="stats-panel"></div><p style="margin-top:1rem;">This is your cyberpunk dashboard. More modules coming soon.</p><button id="open-modal-btn" class="neon-btn" style="margin-top:2rem;">Show Modal</button>`;
  root.appendChild(mainPanel);

  // Dashboard stats
  const stats = [
    { label: 'CPU', value: 62, color: 'var(--color-neon-cyan)' },
    { label: 'RAM', value: 48, color: 'var(--color-neon-magenta)' },
    { label: 'Focus', value: 87, color: 'var(--color-neon-green)' },
    { label: 'Mood', value: 73, color: 'var(--color-neon-crimson)' }
  ];
  const statsPanel = DashboardStats({ stats });
  document.getElementById('stats-panel').appendChild(statsPanel);

  document.getElementById('open-modal-btn').onclick = () => {
    const modal = NeonModal({
      title: 'Neon Modal',
      content: '<div style="padding:1rem 0;">This is a glassmorphic, animated modal.<br>Click × to close.</div>',
      onClose: () => {},
      accent: 'var(--color-neon-cyan)'
    });
    document.body.appendChild(modal);
  };
}

function showPanel(panel) {
  const mainPanel = document.getElementById('main-panel');
  if (!mainPanel) return;
  if (panel === 'home') {
    mainPanel.innerHTML = `<h2 class="neon-text">Welcome, Operator</h2><div id="stats-panel"></div><p style="margin-top:1rem;">This is your cyberpunk dashboard. More modules coming soon.</p><button id="open-modal-btn" class="neon-btn" style="margin-top:2rem;">Show Modal</button>`;
    const stats = [
      { label: 'CPU', value: Math.floor(Math.random()*40+60), color: 'var(--color-neon-cyan)' },
      { label: 'RAM', value: Math.floor(Math.random()*40+40), color: 'var(--color-neon-magenta)' },
      { label: 'Focus', value: Math.floor(Math.random()*20+80), color: 'var(--color-neon-green)' },
      { label: 'Mood', value: Math.floor(Math.random()*30+60), color: 'var(--color-neon-crimson)' }
    ];
    const statsPanel = DashboardStats({ stats });
    document.getElementById('stats-panel').appendChild(statsPanel);
    document.getElementById('open-modal-btn').onclick = () => {
      const modal = NeonModal({
        title: 'Neon Modal',
        content: '<div style="padding:1rem 0;">This is a glassmorphic, animated modal.<br>Click × to close.</div>',
        onClose: () => {},
        accent: 'var(--color-neon-cyan)'
      });
      document.body.appendChild(modal);
    };
  } else if (panel === 'console') {
    mainPanel.innerHTML = '';
    const consolePanel = CommandConsole({
      onCommand: (cmd, output) => {
        const validation = validateInput(cmd, { min: 2, max: 32, pattern: /^[a-zA-Z0-9 _-]+$/ });
        if (!validation.valid) {
          playSFX('error');
          const input = document.querySelector('.console-input');
          input.classList.add('error');
          Tooltip(input, validation.error, { position: 'top', accent: 'var(--color-neon-crimson)' });
          setTimeout(() => input.classList.remove('error'), 1200);
          return;
        }
        playSFX('press');
        
        // Save to history
        commandHistory.push({
          command: cmd,
          timestamp: new Date().toLocaleString()
        });
        
        const line = document.createElement('div');
        line.className = 'console-line';
        line.textContent = '> ' + cmd;
        output.appendChild(line);
        setTimeout(() => {
          const resp = document.createElement('div');
          resp.className = 'console-line';
          resp.style.color = 'var(--color-neon-magenta)';
          resp.textContent = '[Impostor Bot]: ' + (cmd.toLowerCase().includes('help') ? 'You need help? I thought you were a pro.' : 'Command received. I am watching.');
          output.appendChild(resp);
          output.scrollTop = output.scrollHeight;
        }, 400);
        output.scrollTop = output.scrollHeight;
      },
      id: 'live-console'
    });
    mainPanel.appendChild(consolePanel);
  } else if (panel === 'macro') {
    mainPanel.innerHTML = '';
    const macroPanel = MacroBuilder({
      onSave: (macro) => {
        playSFX('success');
        savedMacros.push(macro);
        console.log('Saved Macro:', macro);
      },
      onExecute: (commands) => {
        playSFX('press');
        commands.forEach((cmd, index) => {
          setTimeout(() => {
            // Simulate command execution
            console.log(`Executing macro command ${index + 1}:`, cmd);
          }, index * 500);
        });
      },
      id: 'macro-builder'
    });
    mainPanel.appendChild(macroPanel);
  } else if (panel === 'history') {
    mainPanel.innerHTML = '';
    const historyPanel = CommandHistory({
      history: commandHistory,
      onExecute: (cmd) => {
        playSFX('press');
        // Add to console input
        const consoleInput = document.querySelector('.console-input');
        if (consoleInput) {
          consoleInput.value = cmd;
          consoleInput.focus();
        }
      },
      onExport: (history) => {
        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'command-history.json';
        link.click();
        URL.revokeObjectURL(url);
      },
      onImport: (data) => {
        commandHistory = data;
        console.log('Imported history:', data);
      },
      id: 'command-history'
    });
    mainPanel.appendChild(historyPanel);
  } else if (panel === 'settings') {
    mainPanel.innerHTML = `<h2 class="neon-text">Settings</h2><div id="plugin-panel"></div><div style="margin-top:1rem;">Theme: <select id="theme-select"><option value="dark">Dark</option><option value="synthwave">Synthwave</option><option value="frost">Frost</option></select></div><div style="margin-top:1rem;">Audio: <button id="mute-btn" class="neon-btn"></button> <input id="volume-slider" type="range" min="0" max="100" value="80" style="vertical-align:middle;width:120px;"></div><div style="margin-top:1rem;">[Settings panel coming soon]</div>`;
    const plugins = [
      { name: 'Motivational Quotes', enabled: true, onToggle: (v) => { playSFX('success'); } },
      { name: 'Judgement Alerts', enabled: false, onToggle: (v) => { playSFX('press'); } },
      { name: 'Focus Mode', enabled: true, onToggle: (v) => { playSFX('success'); } }
    ];
    const pluginPanel = PluginManager({ plugins });
    document.getElementById('plugin-panel').appendChild(pluginPanel);
    // Theme switcher
    const themeSelect = document.getElementById('theme-select');
    themeSelect.value = getTheme();
    themeSelect.onchange = e => { setTheme(e.target.value); playSFX('tab'); };
    // Audio controls
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    let muted = localStorage.getItem('mute') === '1';
    let vol = Number(localStorage.getItem('volume') || 0.8);
    setVolume(vol);
    muteBtn.textContent = muted ? 'Unmute' : 'Mute';
    muteBtn.onclick = () => {
      muted = !muted;
      muteBtn.textContent = muted ? 'Unmute' : 'Mute';
      localStorage.setItem('mute', muted ? '1' : '');
      if (muted) setVolume(0); else setVolume(vol);
    };
    volumeSlider.value = Math.round(vol * 100);
    volumeSlider.oninput = e => {
      vol = Number(e.target.value) / 100;
      setVolume(muted ? 0 : vol);
      localStorage.setItem('volume', vol);
    };
  }
}

// Add error style for .console-input.error
const style = document.createElement('style');
style.innerHTML = `.console-input.error { border-color: var(--color-neon-crimson)!important; box-shadow: 0 0 16px var(--color-neon-crimson)!important; animation: shake 0.3s; }
@keyframes shake { 0%{transform:translateX(0);} 20%{transform:translateX(-6px);} 40%{transform:translateX(6px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(4px);} 100%{transform:translateX(0);} }`;
document.head.appendChild(style);
