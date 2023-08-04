let isNavAnimated = false;
document.addEventListener("htmx:afterOnLoad", () => {
    const nav_button = document.querySelector('nav button');
    const nav_list = document.querySelector('nav ul');
    const nav_links = document.querySelectorAll('nav a');
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    const section_headers = document.querySelectorAll('section > h2');
    const section_divs = document.querySelectorAll('section > div');
    const currentYear = document.querySelectorAll('.current-year');
    const since2016 = document.querySelectorAll('.since-2016');
    const thisYear = new Date().getFullYear();

    // set dynamic dates
    currentYear.forEach(function (placeholder, _) {
        placeholder.textContent = "" + thisYear;
    })
    since2016.forEach(function (placeholder, _) {
        placeholder.textContent = "" + (thisYear - 2016);
    })

    if (!isNavAnimated) {
        animateNavigationBar({main, nav_button, nav_list, nav_links, sections});
        isNavAnimated = true;
    }

    animateSlidingElements({section_headers, section_divs});
})