const getRects = (data, w, h) => {
    const step = Math.ceil(data.length / w);
    const amp = h / 2;
    const rects = [];

    for (let i = 0; i < w; i += 5) {
        let [min, max] = [1, -1];
        for (let j = 0; j < step; j++) {
            const datum = data[i * step + j];
            if (datum < min) min = datum;
            if (datum > max) max = datum;
        }

        rects.push({
            x: i,
            y: (1 + min) * amp,
            width: 1,
            height: Math.max(1, (max - min) * amp)
        });
    }

    return rects;
};

export const drawWaveform = (canvas, data, color, active) => {
    const ctx = canvas.getContext(`2d`);
    const w   = canvas.width;
    const h   = canvas.height;
    const rects = getRects(data, w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle   = color;
    ctx.globalAlpha = active ? 1 : 0.2;
    rects.forEach((r) => ctx.fillRect(r.x, r.y, r.width, r.height));
}