// Initialize the map and set its view to a given location and zoom level
var suitMap = L.map('suitMap').setView([15.5, 120.75], 9); // Coordinates for Manila, PH
// Initialize a new map instance
// suitMap = L.map('suitMap').setView([15.5, 120.75], 7.5);
const bounds = [
    [4.2158, 116.7017],
    [21.3213, 126.6052]
];

suitMap.setMaxBounds(bounds);
// suitMap.on('drag', function () {
//     suitMap.panInsideBounds(bounds, { animate: true });
// });
// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(suitMap);
