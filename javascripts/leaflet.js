function getMap() {
    const map = L.map('map').setView([15.48, 120.75], 8);

    const bounds = [
        [4.2158, 116.7017],
        [21.3213, 126.6052]
    ];

    map.setMaxBounds(bounds);
    map.on('drag', function () {
        map.panInsideBounds(bounds, { animate: true });
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tile Layer Source: Sentinel II identified by Holistic Smart Agriculture System'
    }).addTo(map);

// Load province-level boundaries
fetch('data/cropData.json')  // ✅ Load province boundaries
    .then(response => response.json())
    .then(provinceData => {
        const provinceLayer = L.geoJSON(provinceData, {
            style: function (feature) {
                return {
                    fillColor: "transparent",  // ✅ Keep it invisible
                    color: "black",            // ✅ Thin boundary lines
                    weight: 0,
                    interactive: true          // ✅ Enable clicking
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    test(feature);
                    document.getElementById('map-hint').style.display = "none";
                    document.getElementById('map-details').classList.remove("d-none");
                    document.getElementById('map-details').classList.add("d-block");
                });
            }
        }).addTo(map);
    });

    fetch('data/corn-pampanga-2023.geojson')
    .then(result => {
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        return result.json();
    })
    .then(data => {
        L.geoJSON(data, {
            renderer: L.canvas(),  // ✅ Use Canvas rendering (prevents re-render on zoom)
            style: function (feature) {
                return {
                    fillColor: "#FFF2A3",      // ✅ Fill color (red)
                    fillOpacity: 1,      // ✅ Adjust transparency (0 = fully transparent, 1 = fully opaque)
                    color: "#FFF2A3",  // ✅ Removes the border (set stroke color to "transparent")
                    weight: 1              // ✅ Ensures no border (set stroke width to 0)
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    test(feature);
                    document.getElementById('map-hint').style.display = "none";
                    document.getElementById('map-details').classList.remove("d-none");
                    document.getElementById('map-details').classList.add("d-block");
                });
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error fetching the JSON file:", error);
    });

    fetch('data/onion-2023.json')
    .then(result => {
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        return result.json();
    })
    .then(data => {
        L.geoJSON(data, {
            renderer: L.canvas(),  // ✅ Use Canvas rendering (prevents re-render on zoom)
            style: function (feature) {
                return {
                    fillColor: "#CDAAFD",      // ✅ Fill color (red)
                    fillOpacity: 1,      // ✅ Adjust transparency (0 = fully transparent, 1 = fully opaque)
                    color: "#CDAAFD",  // ✅ Removes the border (set stroke color to "transparent")
                    weight: 1,
                    interactive: true              // ✅ Ensures no border (set stroke width to 0)
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    test(feature);
                    document.getElementById('map-hint').style.display = "none";
                    document.getElementById('map-details').classList.remove("d-none");
                    document.getElementById('map-details').classList.add("d-block");
                });
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error fetching the JSON file:", error);
    });
}

function test(feature){
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarContent = document.getElementById('sidebar-content');
    if(localStorage.getItem('rank-for-leading-crop-map') == "TopCrop"){
        sidebarTitle.innerHTML = `<div class="animate__animated animate__fadeIn"> ${feature.properties.ADM2_EN} </div>` || "Not set";
        sidebarContent.innerHTML = `
            <div class="animate__animated animate__fadeIn"><strong>Leading Crop:</strong> ${feature.properties.Top1_Commodities || "No data found"}</div>
            <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)"] || "No data found"} Metric Tons</div>
            <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>

            <div></div>
        `;
    }

    if(localStorage.getItem('rank-for-leading-crop-map') == "SecondCrop"){
        sidebarTitle.innerHTML = `<div class="animate__animated animate__fadeIn"> ${feature.properties.ADM2_EN} </div>` || "Not set";
        sidebarContent.innerHTML = `
            <div class="animate__animated animate__fadeIn"><strong>Leading Crop:</strong> ${feature.properties.Top2_Commodities || "No data found"}</div>
            <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)_1"] || "No data found"} Metric Tons</div>
            <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>

            <div></div>
        `;
    }
}

// ✅ Function to highlight all red areas within a province
function highlightProvince(provinceName) {
    if (selectedProvince) {
        selectedProvince.setStyle({ fillOpacity: 0.75, fillColor: "red" });
    }

    // Find the province layer
    map.eachLayer(function (layer) {
        if (layer.feature && layer.feature.properties.name === provinceName) {
            selectedProvince = layer;
            selectedProvince.setStyle({
                fillOpacity: 0.8,  // Highlight province
                fillColor: "blue"
            });
        }
    });

    alert("You clicked on: " + provinceName); // Example action
}