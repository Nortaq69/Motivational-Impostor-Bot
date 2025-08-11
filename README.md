# Motivational Impostor Bot

A visually stunning, cyberpunk-inspired desktop tool that pretends to be a friend or mentor watching your screen and silently judging/cheering you on.

## Features
- Futuristic glassmorphic neon UI
- Modular, animated components (buttons, toggles, modals, sidebar)
- Responsive layout, cyberpunk dashboard shell
- Ready for real-time interactivity, plugin/expansion support

## Folder Structure
```
/assets/         # Fonts, icons, sound, effects
/components/     # Modular UI and layout components
  /ui/           # NeonButton, NeonToggle, NeonModal, etc.
  /layout/       # Sidebar, dashboard shell
/public/         # index.html, favicon
/src/            # main.js, app.css
/utils/          # Utility JS modules
```

## Setup & Usage
1. Open `public/index.html` in a modern browser (or bundle with Electron for desktop).
2. All UI is modular and vanilla JS—no frameworks required.
3. To add new features, create new components in `/components/ui/` or `/components/layout/` and import them in `src/main.js`.

## Customization
- Edit `src/app.css` for theme colors, glassmorphism, and neon effects.
- Add new SVG icons to `/assets/icons/` and use in Sidebar or buttons.
- Expand logic in `src/main.js` for new panels, commands, or AI features.

## Roadmap
- Real-time console, command macros, plugin manager
- Animated SVG/Lottie icons, particle backgrounds
- Audio SFX and ambient sound
- AI assistant panel

---
Feel free to fork, expand, and make it your own cyberpunk dashboard!
