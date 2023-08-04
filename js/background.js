const direction = {
    "left": 1,
    "static": 0,
    "right": -1
}

let isBackgroundAnimated = false;
function animateBackground({
   direction,
   phase,
   speed,
   jitter,
   refresh_fps,
   layer_offset,
   svg_waves
}) {
    if (isBackgroundAnimated)
        return;

    const max_fps = 60;
    const timeout = 1000 / (refresh_fps < max_fps ?  refresh_fps : max_fps);

    if (svg_waves) {
        drawWaves(svg_waves, phase, speed, jitter, direction, layer_offset, timeout);
    }

    isBackgroundAnimated = true;
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

// control the background wave parameters
let background_phase = 0;
let background_speed = .003;
let background_jitter = .05;
let background_refresh_fps = 60;
let background_layer_offset = 2;
let background_direction = direction.right;
const svg_waves = document.querySelectorAll('.background#waves > svg > path');
animateBackground({
    direction: background_direction,
    phase: background_phase,
    speed: background_speed,
    jitter: background_jitter,
    refresh_fps: background_refresh_fps,
    layer_offset: background_layer_offset,
    svg_waves,
});