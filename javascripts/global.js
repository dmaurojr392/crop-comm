document.documentElement.style.setProperty('--animate-duration', '.75s');
document.querySelectorAll('.appName').forEach(element => {
    element.innerText = "AgriMetrics";
});
document.getElementsByClassName('menu-title')[0].innerText = "Dashboard";
document.getElementsByClassName('menu-title')[1].innerText = "Crop Map";

document.getElementsByClassName('nav-link')[0].innerText = "Dashboard";
document.getElementsByClassName('nav-link')[1].innerText = "Crop Map";