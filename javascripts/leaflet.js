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
                layer.on({
                    click: function () {
                        sideContent(feature);
                        document.getElementById("crop-data-loading").classList.remove("d-none");
                        document.getElementById("crop-data-loading").classList.add("d-flex");
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
                            color: "#2c387e",  // Outline color on hover
                            weight: 2         // Thicker border
                        });
                    },
                    mouseout: function () {
                        layer.setStyle({
                            fillOpacity: 1,
                            color: "gray",  // Reset to default color
                            weight: 1       // Reset border thickness
                        });
                    }
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
    mapHint.classList.remove("d-none");
    mapHint.classList.add("d-lg-flex");
    mapDetails.classList.add("d-none");
    mapDetails.classList.remove("d-block");
}

async function fetchPredictions(feature) {
    try {
        const response = await fetch("https://fastapiserver-8aib.onrender.com/predict");
        const data = await response.json();

        
        
        // const resultsDiv = document.getElementById("results");
        // resultsDiv.innerHTML = "";
        const prediction = document.getElementById("prediction");
        prediction.innerHTML = `<h5>PREDICTED YIELD FOR ${feature.properties.Top1_Commodities.toUpperCase() || "No data found"} (2023-2029)</h5>`;
        if (data.error) {
            prediction.innerHTML = `<p style='color: red;'>Error: ${data.error}</p>`;
            
        } else {
            document.getElementById("crop-data-loading").classList.remove("d-block");
            document.getElementById("crop-data-loading").classList.add("d-none");
            document.getElementById("crop-data").classList.remove("d-none");
            document.getElementById("crop-data").classList.add("d-block");
            
            if(localStorage.getItem('rank-for-leading-crop-map') == "TopCrop"){
                result = (data.predictions[feature.properties.Top1_Commodities]);
            }
        
            if(localStorage.getItem('rank-for-leading-crop-map') == "SecondCrop"){
                result = (data.predictions[feature.properties.Top2_Commodities]);  
            }
            // for (const year in result) {
            //     const listItem = document.createElement("div");
            //     listItem.innerHTML = `
            //     <strong>${year}</strong>: ${result[year].toLocaleString()} MT`;
            //     prediction.appendChild(listItem);
            // }

            const years = Object.keys(result);
                const values = Object.values(result);

                // Create Chart.js Line Chart
                const ctx = document.getElementById('onionChart').getContext('2d');
                const onionChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: years, // X-axis (years)
                    datasets: [{
                    data: values, // Y-axis (predictions)
                    borderColor: '#B7B1F2', // Line color
                    backgroundColor: '#B7B1F2', // Fill under line
                    borderWidth: 1,
                    fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: false,
                            // text: `Predicted Yield of ${feature.properties.Top1_Commodities}`
                        },
                        legend: { 
                            display: false 
                            // 🔹 This hides the legend
                        }
                    },
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                }
                });
            // console.log(feature);
            

            // Loop through the object and create list items
            
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("results").innerHTML = "<p style='color: red;'>Failed to fetch predictions.</p>";
    }
}