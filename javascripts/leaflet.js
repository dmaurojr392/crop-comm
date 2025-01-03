const map = L.map('map').setView([15.5, 120.75], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

const layerMap = {}; 
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarContent = document.getElementById('sidebar-content');
fetch('./data/region-geo.json')
    .then(result => {
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        return result.json();
    })
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                if (feature.geometry.type === "Polygon") {
                    if (feature.id == 301400000) {
                        return { color: "green", fillColor: "green", fillOpacity: 0.9 }; // Bulacan
                    }
                    if (feature.id == 307700000) {
                        return { color: "red", fillColor: "red", fillOpacity: 0.9 }; // Aurora
                    }
                    if (feature.id == 304900000) {
                        return { color: "yellow", fillColor: "yellow", fillOpacity: 0.9 }; // Nueva Ecija
                    }
                    if (feature.id == 305400000) {
                        return { color: "blue", fillColor: "blue", fillOpacity: 0.9 }; // Pampanga
                    }
                    if (feature.id == 306900000) {
                        return { color: "orange", fillColor: "orange", fillOpacity: 0.9 }; // Tarlac
                    }
                    if (feature.id == 300800000) {
                        return { color: "violet", fillColor: "violet", fillOpacity: 0.9 }; // Bataan
                    }
                }
                if (feature.geometry.type === "MultiPolygon") {
                    if (feature.properties.adm2_psgc == 307100000) {
                        return { color: "pink", fillColor: "pink", fillOpacity: 0.9 }; // Zambales
                    }
                }
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    sidebarTitle.textContent = feature.properties.adm2_en || "Not set";
                    sidebarContent.innerHTML = `
                        <strong>Top 1 Crop Commodity:</strong> ${feature.properties.top1_crop || "No data found"}<br>
                        <strong>Production:</strong> ${feature.properties.top1_production || "No data found"}
                    `;
                    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));
                    offcanvas.show();
                });
                layerMap[feature.id] = layer;
                console.log(layerMap[feature.id] = layer);
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error fetching the JSON file:", error);
    });

const linkContainer = document.getElementById('nueva-ecija-onion'); 
const link = document.createElement('a');
link.href = ""; 
link.className = "menu-title";
link.setAttribute("data-bs-toggle", "offcanvas");
link.setAttribute("data-bs-target", "#offcanvasRight");
link.setAttribute("aria-controls", "offcanvasRight");
link.textContent = "ONION";

link.addEventListener('click', (e) => {
  e.preventDefault();
  const layer = layerMap[304900000]; 
  if (layer) {
    // Zoom to the feature's bounds on the map
    const bounds = layer.getBounds();
    map.fitBounds(bounds);

    const detailsContent = document.getElementById('sidebar-content');
    const sidebarTitle = document.getElementById('sidebar-title');
        sidebarTitle.innerHTML = `${layer.feature.properties.adm2_en || "Not set"}`;
        detailsContent.innerHTML = `
        <p>
            <strong>Top 1 Crop Commodity:</strong> ${layer.feature.properties.top1_crop || "No data found"}<br>
            <strong>Production:</strong> ${layer.feature.properties.top1_production || "No data found"}
        </p>
        `;
  } else {
    console.error("Layer not found for ID 304900000");
  }
});

linkContainer.appendChild(link);