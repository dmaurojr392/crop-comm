window.addEventListener('hashchange', function () {
    // if (location.hash === '#ai-assistant') {
    const offcanvasElement = document.querySelector('.offcanvas.show');
    if (offcanvasElement) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
        offcanvasInstance.hide();
        }
    }
    // }
});

window.addEventListener('load', suitabilityMapHandler);
window.addEventListener('hashchange', suitabilityMapHandler);