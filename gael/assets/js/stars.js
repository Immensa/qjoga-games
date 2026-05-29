// ── Textura de estrela pequena (fundo) ──────────────────────────
export function criarTexturaEstrela(rayLen) {
    const pad = rayLen + 6;
    const size = pad * 2;
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d');
    const cx = size / 2, cy = size / 2;

    // Glow radial amplo atrás das pontas
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rayLen * 1.2);
    glow.addColorStop(0, 'rgba(255,255,255,0.9)');
    glow.addColorStop(0.3, 'rgba(200,220,255,0.4)');
    glow.addColorStop(0.6, 'rgba(150,180,255,0.08)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);

    // Raio horizontal c/ gradiente (centro brilhante → pontas transparentes)
    const hGrad = ctx.createLinearGradient(cx - rayLen, cy, cx + rayLen, cy);
    hGrad.addColorStop(0, 'rgba(255,255,255,0)');
    hGrad.addColorStop(0.35, 'rgba(255,255,255,0.85)');
    hGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
    hGrad.addColorStop(0.65, 'rgba(255,255,255,0.85)');
    hGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hGrad;
    ctx.fillRect(cx - rayLen, cy - 1.2, rayLen * 2, 2.4);

    // Raio vertical c/ gradiente
    const vGrad = ctx.createLinearGradient(cx, cy - rayLen, cx, cy + rayLen);
    vGrad.addColorStop(0, 'rgba(255,255,255,0)');
    vGrad.addColorStop(0.35, 'rgba(255,255,255,0.85)');
    vGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
    vGrad.addColorStop(0.65, 'rgba(255,255,255,0.85)');
    vGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = vGrad;
    ctx.fillRect(cx - 1.2, cy - rayLen, 2.4, rayLen * 2);

    // Centro brilhante
    const centro = ctx.createRadialGradient(cx, cy, 0, cx, cy, 3);
    centro.addColorStop(0, 'rgba(255,255,255,1)');
    centro.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    centro.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = centro;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    return { texture: PIXI.Texture.from(c), rayLen };
}

// ── Textura de estrela grande (apóstrofo do título) ────────────
export function criarTexturaEstrelaGrande(rayLen) {
    const pad = rayLen + 8;
    const size = pad * 2;
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d');
    const cx = size / 2, cy = size / 2;

    // Glow radial amplo
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rayLen * 1.3);
    glow.addColorStop(0, 'rgba(255,255,255,1)');
    glow.addColorStop(0.2, 'rgba(255,240,200,0.7)');
    glow.addColorStop(0.5, 'rgba(200,180,255,0.25)');
    glow.addColorStop(0.8, 'rgba(100,150,255,0.05)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);

    // Raio horizontal
    const hGrad = ctx.createLinearGradient(cx - rayLen, cy, cx + rayLen, cy);
    hGrad.addColorStop(0, 'rgba(255,255,255,0)');
    hGrad.addColorStop(0.3, 'rgba(255,255,200,0.9)');
    hGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
    hGrad.addColorStop(0.7, 'rgba(255,255,200,0.9)');
    hGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hGrad;
    ctx.fillRect(cx - rayLen, cy - 1, rayLen * 2, 2);

    // Raio vertical
    const vGrad = ctx.createLinearGradient(cx, cy - rayLen, cx, cy + rayLen);
    vGrad.addColorStop(0, 'rgba(255,255,255,0)');
    vGrad.addColorStop(0.3, 'rgba(255,255,200,0.9)');
    vGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
    vGrad.addColorStop(0.7, 'rgba(255,255,200,0.9)');
    vGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = vGrad;
    ctx.fillRect(cx - 1, cy - rayLen, 2, rayLen * 2);

    // Centro brilhante
    const centro = ctx.createRadialGradient(cx, cy, 0, cx, cy, 3);
    centro.addColorStop(0, 'rgba(255,255,255,1)');
    centro.addColorStop(0.4, 'rgba(255,255,255,1)');
    centro.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = centro;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    return { texture: PIXI.Texture.from(c), largura: size };
}

// ── Estrelas de fundo (twinkling) ──────────────────────────────
export function criarEstrelasFundo(app, W, H) {
    const container = new PIXI.Container();
    const texP = criarTexturaEstrela(4);
    const texM = criarTexturaEstrela(7);
    const texG = criarTexturaEstrela(12);
    const texturas = [texP, texM, texG];

    const stars = [];
    for (let i = 0; i < 200; i++) {
        const tex = texturas[Math.floor(Math.random() * texturas.length)];
        const sprite = new PIXI.Sprite(tex.texture);
        sprite.anchor.set(0.5);
        sprite.x = Math.random() * W;
        sprite.y = Math.random() * H;
        sprite.blendMode = 'add';

        const baseScale = 0.4 + Math.random() * 0.8;
        sprite.scale.set(baseScale);

        stars.push({
            sprite,
            baseAlpha: 0.25 + Math.random() * 0.55,
            baseScale,
            speed: 0.3 + Math.random() * 1.2,
            phase: Math.random() * Math.PI * 2,
        });
        container.addChild(sprite);
    }

    const tickerFn = () => {
        const ts = performance.now() * 0.001;
        for (const s of stars) {
            const raw = Math.sin(s.phase + ts * s.speed);
            const flicker = 0.15 + 0.85 * Math.abs(raw);
            s.sprite.alpha = s.baseAlpha * flicker;
            s.sprite.scale.set(s.baseScale * flicker);
        }
    };

    app.stage.addChild(container);
    app.ticker.add(tickerFn);

    return {
        container,
        destroy() {
            app.ticker.remove(tickerFn);
            container.destroy({ children: true });
        },
    };
}
