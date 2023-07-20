window.api.receive('load-page', (page) => {
    let responseMessage;
    switch (page) {
        case 'index':
            window.location.href = '../html/index.html';
            responseMessage = 'index page loaded';
            break;
        case 'page2':
            window.location.href = '../html/page2.html';
            responseMessage = 'page2 loaded';
            break;
        case 'about':
            window.location.href = '../html/about.html';
            responseMessage = 'about page loaded';
            break;
        default:
            window.location.href = '../html/index.html';
            responseMessage = 'page not found - loading index page';
    }
    window.api.send('page-loaded', responseMessage);
});

window.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    setTimeout(function () {
        document.body.classList.add('fade-in');
    }, 250); 

    // Checks and applies the initial dark mode configuration
    const darkMode = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkMode === 'on' || (darkMode === 'auto' && prefersDarkScheme)) {
        body.classList.add('bg-dark', 'text-white');
    } else if (darkMode === 'off' || (darkMode === 'auto' && !prefersDarkScheme)) {
        body.classList.remove('bg-dark', 'text-white');
    }
});

function setDarkMode(mode) {
    const body = document.body;
    const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (window.location.pathname === '/index.html') {
        readDarkMode();
    }

    switch (mode) {
        case 'auto':
            if (prefersDarkScheme) {
                body.classList.add('bg-dark', 'text-white');
                body.classList.remove('bg-light', 'text-dark');
            } else {
                body.classList.remove('bg-dark', 'text-white');
                body.classList.add('bg-light', 'text-dark');
            }
            localStorage.setItem('darkMode', 'auto');
            break;

        case 'on':
            body.classList.add('bg-dark', 'text-white');
            body.classList.remove('bg-light', 'text-dark');
            localStorage.setItem('darkMode', 'on');
            break;

        case 'off':
            body.classList.remove('bg-dark', 'text-white');
            body.classList.add('bg-light', 'text-dark');
            localStorage.setItem('darkMode', 'off');
            break;

        default:
            break;
    }
}

function readDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    console.log(darkMode);
    return darkMode;
}
