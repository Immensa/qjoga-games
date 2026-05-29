// ── Cria texto com glow (BlurFilter multicamada) ───────────────
export function criarGlow(app, {
    texto, fontFamily, fontSize, letterSpacing,
    corGlowHex, numCamadas, x, y,
    gradienteStops,
    strokeCor, strokeWidth,
    noAddToStage,
}) {
    const container = new PIXI.Container();
    const layers = [];

    const baseOpts = {
        fontFamily, fontSize, fontWeight: 'bold', letterSpacing,
    };

    // Textura para GLOW: texto branco sólido
    const glowText = new PIXI.Text({
        text: texto,
        style: { ...baseOpts, fill: 0xffffff, stroke: { color: 0xffffff, width: 2 } },
    });
    const glowTex = app.renderer.generateTexture({ target: glowText });

    // Textura para camada NÍTIDA: texto com gradiente
    const grad = new PIXI.FillGradient(0, 0, 0, 1);
    for (const stop of gradienteStops) {
        grad.addColorStop(stop.offset, stop.color);
    }
    const sharpText = new PIXI.Text({
        text: texto,
        style: {
            ...baseOpts,
            fill: { fill: grad },
            stroke: { color: strokeCor, width: strokeWidth },
            lineJoin: 'miter',
        },
    });
    const sharpTex = app.renderer.generateTexture({ target: sharpText });

    // Camadas de glow (externas → internas)
    for (let i = numCamadas; i >= 1; i--) {
        const t = i / numCamadas;
        const s = new PIXI.Sprite(glowTex);
        s.anchor.set(0.5);
        s.tint = corGlowHex;

        const blur = new PIXI.BlurFilter();
        blur.blur = 2 + t * 32;
        blur.quality = 4;
        blur.padding = Math.ceil(blur.blur * 3);
        s.filters = [blur];

        s.alpha = 0.04 + t * 0.18;
        s.scale.set(1 + t * 0.09);
        s.blendMode = 'add';

        layers.push({ sprite: s, t, baseBlur: blur.blur, baseAlpha: s.alpha, baseScale: s.scale.x });
        container.addChild(s);
    }

    // Camada nítida no topo
    const sharp = new PIXI.Sprite(sharpTex);
    sharp.anchor.set(0.5);
    layers.push({ sprite: sharp, t: 0, baseBlur: 0, baseAlpha: 1, baseScale: 1 });
    container.addChild(sharp);

    if (!noAddToStage) {
        container.x = x;
        container.y = y;
        app.stage.addChild(container);
    }
    return { container, layers, glowTex, sharpTex, largura: glowTex.width };
}

// ── Cria sprite com glow (para a estrela entre as palavras) ───
export function criarSpriteGlow(app, { texture, corGlowHex, numCamadas, x, y, tintNitido }) {
    const container = new PIXI.Container();
    container.x = x;
    container.y = y;
    const layers = [];

    for (let i = numCamadas; i >= 1; i--) {
        const t = i / numCamadas;
        const s = new PIXI.Sprite(texture);
        s.anchor.set(0.5);
        s.tint = corGlowHex;

        const blur = new PIXI.BlurFilter();
        blur.blur = 2 + t * 32;
        blur.quality = 4;
        blur.padding = Math.ceil(blur.blur * 3);
        s.filters = [blur];

        s.alpha = 0.04 + t * 0.18;
        s.scale.set(1 + t * 0.09);
        s.blendMode = 'add';

        layers.push({ sprite: s, t, baseBlur: blur.blur, baseAlpha: s.alpha, baseScale: s.scale.x });
        container.addChild(s);
    }

    const sharp = new PIXI.Sprite(texture);
    sharp.anchor.set(0.5);
    if (tintNitido) sharp.tint = tintNitido;
    layers.push({ sprite: sharp, t: 0, baseBlur: 0, baseAlpha: 1, baseScale: 1 });
    container.addChild(sharp);

    app.stage.addChild(container);
    return { container, layers };
}
