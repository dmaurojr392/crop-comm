const map = L.map('map').setView([15.48, 120.75], 8);

const bounds = [
    [4.2158, 116.7017],
    [21.3213, 126.6052]
];

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: true });
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const layerMap = {}; 
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarContent = document.getElementById('sidebar-content');
fetch('./data/top one commodity - region 3.json')
.then(result => {
    if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
    }
    return result.json();
})
.then(data => {
    L.geoJSON(data, {
        style: function (feature) {
                if (feature.properties.ADM2_EN == "Aurora") {
                    return { color: "gray", fillColor: "#A3FFB2", fillOpacity: 1, weight: 1 };
                }
                if (feature.properties.ADM2_EN == "Bataan") {
                    return { color: "gray", fillColor: "#A3FFFF", fillOpacity: 1, weight: 1 }; 
                }
                if (feature.properties.ADM2_EN == "Bulacan") {
                    return { color: "gray", fillColor: "#FFFFA3", fillOpacity: 1, weight: 1 };
                }
                if (feature.properties.ADM2_EN == "Nueva Ecija") {
                    return { color: "gray", fillColor: "#CDAAFD", fillOpacity: 1, weight: 1 };
                }
                if (feature.properties.ADM2_EN == "Pampanga") {
                    return { color: "gray", fillColor: "#FFD1A3", fillOpacity: 1, weight: 1 };
                }
                if (feature.properties.ADM2_EN == "Tarlac") {
                    return { color: "gray", fillColor: "#FFD1A3", fillOpacity: 1, weight: 1 };
                }
                if (feature.properties.ADM2_EN == "Zambales") {
                    return { color: "gray", fillColor: "#A3FFFF", fillOpacity: 1, weight: 1 };
                }
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', () => {
                sidebarTitle.innerHTML = `<div class="animate__animated animate__fadeIn"> ${feature.properties.ADM2_EN} </div>` || "Not set";
                sidebarContent.innerHTML = `
                    <div class="animate__animated animate__fadeIn"><strong>Leading Crop:</strong> ${feature.properties.Top1_Commodities || "No data found"}</div>
                    <div class="animate__animated animate__fadeIn"><strong>Production:</strong> ${feature.properties["Yield(MT)"] || "No data found"} Metric Tons</div>
                    <div class="animate__animated animate__fadeIn"><strong>Harvest Year: </strong>2023</div>
                `;
                document.getElementById('map-hint').innerHTML = "";
                var provinceContainer = document.getElementById("province-data");
                var selectedProvince = feature.properties.ADM2_EN || "";

                if(selectedProvince == "Nueva Ecija"){
                    provinceContainer.innerHTML = `
                    <div class="animate__animated animate__fadeIn">
                    <label for="language-select">Choose Language:</label>
                    <select id="language-select" class="form-control">
                        <option value="english">English</option>
                        <option value="tagalog">Tagalog</option>
                    </select>

                    <div id="english-content" class="animate__animated animate__fadeIn pb-4">
                        <h5 class="mt-3" style="margin-bottom: 4px;">Onion Production in Previous Years</h5>
                        <canvas id="onionProductionChart" width="400" height="200" class="mb-1 rounded" style="border: 1px solid gray;"></canvas>
                        <h5 class="mt-3" style="margin-bottom: 4px;">Prediction of Onion Production for the Next 5 Years</h5>
                        <img src="./assets/graphs/sample-graph-onion-ne.png" style="width: 100%; margin: auto; border: 1px solid gray;" class="mb-1 rounded"></img>
                        <ul>
                            <li><b>2023</b>: 124,066 metric tons</li>
                            <li><b>2024</b>: 119,990 metric tons</li>
                            <li><b>2025</b>: 115,914 metric tons</li>
                            <li><b>2026</b>: 111,838 metric tons</li>
                            <li><b>2027</b>: 107,762 metric tons</li>
                        </ul>
                        <h5>Analysis</h5>
                        <p>1. <b>Declining Trend</b>: The predictions show a gradual decrease in onion production over the next five years, potentially due to factors like climate variability, soil nutrient depletion, pest problems, or changes in farming practices.</p>
                        <p>2. <b>Impact Assessment</b>: Declining production could lead to shortages in supply, lower farmer income, and reduced importance of Nueva Ecija as a major onion supplier in the Philippines.</p>
                        <h5>Recommendations for Cropping</h5>
                        <p>1. <b>Crop Rotation</b>: Introduce crop rotation with legumes or nitrogen-fixing plants to improve soil fertility.</p>
                        <p>2. <b>Integrated Pest Management</b>: Implement pest monitoring and control strategies to minimize yield losses.</p>
                        <p>3. <b>Irrigation Management</b>: Use modern methods like drip irrigation to optimize water supply, especially during dry seasons.</p>
                        <p>4. <b>High-Yielding Varieties</b>: Use onion varieties resistant to local pests, diseases, and weather fluctuations.</p>
                        <p>5. <b>Soil Testing and Fertilization</b>: Regularly test soil and apply necessary organic or chemical fertilizers to address nutrient deficiencies.</p>
                        <p>6. <b>Climate-Resilient Practices</b>: Adjust planting schedules and use protective structures to cope with unpredictable weather conditions.</p>
                        <p>By implementing these practices, onion production can stabilize or improve, ensuring long-term sustainability for farmers and the region.</p>
                    </div>

                    <div id="tagalog-content" class="animate__animated animate__fadeIn pb-4">
                        <h5 class="mt-3" style="margin-bottom: 4px;">Produksyon ng Sibuyas sa Mga Nakaraang Taon</h5>
                        <canvas id="onionProductionChartForTagalog" width="400" height="200" class="mb-1 rounded" style="border: 1px solid gray;"></canvas>
                        <h5 class="mt-3" style="margin-bottom: 4px;">Prediksyon ng Produksyon ng Sibuyas sa Susunod na 5 Taon</h5>
                        <img src="./assets/graphs/sample-graph-onion-ne.png" style="width: 100%; margin: auto; border: 1px solid gray;" class="mb-1 rounded"></img>
                        <ul>
                            <li><b>2023</b>: 124,066 metric tons</li>
                            <li><b>2024</b>: 119,990 metric tons</li>
                            <li><b>2025</b>: 115,914 metric tons</li>
                            <li><b>2026</b>: 111,838 metric tons</li>
                            <li><b>2027</b>: 107,762 metric tons</li>
                        </ul>
                        <h5>Pagsusuri</h5>
                        <p>1. <b>Pababang Trend</b>: Ang prediksyon ay nagpapakita ng unti-unting pagbaba ng produksyon ng sibuyas sa susunod na limang taon. Maaaring dulot ito ng mga salik tulad ng pagbabago sa klima, pagkaubos ng sustansya sa lupa, peste, o pagbabago sa paraan ng pagtatanim.</p>
                        <p>2. <b>Epekto</b>: Ang pagbabang ito ay maaaring magdulot ng kakulangan sa supply ng sibuyas, pagbaba ng kita ng mga magsasaka, at mabawasan ang kontribusyon ng Nueva Ecija bilang pangunahing tagapagtustos ng sibuyas sa Pilipinas.</p>
                        <h5>Rekomendasyon para sa Pagtatanim</h5>
                        <p>1. <b>Pagpapalit-palit ng Pananim</b>: Magtanim ng mga legumbre o iba pang halamang nagpapataas ng sustansya ng lupa para mapanatiling masustansya ang taniman.</p>
                        <p>2. <b>Pinagsamang Pamamahala sa Peste</b>: Magpatupad ng wastong paraan sa pagkontrol ng peste upang maiwasan ang malaking pagkawala ng ani.</p>
                        <p>3. <b>Maayos na Pamamahala sa Patubig</b>: Gumamit ng makabagong teknolohiya tulad ng drip irrigation upang siguraduhing sapat ang tubig kahit tag-init.</p>
                        <p>4. <b>Paggamit ng Mataas na Uri ng Binhi</b>: Gumamit ng binhi ng sibuyas na matibay laban sa peste, sakit, at pagbabago ng panahon.</p>
                        <p>5. <b>Pagsusuri ng Lupa at Wastong Pataba</b>: Regular na suriin ang lupa upang malaman ang kakulangan sa sustansya at gumamit ng angkop na pataba, organiko man o kemikal.</p>
                        <p>6. <b>Pamamaraan Laban sa Klima</b>: Magpatupad ng mga hakbang tulad ng tamang iskedyul ng pagtatanim at paggamit ng proteksiyon sa taniman laban sa pabago-bagong panahon.</p>
                        <p>Sa pamamagitan ng mga hakbang na ito, maaaring mapanatili o mapataas ang produksyon ng sibuyas at matiyak ang pangmatagalang kita ng mga magsasaka at ang katatagan ng produksyon sa rehiyon.</p>
                    </div>
                    </div>
                    `;

                    const languageSelect = document.getElementById('language-select');
                    const englishContent = document.getElementById('english-content');
                    const tagalogContent = document.getElementById('tagalog-content');

                    languageSelect.value = 'english';
                    englishContent.style.display = 'block';
                    tagalogContent.style.display = 'none';

                    languageSelect.addEventListener('change', () => {
                        const selectedLanguage = languageSelect.value;
                        if (selectedLanguage === 'english') {
                            englishContent.style.display = 'block';
                            tagalogContent.style.display = 'none';
                        } else if (selectedLanguage === 'tagalog') {
                            tagalogContent.style.display = 'block';
                            englishContent.style.display = 'none';
                        }
                    });
                    const ctx = document.getElementById('onionProductionChart').getContext('2d');
                    const onionProductionChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['2018', '2019', '2020', '2021', '2022'],
                            datasets: [{
                                label: 'Onion Production (metric tons)',
                                data: [143266, 143221, 136273, 128432, 130280],
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    const ctxForTagalog = document.getElementById('onionProductionChartForTagalog').getContext('2d');
                    const onionProductionChartForTagalog = new Chart(ctxForTagalog, {
                        type: 'bar',
                        data: {
                            labels: ['2018', '2019', '2020', '2021', '2022'],
                            datasets: [{
                                label: 'Onion Production (metric tons)',
                                data: [143266, 143221, 136273, 128432, 130280],
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                    if(document.getElementById('sidebar-title').innerHTML === ""){
                        document.getElementById('map-hint').innerHTML = `<div class="d-flex justify-content-center w-100">
                            Click the color-coded tile on the map to view crop details.
                        </div>`;
                    }else{
                        document.getElementById('map-hint').style.display = "none";
                    }
                }else{
                    provinceContainer.innerHTML = "";
                }
            });
        }
    }).addTo(map);
})
.catch(error => {
    console.error("Error fetching the JSON file:", error);
});