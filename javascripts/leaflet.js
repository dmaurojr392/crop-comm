let mapHint = document.getElementById('map-hint');
let mapDetails = document.getElementById('map-details');


function updateLegend(filterType) {
    let legendDiv = document.getElementById("map-legend");
    if (!legendDiv) return;
    let legendHTML = "<h4>Crop Legend</h4>";
    let legendData = {
        "TopCrop": [
            { "name": "Banana", "color": "#FFFFA3" },
            { "name": "Coconut", "color": "#A3FFB2" },
            { "name": "Corn", "color": "#FADA7A" },
            { "name": "Mango", "color": "#A3FFFF" },
            { "name": "Onion", "color": "#B7B1F2" },
            { "name": "Sugarcane", "color": "#DEAA79" }
        ],
        "SecondCrop": [
            { "name": "Cashew", "color": "#C7B7A3" },
            { "name": "Cogon", "color": "#73A9AD" },
            { "name": "Corn", "color": "#FADA7A" },
            { "name": "Sitao", "color": "#A3D1A3" },
            { "name": "Sugarcane", "color": "#DEAA79" }
        ],
        "ThirdCrop": [
            { "name": "Banana", "color": "#FFFFA3" },
            { "name": "Camote", "color": "#FFA3FF" },
            { "name": "Cassava", "color": "#D1B38A" },
            { "name": "Coconut", "color": "#A3FFB2" },
            { "name": "Mango", "color": "#A3FFFF" },
            { "name": "Tomato", "color": "#FFA3A3" }
        ]
    };
    let selectedLegend = legendData[filterType] || [];
    selectedLegend.forEach(item => {
        legendHTML += `<i style="background:${item.color}; width: 15px; border: 1px solid gray; height: 15px; display: inline-block; margin-right: 5px;"></i> ${item.name}<br>`;
    });
    legendDiv.innerHTML = legendHTML;
}

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

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    let legend = L.control({ position: "topright" });

    legend.onAdd = function (map) {
        const div = L.DomUtil.create("div", "info legend");
        div.id = "map-legend";
        return div;
    };

    legend.addTo(map);

    fetch('data/cropData.json')
    .then(response => response.json())
    .then(provinceData => {
        const provinceLayer = L.geoJSON(provinceData, {
            style: function (feature) {
                return {
                    fillColor: "transparent",
                    color: "gray",
                    weight: 1,
                    interactive: true        
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    sideContent(feature);
                    mapHint.classList.remove("d-lg-flex");
                    mapHint.classList.add("d-none");

                    mapDetails.classList.remove("d-none");
                    mapDetails.classList.add("d-block");
                });
            }
        }).addTo(map);
    });

    fetch('data/pampanga-2023.geojson')
    .then(result => {
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        return result.json();
    })
    .then(data => {
        L.geoJSON(data, {
            renderer: L.canvas(),
            style: function (feature) {
                return {
                    fillColor: "#DEAA79", 
                    fillOpacity: 1,
                    color: "#DEAA79",
                    weight: 1 
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    sideContent(feature);
                    mapHint.classList.remove("d-lg-flex");
                    mapHint.classList.add("d-none");

                    mapDetails.classList.remove("d-none");
                    mapDetails.classList.add("d-block");
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
            renderer: L.canvas(),
            style: function (feature) {
                return {
                    fillColor: "#B7B1F2",
                    fillOpacity: 1,
                    color: "#B7B1F2",
                    weight: 1,
                    interactive: true
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    sideContent(feature);
                    mapHint.classList.remove("d-lg-flex");
                    mapHint.classList.add("d-none");

                    mapDetails.classList.remove("d-none");
                    mapDetails.classList.add("d-block");
                });
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error fetching the JSON file:", error);
    });

    initialize();
}

function sideContent(feature){
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarContent = document.getElementById('sidebar-content');
    if(localStorage.getItem('rank-for-leading-crop-map') == "TopCrop"){
        sidebarTitle.innerHTML = `<div class="animate__animated animate__fadeIn"> ${feature.properties.ADM2_EN} </div>` || "Not set";
        sidebarContent.innerHTML = `
            <div class="animate__animated animate__fadeIn"><strong>Leading Crop:</strong> ${feature.properties.Top1_Commodities || "No data found"}</div>
            <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)"] || "No data found"} Metric Tons</div>
            <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>
        `;
    }

    if(localStorage.getItem('rank-for-leading-crop-map') == "SecondCrop"){
        sidebarTitle.innerHTML = `<div class="animate__animated animate__fadeIn"> ${feature.properties.ADM2_EN} </div>` || "Not set";
        sidebarContent.innerHTML = `
            <div class="animate__animated animate__fadeIn"><strong>Leading Crop:</strong> ${feature.properties.Top2_Commodities || "No data found"}</div>
            <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)_1"] || "No data found"} Metric Tons</div>
            <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>
        `;
    }
}

function initialize() {
    selectedCrop = document.getElementById("rank-for-leading-crop-map").value;
    localStorage.setItem("rank-for-leading-crop-map", selectedCrop);
    updateLegend(selectedCrop);
    document.getElementById('map-hint').style.display = "block";
    document.getElementById('map-details').classList.add("d-none");
    document.getElementById('map-details').classList.remove("d-block");
}