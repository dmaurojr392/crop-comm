let mapHint = document.getElementById('map-hint');
let mapDetails = document.getElementById('map-details');

let commodityColors = {
    "Banana": "#FFFFA3",
    "Sugarcane": "#DEAA79",
    "Onion": "#B7B1F2",
    "Coconut": "#A3FFB2",
    "Corn": "#FADA7A",
    "Mango": "#A3FFFF",
    "Cashew": "#C7B7A3",
    "Cogon": "#73A9AD",
    "Sitao": "#A3D1A3",
    "Camote": "#FFA3FF",
    "Cassava": "#D1B38A",
    "Tomato": "#FFA3A3"
};

// Function to get color based on commodity
function getCommodityColor(commodity) {
    return commodityColors[commodity] || "#000"; // Default to black if not found
}

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
                    color: "transparent",
                    weight: 1,
                    interactive: true        
                };
            },
            onEachFeature: function (feature, layer) {
                console.log(feature.properties.ADM2_EN);
                layer.on({
                    click: function () {
                        sideContent(feature);
                        document.getElementById("crop-data-loading").classList.remove("d-none");
                        document.getElementById("crop-data-loading").classList.add("d-flex");
                        document.getElementById("crop-data").classList.add("d-none");
                        
                        fetchPredictions(feature);
                        mapHint.classList.remove("d-lg-flex");
                        mapHint.classList.add("d-none");
            
                        mapDetails.classList.remove("d-none");
                        mapDetails.classList.add("d-block");
            
                        // Zoom to the bounds of the selected layer
                        if (layer.getBounds) {
                            map.fitBounds(layer.getBounds());
                        } else if (layer.getLatLng) {
                            map.setView(layer.getLatLng(), map.getZoom() + 1);
                        }
                    },
                    mouseover: function () {
                        layer.setStyle({
                            fillOpacity: 1,
                            color: "gray",  // Outline color on hover
                            weight: 1         // Thicker border
                        });
                    },
                    mouseout: function () {
                        layer.setStyle({
                            fillOpacity: 1,
                            color: "transparent",  // Reset to default color
                            weight: 1       // Reset border thickness
                        });
                    }
                });
            }
            
        }).addTo(map);
    });

    // Define configuration for each dataset
    const datasets = [
        {
            url: 'data/aurora-coconut-2023.json',
            colorConfig: {
                TopCrop: "Coconut",
                SecondCrop: "Corn",
                ThirdCrop: "Banana"
            },
            fixedColor: null
        },
        {
            url: 'data/bataan-corn-2023.json',
            colorConfig: {
                TopCrop: "Corn",
                SecondCrop: "Cashew",
                ThirdCrop: "Coconut"
            },
            fixedColor: null
        },
        {
            url: 'data/pampanga-sugarcane-2023.geojson',
            colorConfig: null,
            fixedColor: "#DEAA79"
        },
        {
            url: 'data/ne-onion-2023.json',
            colorConfig: null,
            fixedColor: "#B7B1F2"
        },
        {
            url: 'data/tarlac-corn-2023.json',
            colorConfig: {
                TopCrop: "Corn",
                SecondCrop: "Sugarcane",
                ThirdCrop: "Camote"
            },
            fixedColor: null
        },
        {
            url: 'data/zambales-mango-2023.json',
            colorConfig: {
                TopCrop: "Mango",
                SecondCrop: "Cogon",
                ThirdCrop: "Banana"
            },
            fixedColor: null
        }
    ];

    // Show loading modal
    function showLoadingModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade show d-block';
        modal.id = 'loadingModal';
        modal.setAttribute('data-bs-backdrop', 'static');
        modal.setAttribute('data-bs-keyboard', 'false');
        modal.tabIndex = -1;
        modal.style.backgroundColor = 'rgba(0,0,0,0.2)';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" style="background: transparent; box-shadow: none;">
                <div class="modal-content" style="background: transparent; border: none;">
                    <div class="modal-body text-center" style="background: transparent; border: none;">
                        <div class="w-100 d-flex justify-content-center" style="background: transparent;">
                            <div class="loader"></div>
                        </div>
                        <p class="mt-3 text-white" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Loading map data...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
    }

    // Hide loading modal
    function hideLoadingModal() {
        const modal = document.getElementById('loadingModal');
        const backdrop = document.querySelector('.modal-backdrop');
        
        if (modal) {
            modal.classList.remove('show');
            modal.classList.add('fade');
            setTimeout(() => modal.remove(), 150);
        }
        
        if (backdrop) {
            backdrop.classList.remove('show');
            setTimeout(() => backdrop.remove(), 150);
        }
    }

    // Common function to handle fetch and GeoJSON creation
    function loadGeoJSON(config) {
        return fetch(config.url)
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
                        let layerColor;
                        if (config.fixedColor) {
                            layerColor = config.fixedColor;
                        } else {
                            const rank = localStorage.getItem('rank-for-leading-crop-map');
                            const commodity = config.colorConfig[rank];
                            layerColor = getCommodityColor(commodity);
                        }

                        return {
                            fillColor: layerColor,
                            fillOpacity: 1,
                            color: layerColor,
                            weight: 1,
                            interactive: true
                        };
                    },
                    onEachFeature: function (feature, layer) {
                        layer.on('click', () => {
                            sideContent(feature);
                        });
                    }
                }).addTo(map);
                return true; // Return success
            })
            .catch(error => {
                console.error(`Error fetching ${config.url}:`, error);
                return false; // Return failure
            });
    }

    // Load all datasets with loading indicator
    function loadAllDatasets() {
        showLoadingModal();
        
        const promises = datasets.map(loadGeoJSON);
        
        Promise.all(promises)
            .then(results => {
                const successCount = results.filter(Boolean).length;
                console.log(`Successfully loaded ${successCount}/${datasets.length} datasets`);
            })
            .catch(error => {
                console.error("Error loading datasets:", error);
            })
            .finally(() => {
                hideLoadingModal();
            });
    }

    // Start loading all datasets
    loadAllDatasets();

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
            <div class="animate__animated animate__fadeIn"><strong>Second Leading Crop:</strong> ${feature.properties.Top2_Commodities || "No data found"}</div>
            <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)_1"] || "No data found"} Metric Tons</div>
            <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>
        `;
    }

    if(localStorage.getItem('rank-for-leading-crop-map') == "ThirdCrop"){
        sidebarTitle.innerHTML = `<div class="animate__animated animate__fadeIn"> ${feature.properties.ADM2_EN} </div>` || "Not set";
        sidebarContent.innerHTML = `
            <div class="animate__animated animate__fadeIn"><strong>Third Leading Crop:</strong> ${feature.properties.Top3_Commodities || "No data found"}</div>
            <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)_2"] || "No data found"} Metric Tons</div>
            <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>
        `;
    }
}

function initialize() {
    selectedCrop = document.getElementById("rank-for-leading-crop-map").value;
    localStorage.setItem("rank-for-leading-crop-map", selectedCrop);
    updateLegend(selectedCrop);
    mapHint.classList.remove("d-none");
    mapHint.classList.add("d-lg-flex");
    mapDetails.classList.add("d-none");
    mapDetails.classList.remove("d-block");
}

let onionChart = null; // Store chart instance globally

async function fetchPredictions(feature) {
    try {
        let SelectedTile = feature.properties.ADM2_EN;
        let response = null;
        if (SelectedTile == "Aurora") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/aurora");
        }
        if (SelectedTile == "Bataan") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/bataan");
            console.log("Bataan Clicked");
        }
        if (SelectedTile == "Bulacan") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/bulacan");
        }
        if (SelectedTile == "Nueva Ecija") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/nueva-ecija");
        }

        if (SelectedTile == "Pampanga") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/pampanga");
        }

        if (SelectedTile == "Tarlac") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/tarlac");
        }

        if (SelectedTile == "Zambales") {
            response = await fetch("https://fastapiserver-8aib.onrender.com/predict/zambales");
        }
        // const response = await fetch("https://fastapiserver-8aib.onrender.com/predict");
        const data = await response.json();
        
        console.log("Fetched Data:", data); // Debugging

        const prediction = document.getElementById("prediction");
        

        if (data.error) {
            prediction.innerHTML = `<p style='color: red;'>Error: ${data.error}</p>`;
            return;
        }

        document.getElementById("crop-data-loading").classList.add("d-none");
        document.getElementById("crop-data").classList.remove("d-none");
        document.getElementById("crop-data").classList.add("d-block");

        let result = null;
        if (localStorage.getItem('rank-for-leading-crop-map') == "TopCrop") {
            result = data.predictions[feature.properties.Top1_Commodities];
            prediction.innerHTML = `<h5>PREDICTED YIELD FOR ${feature.properties.Top1_Commodities.toUpperCase() || "No data found"} (2023-2029)</h5>`;
        } else if (localStorage.getItem('rank-for-leading-crop-map') == "SecondCrop") {
            result = data.predictions[feature.properties.Top2_Commodities];
            prediction.innerHTML = `<h5>PREDICTED YIELD FOR ${feature.properties.Top2_Commodities.toUpperCase() || "No data found"} (2023-2029)</h5>`;
        } else if (localStorage.getItem('rank-for-leading-crop-map') == "ThirdCrop") {
            result = data.predictions[feature.properties.Top3_Commodities];
            prediction.innerHTML = `<h5>PREDICTED YIELD FOR ${feature.properties.Top3_Commodities.toUpperCase() || "No data found"} (2023-2029)</h5>`;
        }

        console.log("Result Data:", result); // Debugging

        if (!result) {
            prediction.innerHTML += "<p>No data available for this crop.</p>";
            return;
        }

        const years = Object.keys(result);
        const values = Object.values(result);
        
        console.log("Years:", years, "Values:", values); // Debugging

        const canvas = document.getElementById('onionChart');
        if (!canvas) {
            console.error("Chart canvas not found!");
            return;
        }

        const ctx = canvas.getContext('2d');
        

        // 🔥 Destroy previous chart instance before creating a new one
        if (onionChart) {
            onionChart.destroy();
        }
        
        if(localStorage.getItem('rank-for-leading-crop-map') == "TopCrop"){
            chartColor = getCommodityColor(feature.properties.Top1_Commodities);
        }else if(localStorage.getItem('rank-for-leading-crop-map') == "SecondCrop"){
            chartColor = getCommodityColor(feature.properties.Top2_Commodities);
        } else if(localStorage.getItem('rank-for-leading-crop-map') == "ThirdCrop"){
            chartColor = getCommodityColor(feature.properties.Top3_Commodities);    
        }
        // console.log(chartColor1, chartColor2, chartColor3); // Debugging output
        
        // Create a new Chart.js instance
        onionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    data: values,
                    borderColor: chartColor,
                    backgroundColor: chartColor,
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: false,
                    },
                    legend: { 
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("results").innerHTML = "<p style='color: red;'>Failed to fetch predictions.</p>";
    }
}
