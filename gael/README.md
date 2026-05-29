# 🌌 Cosmo's Journey: O Caminho das Mil Estrelas

**Um jogo de plataforma 2D focado em neurodiversidade, autorregulação e empatia.**

<img width="1024" height="434" alt="Image" src="https://github.com/user-attachments/assets/73cbb15c-87a0-4ada-b56e-8e5c13f2fc03" />

## 📖 Visão Geral do Projeto
A jornada de um jovem sonhador autista saindo de casa e enfrentando o trajeto até a escola. O jogo aborda as adversidades diárias que pessoas no espectro autista enfrentam — como excesso de estímulos sensoriais e incompreensão social —, mas foca em destacar sua imaginação rica, hiperfocos e capacidade de superação.

* **Gênero:** Plataforma 2D (Side-scroller) / Educativo / Quebra-cabeça.
* **Estilo Visual:** Pixel Art.
* **Engine:** PixiJS (Renderização WebGL/Canvas).
* **Objetivo Social:** Desenvolver empatia e habilidades cognitivas em crianças neurotípicas e atípicas.

---

## 🎮 O "Core Loop" e Mecânicas
O jogo subverte os clássicos de jogos de ação. A violência é substituída pela **autorregulação**.

1. **Filtro Sensorial (Barra de Vida):** Cai ao interagir com ruídos altos, multidões ou luzes fortes (ex: trânsito, obras). Se zerar, o personagem tem um colapso sensorial, e a fase recomeça do último ponto de segurança com mensagens de apoio.
2. **Energia de Foco (Mana):** Acumulada ao interagir com elementos de rotina e colecionáveis ligados ao hiperfoco do protagonista (astronomia).
3. **Modo Sonhador:** Gasta Energia de Foco para desacelerar o tempo ou invocar o avatar cósmico do protagonista, transformando obstáculos hostis em plataformas seguras e calmas.
4. **Puzzles Pedagógicos (Fim de Fase):** Em vez de "Chefões", as fases terminam com desafios de arrastar e soltar (Drag & Drop), como organizar rotinas ou parear palavras, restaurando a ordem mental.

---

## 👥 Personagens Principais
* **Gael (O Jovem Sonhador):** Protagonista do mundo real. Ágil, observador, mas vulnerável a sobrecargas sensoriais. O jogador o controla nas partes urbanas e na sua rotina.
* **Cosmo (O Avatar Lúdico):** Personagem jogável do mundo interno. Imune ao ruído da cidade. Controlado quando o "Modo Sonhador" é ativado, transforma a cidade cinza em uma galáxia de plataformas.
* **Íris (A Terapeuta Empática):** NPC que atua como os *checkpoints* do jogo, fornecendo estratégias de autorregulação e tutoriais mecânicos.
* **O Papagaio (Verde de Papo Amarelo):** O animal de estimação de Gael. Essencial na Fase 1 (Tutorial) para ensinar o jogador sobre níveis de ruído e como equipar os abafadores (fones de ouvido).

---

## 🗺️ Storyboard e Level Design (A Jornada)
O jogo é composto por 7 fases que representam o trajeto de casa até a escola.

* **Fase 1: O Refúgio (Tutorial):** O quarto de Gael. Tons azuis e calmos. Ensina mecânicas básicas de movimento, rotina (alimentar o papagaio) e o uso do fone de ouvido para estabilizar a Barra Sensorial.
* **Fase 2: A Calçada e a Multidão:** Introdução aos estímulos urbanos em baixa intensidade.
* **Fase 3 e 4: O Cruzamento Ferroviário:** O pico da sobrecarga visual e sonora. Exige o uso intenso do avatar Cosmo.
* **Fase 7: A Chegada à Escola:** O grande desafio de socialização final, culminando em um puzzle pedagógico de comunicação.

---

## 💻 Arquitetura Técnica

### Estado Atual (Vanilla JS + ES Modules)
Atualmente, o projeto é renderizado via **PixiJS** utilizando JavaScript puro com importações modulares. A resolução interna é travada em `1024x576` (16:9), com um sistema de redimensionamento responsivo (Letterboxing) que escala a `app.stage` para caber em qualquer viewport.

**Estrutura de Arquivos Base:**
```text
/src
 ├── background.js   # Lógica do cenário em parallax
 ├── stars.js        # Sistemas de partículas
 ├── title.js        # Geração dinâmica do título em canvas
 ├── gael.js         # Sprites e animações do protagonista
 └── main.js         # Ponto de entrada, loop e resize

```

### Migração Planejada: Vite + Vue 3 + PixiJS

Para facilitar o gerenciamento de estados globais (Vida, Energia), interfaces de usuário complexas (Menus, Puzzles Drag & Drop) e empacotamento, o projeto será migrado para **Vue 3**.

**Como funcionará a arquitetura híbrida:**

* **PixiJS (WebGL):** Cuidará exclusivamente do loop do jogo, física, sprites, partículas e shaders do cenário.
* **Vue 3 (DOM/HTML):** Cuidará da Interface de Usuário (HUD, Menus de Pausa, Telas Iniciais) renderizada *por cima* do canvas do PixiJS. O sistema de reatividade do Vue atualizará a Barra Sensorial sempre que o estado no PixiJS mudar.

**Exemplo de Componentização Futura (`GameView.vue`):**

```vue
<template>
  <div class="game-container">
    <HudSensorial :nivelFiltro="filtroAtual" />
    
    <div ref="pixiContainer" class="pixi-canvas"></div>
  </div>
</template>

```

---

## 🎵 Áudio e Trilha Sonora

O áudio é dinâmico e amarrado à Barra Sensorial.

* **Tema 1 (Ansiedade):** Baterias industriais e ruídos de rua; aumenta de volume quando Gael está estressado.
* **Tema 2 (Refúgio / Hiperfoco):** Pianos suaves, chiptune lento e sinos de vento; toca no quarto de Gael e durante o controle de Cosmo.
* **Tema 3 (Vitória):** Lo-fi calmo e alegre tocado durante a resolução dos puzzles pedagógicos.

---

## 🚀 Como Executar o Projeto (Local)

*(Até a migração para o Vite)*
Como o projeto utiliza ES Modules (`import/export`) e carrega assets locais, ele precisa rodar em um servidor local para evitar bloqueios de CORS.

1. Clone este repositório.
2. Utilize uma extensão como o *Live Server* no VS Code ou rode no terminal:
```bash
npx serve .

```


3. Acesse `http://localhost:3000` no navegador.