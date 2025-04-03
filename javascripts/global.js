document.documentElement.style.setProperty('--animate-duration', '.75s');
document.querySelectorAll('.appName').forEach(element => {
    element.innerText = "Central Luzon Agrilytics";
});
document.querySelectorAll('.version').forEach(element => {
    element.innerText = "version 0.1.1-beta";
});
// change log
// 0.1.1-beta - 2025-04-03

// new features
// -added suitability map for leading crop
// -added icons for leading crop

// bug fixes
// -fixed the bug that shows the wrong leading crop when changing the year
// -fixed the bug that shows the wrong leading crop when changing the location
// -fixed the side navigation whereas some links remain active when clicked other links