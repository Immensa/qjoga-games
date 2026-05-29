// ── Personagem Gael (sprite animado idle) ─────────────────────
export async function criarGael(app, W, H) {
    // Carrega a spritesheet
    const texture = await PIXI.Assets.load('./assets/image/sprites/gael_menu_idle/spritesheet.png');
    const response = await fetch('./assets/image/sprites/gael_menu_idle/spritesheet.json');
    const data = await response.json();

    const spritesheet = new PIXI.Spritesheet(texture, data);
    await spritesheet.parse();

    // Cria array de texturas na ordem dos frames
    const frames = [];
    for (let i = 0; i < 4; i++) {
        const key = `frame_${String(i).padStart(3, '0')}`;
        frames.push(spritesheet.textures[key]);
    }

    const anim = new PIXI.AnimatedSprite(frames);
    anim.anchor.set(0.5, 1); // ancora na base (pés)
    anim.animationSpeed = 0.05;
    anim.play();

    // Escala e posição: lado esquerdo, apoiado na calçada
    const escala = (H * 0.50) / anim.height;
    anim.scale.set(escala);
    anim.x = W * 0.25;
    anim.y = H * 0.90;

    app.stage.addChild(anim);

    return { anim, escala };
}
