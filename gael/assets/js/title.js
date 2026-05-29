import { criarGlow, criarSpriteGlow } from './glow.js';
import { criarTexturaEstrelaGrande } from './stars.js';

// ── Título: COSMO + estrela (apóstrofo elevado) + S JOURNEY ──
export function criarTitulo(app, W, H) {
    const tituloFontSize = Math.round(H * 0.07);
    const tituloLetterSpacing = Math.round(H * 0.007);
    const tituloY = Math.floor(H * 0.165);

    const tituloOpts = {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: tituloFontSize,
        letterSpacing: tituloLetterSpacing,
        corGlowHex: 0x00ccff,
        numCamadas: 12,
        gradienteStops: [
            { offset: 0,   color: 0xa0f0ff },
            { offset: 0.4, color: 0xc070ff },
            { offset: 1,   color: 0xffe080 },
        ],
        strokeCor: 0x140c26,
        strokeWidth: Math.max(3, Math.round(H * 0.007)),
        noAddToStage: true,
    };

    const parteEsq = criarGlow(app, { texto: 'COSMO',    ...tituloOpts });
    const parteDir = criarGlow(app, { texto: 'S JOURNEY', ...tituloOpts });

    // Grupo centralizado — palavras grudadas, estrela sobrepõe
    const tituloGroup = new PIXI.Container();
    const starScale = 3;

    const largTotal = parteEsq.largura + 1 + parteDir.largura;
    const startX = -largTotal / 2;

    parteEsq.container.x = startX + parteEsq.largura / 2;
    parteDir.container.x = startX + parteEsq.largura + 10 + parteDir.largura / 2;

    tituloGroup.addChild(parteEsq.container);
    tituloGroup.addChild(parteDir.container);
    tituloGroup.x = W / 2;
    tituloGroup.y = tituloY;
    app.stage.addChild(tituloGroup);

    // Estrela absoluta sobre a junção O|S, elevada como apóstrofo
    const estrelaTex = criarTexturaEstrelaGrande(Math.round(H * 0.018));
    const starCenterX = startX + parteEsq.largura;
    const starYOffset = -Math.round(tituloFontSize * 0.48);

    const estrelaGlow = criarSpriteGlow(app, {
        texture: estrelaTex.texture,
        corGlowHex: 0x00ccff,
        numCamadas: 12,
        x: W / 2 + starCenterX,
        y: tituloY + starYOffset,
        tintNitido: 0xffffff,
    });
    estrelaGlow.container.scale.set(starScale);

    const tituloLayers = [...parteEsq.layers, ...parteDir.layers, ...estrelaGlow.layers];

    return { tituloLayers, estrelaGlow, starScale, tituloGroup, tituloY, starCenterX, starYOffset };
}
