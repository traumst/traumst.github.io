function animateNavigationBar({ nav_button, nav_list, nav_links, sections }){
    animateNavLinks({ nav_links, sections })
    animateNavButton({ nav_button, nav_list, nav_links });
}

function animateNavLinks({nav_links, sections}) {
    const sectionArray = Array.from(sections);
    let selectedNavLinkIndex = -1;

    function selectNavLink(sectionIndex) {
        if (sectionIndex === selectedNavLinkIndex)
            return;
        else
            selectedNavLinkIndex = sectionIndex;

        nav_links.forEach(navLink => navLink.classList.remove("active"));
        nav_links[sectionIndex].classList.add('active');
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let sectionIndex = sectionArray.indexOf(entry.target);
                selectNavLink(sectionIndex);
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
}

function animateNavButton({ nav_button, nav_list, nav_links }) {
    window.onload = function () {
        nav_list.classList.add('hidden');
    }

    nav_button.addEventListener('click', _ => {
        if (nav_list.classList.contains('hidden')) {
            showNavList();
        } else {
            hideNavList();
        }
    });

    nav_links.forEach(navLink => {
        navLink.addEventListener('click', _ => {
            if (!nav_list.classList.contains('hidden')) {
                hideNavList();
            }
        });
    });

    document.addEventListener('click', event => {
        if (!nav_button.contains(event.target) && !nav_list.contains(event.target)) {
            if (!nav_list.classList.contains('hidden')) {
                hideNavList();
            }
        }
    });

    function showNavList() {
        nav_list.classList.remove('hidden');
        nav_list.classList.add('visible');
    }

    function hideNavList() {
        nav_list.classList.remove('visible');
        nav_list.classList.add('hidden');
    }
}