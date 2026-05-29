// ── Fundo (imagem background.png) ───────────────────────────────
export async function criarFundo(app, W, H) {
    try {
        const bgTex = await PIXI.Assets.load('./assets/image/background.png');
        const bg = new PIXI.Sprite(bgTex);
        bg.width = W;
        bg.height = H;
        app.stage.addChildAt(bg, 0);
        return bg;
    } catch (e) {
        return null;
    }
}

// ── Vinheta escura (topo e transição) ─────────────────────────
export function criarVinheta(app, W, H) {
    const g = new PIXI.Graphics();
    g.fill({ color: 0x000000, alpha: 0.65 });
    g.rect(0, 0, W, Math.floor(H * 1));
    g.fill({ color: 0x000000, alpha: 0.30 });
    g.rect(0, Math.floor(H * 1), W, Math.floor(H * 0.10));
    app.stage.addChild(g);
    return g;
}
