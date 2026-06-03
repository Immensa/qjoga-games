# 🤝 Contributing to QJoga HTML5 Games

Thank you for your interest in contributing! This document describes how to submit new games, improvements, and fixes.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Types of Contributions](#types-of-contributions)
- [Directory Structure](#directory-structure)
- [Requirements for New Games](#requirements-for-new-games)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Commit Messages](#commit-messages)
- [Licensing](#licensing)

---

## Code of Conduct

This project follows a simple principle: **respect, inclusion, and collaboration**. Discussions must be constructive and environments free from harassment.

Games themed around **hate, discrimination, adult content, or gratuitous violence** will not be accepted.

---

## Types of Contributions

| Type | Description |
|------|-------------|
| **New Game** | Submit a complete HTML5 game following the requirements below |
| **Improvement** | Enhance existing games (performance, accessibility, mechanics) |
| **Fix** | Fix bugs, compatibility issues, or regressions |
| **Port to Vue 3** | Migrate vanilla JS games to the Vue 3 + Vite + TypeScript stack |
| **Assets** | Sprites, sounds (CC0 or CC-BY), translations (pt-BR, en) |
| **Documentation** | Improve docs, tutorials, inline comments |

---

## Directory Structure

Each game must follow this directory convention:

```
html5_games/
└── game-slug/              # lowercase slug, no spaces
    ├── README.md           # Name, description, how to play, credits
    ├── index.html          # Entry point (or main.ts if Vue 3)
    ├── game.js             # Core logic (or src/ if Vue 3)
    ├── style.css           # Styles (or Tailwind if Vue 3)
    └── assets/             # Sprites, sounds, fonts
        ├── sprites/
        ├── audio/
        └── fonts/
```

For Vue 3 + Vite based games, follow the [`gael/`](gael/) structure.

---

## Requirements for New Games

### Mandatory

- [ ] **Compatible license**: BSD 3-Clause, MIT, CC0, or CC-BY (assets)
- [ ] **100% client-side**: No backend server dependency
- [ ] **Responsive**: Works on mobile (touch) and desktop (keyboard/mouse)
- [ ] **Vanilla JS, Vue 3, or PixiJS**: Stack aligned with the project
- [ ] **README.md**: Minimum documentation — game name, description, controls, credits
- [ ] **No external CDN dependencies**: All libs must be in the repository or via npm
- [ ] **Accessible**: Adequate contrast, button labels, keyboard functional where applicable

### Desirable

- [ ] **Gamepad** support (Gamepad API)
- [ ] **Translation** pt-BR + en (simple i18n object in the JS itself)
- [ ] **LocalStorage** for save/high-score
- [ ] **Meta tags** for social media preview (og:image, etc.)
- [ ] **Service Worker** for offline support (minimal PWA)

---

## Code Standards

### HTML
- Use `<!DOCTYPE html>` and UTF-8 encoding
- Viewport meta tag for responsiveness: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Semantic elements when appropriate

### JavaScript
- **ES Modules** (`import`/`export`) — don't use `var`, global IIFEs, or inline scripts
- Prefer `const` and `let`; avoid `var`
- Pure functions and descriptive names
- Comments in **English** for code

```js
// ✅ Good
const playerSpeed = 5;

function movePlayer(direction, delta) {
  // Normalize diagonal movement
  const factor = direction.x && direction.y ? 0.707 : 1;
  return {
    x: direction.x * playerSpeed * delta * factor,
    y: direction.y * playerSpeed * delta * factor
  };
}

// ❌ Avoid
var spd = 5;
function mv(d) { ... }
```

### CSS
- Flexbox or Grid for layout
- Use relative units (`rem`, `%`, `vw/vh`) — avoid fixed `px` for layout
- CSS variables for themes/colors: `--color-primary`, `--spacing-unit`, etc.

### Performance
- Use `requestAnimationFrame` for game loop — never `setInterval`
- Delta-time for frame-independent movement
- Avoid `console.log` in production — use a debug flag
- Spritesheets instead of individual images

### Vue 3 (when applicable)
- Composition API with `<script setup>`
- TypeScript preferred, but JS allowed
- Pinia for global game state
- `defineExpose` only when necessary

---

## Pull Request Process

1. **Fork** the repository
2. Create a descriptive branch:
   ```bash
   git checkout -b game/game-slug        # new game
   git checkout -b fix/fix-description   # fix
   git checkout -b feat/new-mechanic     # feature
   ```
3. Add your game under `html5_games/<slug>/` with the structure above
4. Update the games table in [README.md](README.md)
5. Test on at least **2 browsers** (Chrome + Firefox or Safari)
6. Test on **mobile** (viewport < 768px) — Chrome DevTools is sufficient
7. Open the PR with the template below

### PR Template

```markdown
## 🎮 Type: [New Game / Improvement / Fix]

### Description
Brief description of what was done.

### Checklist
- [ ] Directory structure follows the convention
- [ ] Tested on 2+ browsers
- [ ] Tested on mobile viewport
- [ ] README.md filled out
- [ ] Assets with compatible license (or created from scratch)
- [ ] No external CDN dependencies
- [ ] Root README.md updated

### Screenshots
<!-- Screenshots of the game on desktop and mobile -->
```

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
game(name): add game X
fix(name): fix final boss collision
feat(name): add save system
perf(name): optimize render loop
docs: update build instructions
style(name): adjust color palette
refactor(name): extract physics to separate module
```

---

## Licensing

By contributing, you agree that your code will be licensed under the **[BSD 3-Clause License](LICENSE)**.

Assets (sprites, sounds, fonts) must be:
- **Created by you** (you own the rights and license under BSD 3-Clause), or
- **CC0 / Public Domain** (attribution in the game's README), or
- **CC-BY** with clear attribution (author name and link in the README)

**Do not submit** third-party assets without verifiable compatible licensing.

---

## Questions?

Open an [issue](../../issues) with the `question` or `game-proposal` tag.

Before starting a large game, consider opening an issue with the `game-proposal` tag to align expectations and avoid rework.
