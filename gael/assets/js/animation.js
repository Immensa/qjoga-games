// ── Animação do glow e pulsar da estrela ──────────────────────
export function iniciarAnimacao(app, tituloLayers, subtituloLayers, estrelaGlow, starScale) {
    let tempo = 0;
    app.ticker.add((ticker) => {
        tempo += 0.035 * ticker.deltaTime;

        for (const grupo of [tituloLayers, subtituloLayers]) {
            for (const layer of grupo) {
                if (layer.t === 0) continue;
                const wave = 0.65 + 0.35 * Math.sin(tempo + layer.t * 1.8);

                if (layer.sprite.filters?.[0]) {
                    layer.sprite.filters[0].blur = layer.baseBlur * wave;
                }
                layer.sprite.alpha = layer.baseAlpha * wave;
                layer.sprite.scale.set(layer.baseScale * (0.97 + 0.03 * wave));
            }
        }

        // Pulsar dedicado da estrela (mais intenso e rápido)
        const starPulse = 0.6 + 0.4 * Math.abs(Math.sin(tempo * 2.2));
        estrelaGlow.container.scale.set(starScale * starPulse);
        estrelaGlow.container.alpha = 0.7 + 0.3 * starPulse;
    });
}
