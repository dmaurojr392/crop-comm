const imessageContainer = document.getElementById("imessage");
const firstAnswer = document.getElementById("first-answer");
const secondAnswer = document.getElementById("second-answer");
const thirdAnswer = document.getElementById("third-answer");
const firstPromptLoader = document.getElementById("first-prompt-loader");
const topCropButton = document.getElementById("ai-top-crop-btn");
const secondCropButton = document.getElementById("ai-second-crop-btn");
const thirdCropButton = document.getElementById("ai-third-crop-btn");

firstPromptLoader.style.display = "none";
firstAnswer.style.display = "none";
secondAnswer.style.display = "none";
thirdAnswer.style.display = "none";

setTimeout(() => {
    firstPromptLoader.style.display = "block";
}, 3000); // Simulate a 2-second delay before showing the first prompt

function getFirstPrompt(){
    firstPromptLoader.style.display = "none";
    document.getElementById("second-prompt").style.display = "block";
    document.getElementById("first-prompt").classList.add("no-tail");
}
setTimeout(getFirstPrompt, 6000); // Simulate a 2-second delay before showing the second prompt

document.getElementById("second-prompt").style.display = "none";
setTimeout(() => {
    firstAnswer.style.display = "flex";
}, 7000);

function auroraBtnOnClick(){
    firstAnswer.style.display = "none";

    // Create the new message element
    const newMessage = document.createElement("div");
    newMessage.className = "row";  // optional spacing

    newMessage.innerHTML = `
    <div class="col-12">
        <div class="d-flex justify-content-end">
            <p class="from-me animate__animated animate__zoomIn animate__faster">Aurora. </p>    
        </div>
    </div>

    <div class="row" id="second-prompt-loader">
        <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
            <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
        </div>
        <div class="col">
            <div class="from-them prompt-loader ms-2 animate__animated animate__fadeIn animate__faster">
                <div class="iMessage-loader"></div>
            </div>      
        </div>
    </div>
    `;
    // Append to container
    imessageContainer.appendChild(newMessage);

    setTimeout(() => {
        document.getElementById("second-prompt-loader").style.display = "none";
        getThirdPrompt();
        setTimeout(() => {
            
            secondAnswer.style.display = "block";
            topCropButton.innerText = "Coconut";
            secondCropButton.innerText = "Corn";
            thirdCropButton.innerText = "Banana";
        }, 500);
    }, 3000);
}

function getThirdPrompt(){
    // Create the new message element
    const newMessage = document.createElement("div");
    newMessage.className = "row";  // optional spacing

    newMessage.innerHTML = `
    <div class="container-fluid">
        <div class="row">
            <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
            <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                <!-- <img src="https://img.freepik.com/free-vector/wicked-old-witch-face-white-background_1308-74880.jpg?semt=ais_hybrid&w=740" width="65px" height="65px" alt=""> -->
            </div>
            <div class="col">
            <div class="d-flex flex-column align-items-start">
                <div class="">
                <p id="third-prompt" class="from-them ms-2 animate__animated animate__zoomIn animate__faster">Aurora is a great choice. I listed the top 3 commodities below. Please pick one on the list.</p>
                </div>        
            </div>
            </div>
        </div>
    </div>
    `;

    // Append to container
    imessageContainer.appendChild(newMessage);
}

function topCropButtonOnClick(){
    secondAnswer.style.display = "none";

    // Create the new message element
    const newMessage = document.createElement("div");
    newMessage.className = "row";  // optional spacing

    newMessage.innerHTML = `
    <div class="col-12">
        <div class="d-flex flex-column justify-content-end">
            <p class="from-me animate__animated animate__zoomIn animate__faster">I'd like to pick the leading crop, ${topCropButton.innerText}. </p>
        </div>

        <div class="row" id="third-prompt-loader">
            <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
            </div>
            <div class="col">
                <div class="from-them prompt-loader ms-2 animate__animated animate__fadeIn animate__faster">
                    <div class="iMessage-loader"></div>
                </div>      
            </div>
        </div>
    </div>
    `;
    // <div class="col-1 d-flex justify-content-center align-items-end">
    //     <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
    // </div>
    setTimeout(() => {
        document.getElementById("third-prompt-loader").style.display = "none";
        getFourthPrompt();
        setTimeout(() => {
        }, 500);
    }, 3000);

    // Append to container
    imessageContainer.appendChild(newMessage);
}

function bestPracticesCropButtonOnClick(){
    secondAnswer.style.display = "none";

    // Create the new message element
    const newMessage = document.createElement("div");
    newMessage.className = "row";  // optional spacing

    newMessage.innerHTML = `
    <div class="col-12">
        <div class="d-flex flex-column justify-content-end">
            <p class="from-me animate__animated animate__zoomIn animate__faster">I'd like to pick the leading crop, ${topCropButton.innerText}. </p>
        </div>

        <div class="row" id="fourth-prompt-loader">
            <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
            </div>
            <div class="col">
                <div class="from-them prompt-loader ms-2 animate__animated animate__fadeIn animate__faster">
                    <div class="iMessage-loader"></div>
                </div>      
            </div>
        </div>
    </div>
    `;
    // <div class="col-1 d-flex justify-content-center align-items-end">
    //     <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
    // </div>
    setTimeout(() => {
        document.getElementById("fourth-prompt-loader").style.display = "none";
        getFifthPrompt();
        setTimeout(() => {
        }, 500);
    }, 3000);
}

