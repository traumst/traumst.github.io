document.addEventListener("DOMContentLoaded", () => {
    const nav_button = document.querySelector('nav button');
    const nav_list = document.querySelector('nav ul');
    const nav_links = document.querySelectorAll('nav a');
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    const section_headers = document.querySelectorAll('section > h2');
    const section_divs = document.querySelectorAll('section > div');
    const email_form = document.querySelector("form");
    const svg_waves = document.querySelectorAll('.background#waves > svg > path');
    //const svg_circles = document.querySelectorAll('.background#circles > svg > circle');

    animateNavigationBar({main, nav_button, nav_list, nav_links, sections});

    animateSlidingElements({section_headers, section_divs});

    animateContactForm({ email_form });

    // control the background wave parameters
    let background_phase = 0;
    let background_speed = .003;
    let background_jitter = .05;
    let background_refresh_fps = 60;
    let background_layer_offset = 2;
    let background_direction = direction.right;
    animateBackground({
        direction: background_direction,
        phase: background_phase,
        speed: background_speed,
        jitter: background_jitter,
        refresh_fps: background_refresh_fps,
        layer_offset: background_layer_offset,
        svg_waves,
        //svg_circles,
    })
})