function animateSlidingElements({ section_headers, section_divs }) {
    const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.3) {
                entry.target.classList.add('slider');
            } else {
                entry.target.classList.remove('slider');
            }
        });
    }, {threshold: [.1, .2, .3, .4, .5, .6, .7, .8, .9]});
    section_headers.forEach(header => {
        intersectionObserver.observe(header);
    });
    section_divs.forEach(div => {
        intersectionObserver.observe(div);
    });
}