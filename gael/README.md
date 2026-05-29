# 🌌 Cosmo's Journey: The Path of a Thousand Stars

**A 2D platformer focused on neurodiversity, self-regulation, and empathy.**

<img width="1024" height="434" alt="Image" src="https://github.com/user-attachments/assets/73cbb15c-87a0-4ada-b56e-8e5c13f2fc03" />

## 📖 Project Overview

The journey of a young autistic dreamer leaving home and navigating the route to school. The game addresses the daily challenges people on the autism spectrum face — such as sensory overload and social misunderstanding — while focusing on highlighting their rich imagination, hyperfocus abilities, and capacity for resilience.

* **Genre:** 2D Platformer (Side-scroller) / Educational / Puzzle.
* **Visual Style:** Pixel Art.
* **Engine:** PixiJS (WebGL/Canvas rendering).
* **Social Goal:** To develop empathy and cognitive skills in both neurotypical and neurodivergent children.

---

## 🎮 Core Loop & Mechanics

The game subverts classic action game tropes. Violence is replaced by **self-regulation**.

1. **Sensory Filter (Health Bar):** Decreases when interacting with loud noises, crowds, or bright lights (e.g., traffic, construction sites). If it reaches zero, the character experiences a sensory meltdown, and the level restarts from the last safe point with supportive messages.
2. **Focus Energy (Mana):** Accumulated by interacting with routine elements and collectibles tied to the protagonist's hyperfocus (astronomy).
3. **Dreamer Mode:** Spends Focus Energy to slow down time or summon the protagonist's cosmic avatar, transforming hostile obstacles into safe and calm platforms.
4. **Pedagogical Puzzles (End of Level):** Instead of "Bosses," levels end with drag-and-drop challenges, such as organizing routines or matching words, restoring mental order.

---

## 👥 Main Characters

* **Gael (The Young Dreamer):** The real-world protagonist. Agile, observant, but vulnerable to sensory overload. The player controls him in urban settings and during his daily routine.
* **Cosmo (The Playful Avatar):** A playable character from the inner world. Immune to city noise. Controlled when "Dreamer Mode" is activated, transforming the gray city into a galaxy of platforms.
* **Íris (The Empathetic Therapist):** An NPC that serves as the game's *checkpoints*, providing self-regulation strategies and mechanic tutorials.
* **The Parrot (Green Bird):** Gael's pet. Essential in Phase 1 (Tutorial) to teach the player about noise levels and how to equip earmuffs (headphones).

---

## 🗺️ Storyboard & Level Design (The Journey)

<img width="1024" height="559" alt="Image" src="https://github.com/user-attachments/assets/db1e3c81-afdb-4830-ae6b-efe891efde43" />

The game consists of 7 levels representing the journey from home to school.

* **Phase 1: The Refuge (Tutorial):** Gael's bedroom. Calm blue tones. Teaches basic movement mechanics, routine (feeding the parrot), and using headphones to stabilize the Sensory Bar.
* **Phase 2: The Sidewalk and the Crowd:** Introduction to low-intensity urban stimuli.
* **Phases 3 & 4: The Railway Crossing:** The peak of visual and auditory overload. Requires intensive use of the Cosmo avatar.
* **Phase 7: Arrival at School:** The ultimate socialization challenge, culminating in a pedagogical communication puzzle.

---

## 💻 Technical Architecture

### Current State (Vanilla JS + ES Modules)

Currently, the project is rendered via **PixiJS** using pure JavaScript with modular imports. The internal resolution is locked at `1024x576` (16:9), with a responsive scaling system (Letterboxing) that scales `app.stage` to fit any viewport.

**Base File Structure:**
```text
/src
 ├── background.js   # Parallax background logic
 ├── stars.js        # Particle systems
 ├── title.js        # Dynamic canvas title generation
 ├── gael.js         # Protagonist sprites and animations
 └── main.js         # Entry point, game loop, and resize

```

### Planned Migration: Vite + Vue 3 + PixiJS

To facilitate global state management (Health, Energy), complex user interfaces (Menus, Drag & Drop Puzzles), and bundling, the project will be migrated to **Vue 3**.

**How the hybrid architecture will work:**

* **PixiJS (WebGL):** Will handle exclusively the game loop, physics, sprites, particles, and scene shaders.
* **Vue 3 (DOM/HTML):** Will handle the User Interface (HUD, Pause Menus, Title Screens) rendered *on top* of the PixiJS canvas. Vue's reactivity system will update the Sensory Bar whenever the state in PixiJS changes.

**Example of Future Component Structure (`GameView.vue`):**

```vue
<template>
  <div class="game-container">
    <HudSensorial :filterLevel="currentFilter" />

    <div ref="pixiContainer" class="pixi-canvas"></div>
  </div>
</template>

```

---

## 🎵 Audio & Soundtrack

The audio is dynamic and tied to the Sensory Bar.

* **Theme 1 (Anxiety):** Industrial drums and street noises; volume increases when Gael is stressed.
* **Theme 2 (Refuge / Hyperfocus):** Soft pianos, slow chiptune, and wind chimes; plays in Gael's bedroom and during Cosmo control.
* **Theme 3 (Victory):** Calm, cheerful lo-fi played while solving pedagogical puzzles.

---

## 🚀 How to Run the Project (Local)

*(Until the Vite migration)*
Since the project uses ES Modules (`import/export`) and loads local assets, it needs to run on a local server to avoid CORS blocking.

1. Clone this repository.
2. Use an extension such as *Live Server* in VS Code or run in the terminal:
```bash
npx serve .
```

3. Open `http://localhost:3000` in your browser.

---

> 📄 **Leia em português:** [doc/pt-br.md](doc/pt-br.md)
