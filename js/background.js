const direction = {
    "left": 1,
    "static": 0,
    "right": -1
}

function animateBackground({
   direction,
   phase,
   speed,
   jitter,
   refresh_fps,
   layer_offset,
   svg_waves,
   svg_circles
}) {
    const max_fps = 60;
    const timeout = 1000 / (refresh_fps < max_fps ?  refresh_fps : max_fps);

    if (svg_waves) {
        drawWaves(svg_waves, phase, speed, jitter, direction, layer_offset, timeout);
    }

    if (svg_circles) {
        drawCircles(svg_circles, timeout)
    }
}

function drawCircles(svg_circles, timeout) {
    let iteration = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];
    setInterval(async function animateCircles() {
        svg_circles.forEach(function (path, idx) {
            iteration[idx]++;
            iteration[idx] %= 140;
            const radius = iteration[idx];
            path.setAttribute('r', `${radius}`);
        });
    }, timeout);
}

function drawWaves(svg_waves, phase, speed, jitter, direction, layer_offset, timeout) {
    setInterval(async function redrawBackground() {
        const amplitude = 5;
        phase = (phase + direction * speed) % 1;

        svg_waves.forEach(function (path, idx) {
            const wave_frame = generateWave(
                10 + 10 * idx,
                amplitude,
                phase,
                jitter,
                layer_offset);
            path.setAttribute('d', wave_frame);
        });
    }, timeout);
}

function generateWave(height, amplitude, phase, jitter, layer_offset) {
    const d = ['M', 0, 100];
    for (let i = 0; i <= 100; i++) {
        const waviness =  Math.sin(2 * Math.PI * (i / 100 + phase));
        const x = i + layer_offset * waviness * Math.random();
        const y = height
            + amplitude
            * waviness
            + jitter * (Math.random() - .5);
        d.push(x, y);
    }
    d.push('L100,100', 'Z')
    return d.join(' ');
}