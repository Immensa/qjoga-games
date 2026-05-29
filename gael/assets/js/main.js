import { criarFundo, criarVinheta } from './background.js';
import { criarEstrelasFundo } from './stars.js';
import { criarTitulo } from './title.js';
import { criarSubtitulo } from './subtitle.js';
import { iniciarAnimacao } from './animation.js';
import { criarGael } from './gael.js';

// ── Resolução interna fixa (design de referência) ───────────────
export const W = 1024, H = 576;

const app = new PIXI.Application();
await app.init({
    width: W,
    height: H,
    background: 0x05030a,
    antialias: true,
});
document.body.appendChild(app.canvas);

await document.fonts.load('1em "Press Start 2P"');
await document.fonts.load('1em "VT323"');

// ── Escala responsiva (stage se adapta ao viewport) ────────────
function redimensionar() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / W, vh / H);

    app.renderer.resize(vw, vh);
    app.stage.scale.set(scale);
    app.stage.x = (vw - W * scale) / 2;
    app.stage.y = (vh - H * scale) / 2;
}
window.addEventListener('resize', redimensionar);
redimensionar();

// ── Elementos ─────────────────────────────────────────────────
await criarFundo(app, W, H);
criarEstrelasFundo(app, W, H);
criarVinheta(app, W, H);
await criarGael(app, W, H);

const titulo = criarTitulo(app, W, H);
const subtitulo = criarSubtitulo(app, W, H);

iniciarAnimacao(app, titulo.tituloLayers, subtitulo.layers, titulo.estrelaGlow, titulo.starScale);
