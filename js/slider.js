function animateSlidingElements({ section_headers, section_divs }) {
    const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.2) {
                entry.target.classList.add('slider');
            } else {
                entry.target.classList.remove('slider');
            }
        });
    }, {threshold: [.1, .25, .35, .5, .65, .75, .9]});
    section_headers.forEach(header => {
        intersectionObserver.observe(header);
    });
    section_divs.forEach(div => {
        intersectionObserver.observe(div);
    });
}