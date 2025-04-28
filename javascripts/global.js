document.documentElement.style.setProperty('--animate-duration', '.75s');
document.querySelectorAll('.appName').forEach(element => {
    element.innerText = "CENTRAL LUZON AGRI-ANALYTICS";
});
document.querySelectorAll('.version').forEach(element => {
    element.innerText = "version 0.2.1-beta";
});

document.getElementsByClassName('menu-title')[1].innerText = "Maps";
document.querySelector('a[href="#main"] .menu-title').innerText = "Dashboard";
document.querySelector('a[href="#ai-assistant"] .menu-title').innerText = "AI Crop Assistant";
document.querySelector('a[href="#crop-map"] .menu-title').innerText = "Crop Map";
document.querySelector('a[href="#suitability-map-banana"] .menu-title').innerText = "Banana";

document.querySelector('a[href="#main"].nav-link').innerText = "Dashboard";

// document.querySelector('a[href="#crop-map"].nav-link').innerText = "Crop Map";
document.querySelector('a[href="#crop-map"].dropdown-item').innerText = "Crop Map";
document.querySelector('a[href="#suitability-map"].dropdown-item').innerText = "Suitability Map";
document.querySelector('a[href="#ai-assistant"].nav-link').innerText = "AI Crop Assistant";

// document.getElementsByClassName('nav-link')[0].innerText = "Dashboard";
// document.getElementsByClassName('nav-link')[1].innerText = "Crop Map";

// change log
// 0.2.1-beta - 2025-04-28
// focused on improving mobile experience and smooth web interface
// deploy backend and use it as the API
// created a logo for the system

// 0.2.0-beta - 2025-04-22
// new features
// -added AI crop assistant

// bug fixes
// -fixed the bug that shows wrong label of navigation links
// -deleted unnecessary files and codes for web optimization
// -implemented new approach for loading the scripts (loading the scripts depending on the hash value)
// -cleaned up the file tree structure
// -added templates for suitability map of leading crops (add the maps when data is available)
// -added animations for improved user interaction and user experience


// 0.1.1-beta - 2025-04-03

// new features
// -added suitability map for leading crops
// -added icons (created by developer) for leading crops

// bug fixes
// -fixed the bug that shows the wrong leading crop when changing the year
// -fixed the bug that shows the wrong leading crop when changing the location
// -fixed the side navigation whereas some links remain active when clicked other links