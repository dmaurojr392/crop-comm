function getMap(){
    const map = L.map('map').setView([15.48, 120.75], 8);

    const bounds = [
        [4.2158, 116.7017],
        [21.3213, 126.6052]
    ];

    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: true });
    });

    // L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.{ext}', {
    // 	minZoom: 0,
    // 	maxZoom: 18,
    // 	// attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // 	ext: 'png'
    // }).addTo(map);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(map);

    const layerMap = {}; 
    
    fetch('data/cropData.json')
    .then(result => {
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        return result.json();
    })
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                const commodityColors = {
                    "Sugarcane": "#FFD1A3", // Pastel Orange
                    "Onion": "#CDAAFD", // Pastel Purple
                    "Coconut": "#A3FFB2", // Pastel Green
                    "Banana": "#FFFFA3", // Pastel Yellow
                    "Mango": "#A3FFFF", // Pastel Teal
                    "Camote": "#FFA3FF", // Pastel Magenta
                    "Tomato": "#FF3A3A", // Pastel Red
                    "Sitao": "#BC3A3A", // Pastel Olive Drab
                    "Eggplant": "#CDB2B2", // Pastel Slate Blue
                    "Ampalaya": "#A3D1A3", // Pastel Dark Green
                    "Squash": "#FF2A8F", // Pastel Pink
                    "Cassava": "#D1B3BA", // Pastel Brown
                    "Cogon": "#F5DEB3", // Pastel Wheat
                    "Okra": "#A3B2B2", // Pastel Slate Gray
                    "Upo": "#E3E3D1", // Pastel Beige
                    "Calamansi": "#FFE2A3", // Pastel Golden Yellow
                    "Gabi": "#FFC3D3", // Pastel Peach
                    "Watermelon": "#D19A9A", // Pastel Dark Red
                    "Mungbean": "#C1DFFF", // Pastel Blue
                    "Papaya": "#F75146", // Pastel Coral
                    "Pechay": "#A3FFB2", // Pastel Green (same as Coconut)
                    "Singkamas": "#FFB0DD", // Pastel Salmon
                    "Pineapple": "#FFDD99", // Pastel Yellow-Orange
                    "Melon": "#FFA3A3", // Pastel Soft Red
                    "Cashew": "#D9D9D9" // Light Gray
                };

                setTimeout(() => {
                    console.log(feature.properties.ADM2_EN);
                }, 1000);
            
                return {
                    color: "gray",
                    fillColor: commodityColors[feature.properties.Top1_Commodities] || "#CCCCCC", // Default gray if not found
                    fillOpacity: 1,
                    weight: 0.5
                };
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', () => {
                    test(feature);
                    document.getElementById('map-hint').style.display = "none";
                    // document.getElementById('map-details').style.display = "block";
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