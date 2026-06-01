/* ═══════════════════════════════════
   KAVIN R K — PORTFOLIO SCRIPT
   ═══════════════════════════════════ */

// ░░ THEME TOGGLE ░░
const html = document.documentElement;
const themeIcon = document.getElementById('theme-icon');
const themeBtn = document.getElementById('theme-toggle');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('krk-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('krk-theme') || 'dark';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ░░ SCROLL REVEAL ░░
const sections = document.querySelectorAll('.section, .glass-card, .section-title');
sections.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ░░ EASTER EGG — BEE CLICK COUNTER ░░
let beeClicks = 0;
let beeTimer = null;

const beeTrigger = document.getElementById('bee-trigger');
const terminalOverlay = document.getElementById('terminal-overlay');
const closeTerminal = document.getElementById('close-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

beeTrigger.addEventListener('click', () => {
  beeClicks++;
  beeTrigger.style.transform = `scale(${1 + beeClicks * 0.15}) rotate(${beeClicks * -18}deg)`;

  clearTimeout(beeTimer);
  beeTimer = setTimeout(() => {
    beeClicks = 0;
    beeTrigger.style.transform = '';
  }, 2000);

  if (beeClicks >= 5) {
    beeClicks = 0;
    beeTrigger.style.transform = '';
    openTerminal();
  }
});

// Also: Konami-code easter egg
let konamiSequence = [];
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key);
  if (konamiSequence.length > KONAMI.length) konamiSequence.shift();
  if (JSON.stringify(konamiSequence) === JSON.stringify(KONAMI)) {
    openTerminal();
    addTerminalLine('> KONAMI CODE ACCEPTED. Welcome, legend. 🎮', 't-green');
  }
});

function openTerminal() {
  terminalOverlay.classList.remove('hidden');
  setTimeout(() => terminalInput.focus(), 400);
}

closeTerminal.addEventListener('click', () => {
  terminalOverlay.classList.add('hidden');
});

terminalOverlay.addEventListener('click', (e) => {
  if (e.target === terminalOverlay) terminalOverlay.classList.add('hidden');
});

// ░░ TERMINAL COMMANDS ░░
const COMMANDS = {
  help: () => [
    '> Available commands:',
    '  whoami      — Print agent info',
    '  skills      — List technical skills',
    '  projects    — Show all projects',
    '  contact     — Show contact info',
    '  quote       — Random dev quote',
    '  clear       — Clear terminal',
    '  exit        — Close terminal',
    '  bee         — 🐝',
  ],
  whoami: () => [
    '> AGENT: Kavin R K',
    '> RANK:  Java Full Stack Developer (Cadet)',
    '> BASE:  Karur, Tamil Nadu, India',
    '> UNIT:  M. Kumarasamy College of Engineering — ECE 2023-2027',
  ],
  skills: () => [
    '> SKILL LOADOUT:',
    '  [████████░░] Java          78%',
    '  [█████████░] SQL           82%',
    '  [██████░░░░] HFSS Antenna  65%',
    '  [█████░░░░░] PCB Design    50%',
    '  [██████░░░░] MATLAB        60%',
  ],
  projects: () => [
    '> PROJECT LOG:',
    '  #01 — Obstacle Detection Smart Glasses [Hardware/IoT]',
    '  #02 — Vehicle Insurance System [Backend/SQL]',
  ],
  contact: () => [
    '> CONTACT CHANNELS:',
    '  📞 +91 97918 72456',
    '  ✉️  ezhilkathir152@gmail.com',
    '  💼  linkedin.com/in/kavin-rk-0623',
    '  🐙  github.com/Kavin-shree',
  ],
  quote: () => {
    const quotes = [
      '" First, solve the problem. Then, write the code. " — John Johnson',
      '" Code is like humor. When you have to explain it, it\'s bad. " — Cory House',
      '" It works on my machine. " — Every Dev Ever',
      '" SQL is love. SQL is life. " — Kavin, probably',
      '" Any fool can write code that a computer can understand. " — Martin Fowler',
    ];
    return ['> ' + quotes[Math.floor(Math.random() * quotes.length)]];
  },
  bee: () => ['> 🐝🐝🐝 bzzzzzz 🐝🐝🐝', '> You have unlocked the secret hive. Keep buzzing.'],
  exit: () => { terminalOverlay.classList.add('hidden'); return []; },
  clear: () => { terminalOutput.innerHTML = ''; return []; },
};

terminalInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const raw = terminalInput.value.trim().toLowerCase();
  terminalInput.value = '';

  if (!raw) return;
  addTerminalLine(`> ${raw}`, '');

  const cmd = COMMANDS[raw];
  if (cmd) {
    const lines = cmd();
    lines.forEach(line => addTerminalLine(line, 't-dim'));
  } else {
    addTerminalLine(`> Command not found: ${raw}. Type 'help'.`, 't-red');
  }

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
});

function addTerminalLine(text, cls = 't-dim') {
  const p = document.createElement('p');
  p.className = `t-line ${cls}`;
  p.textContent = text;
  terminalOutput.appendChild(p);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// ░░ ACTIVE NAV HIGHLIGHT ░░
const navLinks = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--yellow)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

allSections.forEach(sec => navObserver.observe(sec));