function getFourthPrompt(){
    // Create the new message element
    const newMessage = document.createElement("div");
    newMessage.className = "row";  // optional spacing

    newMessage.innerHTML = `
    <div class="container-fluid">
        <div class="row">
            <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
            <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                <!-- <img src="https://img.freepik.com/free-vector/wicked-old-witch-face-white-background_1308-74880.jpg?semt=ais_hybrid&w=740" width="65px" height="65px" alt=""> -->
            </div>
            <div class="col">
                <div class="d-flex flex-column align-items-start">
                    <div class="">
                        <p id="fourth-prompt" class="from-them ms-2 text-justify animate__animated animate__zoomIn animate__faster">
                            <strong>Coconut Farming Best Practices in Aurora</strong><br><br>

                            <strong>Crop-Specific Planting Guidelines:</strong><br>
                            • Variety Selection: Tacunan Dwarf, MRD × WAT hybrids (PCA-recommended)<br>
                            • Site: Below 600m elevation; well-drained sandy/clay loam; pH 5.0–7.0<br>
                            • Spacing: 8m × 8m (156 trees/ha); triangular or square layout<br>
                            • Pit Size: 1m × 1m × 1m with topsoil + compost<br>
                            • Planting Season: Rainy months (May–October)<br><br>

                            <strong>💧 Irrigation Management:</strong><br>
                            • Use mulch (e.g., husks, leaves) to retain soil moisture<br>
                            • Young trees (0–3 years): 40–60L/tree every 7–10 days (dry season)<br>
                            • Mature trees: 80–100L/tree every 15–20 days<br>
                            • Preferred Method: Drip irrigation; use basin/furrow if unavailable<br><br>

                            <strong>🛡️ Disease & Pest Management:</strong><br>
                            <em>Common Diseases:</em><br>
                            • Bud Rot – Symptoms: Yellowing center leaves, bud decay | Control: Improve drainage, copper fungicide, remove infected trees<br>
                            • Leaf Spot – Symptoms: Brown spots on leaves | Control: Sanitation, fungicide<br>
                            • Stem Bleeding – Symptoms: Gum oozing, trunk rot | Control: Scrape + Bordeaux paste<br><br>

                            <em>Common Pests:</em><br>
                            • Rhinoceros Beetle – Bores into crown | Control: Pheromone traps, neem oil, Metarhizium fungus<br>
                            • Coconut Scale Insect – Yellowing leaves | Control: Pruning, biological agents (parasitoids)<br>
                            • Red Palm Weevil – Larvae burrow trunk | Control: Early removal, traps<br><br>

                            <strong>Integrated Pest Management (IPM):</strong> Monitor pest population regularly, support beneficial insects, limit pesticide use<br><br>

                            <strong>📊 Additional Best Practices:</strong><br>
                            • Fertilization: 1–2kg 14-14-14/tree twice/year; supplement with compost<br>
                            • Weeding: Manual or shallow tilling; avoid deep root damage<br>
                            • Harvesting: Every 45–60 days; 11–12 months (copra), 6–7 months (fresh)<br>
                            • Climate Resilience: Use windbreaks; intercrop with banana, cacao, pineapple<br><br>

                            <strong>📚 Government Support:</strong><br>
                            • Philippine Coconut Authority (PCA) – Aurora Office offers training and seedlings<br>
                            • Register with NCFRS to access government support and aid<br><br>

                            <em>&copy; 2025 Coconut Farming Advisory | Aurora, Philippines</em>
                        </p>
                    </div>        
                </div>
            </div>
        </div>
    </div>
    `;

    // Append to container
    imessageContainer.appendChild(newMessage);

    setTimeout(() => {
        thirdAnswer.style.display = "block";
    }, 500);
}

function getFifthPrompt(){
    // Create the new message element
    const newMessage = document.createElement("div");
    newMessage.className = "row";  // optional spacing

    newMessage.innerHTML = `
    <div class="container-fluid">
        <div class="row">
            <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
            <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                <!-- <img src="https://img.freepik.com/free-vector/wicked-old-witch-face-white-background_1308-74880.jpg?semt=ais_hybrid&w=740" width="65px" height="65px" alt=""> -->
            </div>
            <div class="col">
                <div class="d-flex flex-column align-items-start">
                    <div class="">
                        <p id="fifth-prompt" class="from-them ms-2 text-justify animate__animated animate__zoomIn animate__faster">
                            🛠️ Best Practices for Sustainable Coconut Farming
                            1. Regular Maintenance: Ensure timely pruning, weeding, and pest control to maintain tree health.<br><br>

                            2. Soil Fertility Management: Conduct soil testing and apply appropriate fertilizers to enhance productivity.<br><br>

                            3. Diversification: Incorporate intercropping or livestock to maximize land use and income.<br><br>

                            4. Capacity Building: Participate in training programs and workshops to stay updated on best practices and innovations.<br><br>

                            5.  Community Engagement: Collaborate with local cooperatives and organizations for shared resources and knowledge exchange.
                        </p>
                    </div>        
                </div>
            </div>
        </div>
    </div>
    `;

    // Append to container
    imessageContainer.appendChild(newMessage);
}