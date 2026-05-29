import { criarGlow } from './glow.js';

// ── Subtítulo ──────────────────────────────────────────────────
export function criarSubtitulo(app, W, H) {
    return criarGlow(app, {
        texto: 'O Caminho das Mil Estrelas',
        fontFamily: '"VT323", "Courier New", monospace',
        fontSize: Math.round(H * 0.048),
        letterSpacing: Math.round(H * 0.009),
        corGlowHex: 0x9944ff,
        numCamadas: 8,
        x: W / 2,
        y: Math.floor(H * 0.23),
        gradienteStops: [
            { offset: 0, color: 0xffffff },
            { offset: 1, color: 0xffffff },
        ],
        strokeCor: 0x140c26,
        strokeWidth: Math.max(2, Math.round(H * 0.005)),
    });
}
