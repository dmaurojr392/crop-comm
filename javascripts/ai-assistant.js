// Cache DOM elements
const imessageContainer = document.getElementById("imessage");
const firstAnswer = document.getElementById("first-answer");
const secondAnswer = document.getElementById("second-answer");
const thirdAnswer = document.getElementById("third-answer");
const firstPromptLoader = document.getElementById("first-prompt-loader");
const topCropButton = document.getElementById("ai-top-crop-btn");
const secondCropButton = document.getElementById("ai-second-crop-btn");
const thirdCropButton = document.getElementById("ai-third-crop-btn");
const analysisBtn = document.getElementById("ai-crop-analysis-btn");
const resetBtn = document.getElementById("ai-crop-reset-btn");

let selectedProvince;
let selectedCropForAI;

// Helper functions
function hideElements(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.style.display = "none";
    });
}

function showElements(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.style.display = "block";
    });
}

function scrollMessageToBottom() {
    imessageContainer.scrollTo({
        top: imessageContainer.scrollHeight,
        behavior: 'smooth'
    });
}

function createMessageElement(html) {
    const newMessage = document.createElement("div");
    newMessage.className = "row";
    newMessage.innerHTML = html;
    imessageContainer.appendChild(newMessage);
    scrollMessageToBottom();
}

// Initialize chat
function initializeChat() {
    hideElements(".first-prompt-loader");
    hideElements("#second-prompt");
    firstAnswer.style.display = "none";
    secondAnswer.style.display = "none";
    thirdAnswer.style.display = "none";

    setTimeout(() => showElements(".first-prompt-loader"), 3000);
    setTimeout(getFirstPrompt, 6000);
    setTimeout(getFirstAnswer, 7000);
}

// Chat flow functions
function getFirstPrompt() {
    hideElements(".first-prompt-loader");
    showElements("#second-prompt");
    document.querySelectorAll(".first-prompt").forEach(item => {
        item.classList.add("no-tail");
    });
    scrollMessageToBottom();
}

function getFirstAnswer() {
    firstAnswer.style.display = "flex";
}

function auroraBtnOnClick(button) {
    handleProvinceSelection(button, ["Coconut", "Corn", "Banana"]);
}
function bataanBtnOnClick(button) {
    handleProvinceSelection(button, ["Corn", "Cashew", "Coconut"]);
}
function bulacanBtnOnClick(button) {
    handleProvinceSelection(button, ["Banana", "Sitao", "Mango"]);
}
function nuevaEcijaBtnOnClick(button) {
    handleProvinceSelection(button, ["Onion", "Corn", "Tomato"]);
}
function pampangaBtnOnClick(button) {
    handleProvinceSelection(button, ["Sugarcane", "Corn", "Cassava"]);
}
function tarlacBtnOnClick(button) {
    handleProvinceSelection(button, ["Corn", "Sugarcane", "Tomato"]);
}
function zambalesBtnOnClick(button) {
    handleProvinceSelection(button, ["Mango", "Cogon", "Banana"]);
}
function handleProvinceSelection(button, crops) {
    selectedProvince = button.innerHTML;
    hideElements("#first-answer");

    createMessageElement(`
        <div class="col-12">
            <div class="d-flex justify-content-end">
                <p class="from-me animate__animated animate__zoomIn animate__faster">${selectedProvince}</p>    
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
    `);

    setTimeout(() => {
        hideElements("#second-prompt-loader");
        getThirdPrompt();
        setTimeout(() => {
            secondAnswer.style.display = "block";
            topCropButton.innerText = crops[0];
            secondCropButton.innerText = crops[1];
            thirdCropButton.innerText = crops[2];
        }, 500);
    }, 3000);
}

function getThirdPrompt() {
    createMessageElement(`
        <div class="container-fluid">
            <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                    <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                </div>
                <div class="col">
                    <div class="d-flex flex-column align-items-start">
                        <div class="">
                            <p id="third-prompt" class="from-them ms-2 animate__animated animate__zoomIn animate__faster">
                                ${selectedProvince} is a great choice. I listed the top 3 commodities below. Please pick one on the list.
                            </p>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    `);
}

function topCropButtonOnClick() {
    selectedCropForAI = topCropButton.innerText;
    handleCropSelection();
}

function secondCropButtonOnClick() {
    selectedCropForAI = secondCropButton.innerText;
    handleCropSelection();
}

function thirdCropButtonOnClick() {
    selectedCropForAI = thirdCropButton.innerText;
    handleCropSelection();
}

// ... (keep all your existing DOM caching and helper functions)

async function handleCropSelection() {
    secondAnswer.style.display = "none";

    // Show loading message
    createMessageElement(`
        <div class="col-12">
            <div class="d-flex flex-column justify-content-end">
                <p class="from-me animate__animated animate__zoomIn animate__faster">I'd like to pick ${selectedCropForAI} </p>
            </div>
            <div class="row third-prompt-loader">
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
    `);

    try {
        // Fetch data from the endpoint
        const response = await fetch(`http://localhost:8000/gemini/farming-best-practices?crop=${encodeURIComponent(selectedCropForAI)}&region=${encodeURIComponent(selectedProvince)}`);  
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Hide loader and show the data
        hideElements(".third-prompt-loader");
        showFourthPrompt(data);
        
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error - show error message
        hideElements(".third-prompt-loader");
        createMessageElement(`
            <div class="container-fluid">
                <div class="row">
                    <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                        <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                    </div>
                    <div class="col">
                        <div class="d-flex flex-column align-items-start">
                            <div class="">
                                <p class="from-them ms-2 text-justify animate__animated animate__zoomIn animate__faster">
                                    Sorry, I couldn't fetch the data for ${selectedCropForAI}. Please try again later.
                                </p>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        `);
        thirdAnswer.style.display = "block";
    }
}

function showFourthPrompt(data) {
    // Use the data from the API response to populate your template
    // Adjust this based on your actual API response structure
    console.log(data);
    const content = data.text || `
        something went wrong, please try again later.
    `;

    createMessageElement(`
        <div class="container-fluid">
            <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                    <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                </div>
                <div class="col">
                    <div class="d-flex flex-column align-items-start">
                        <div class="">
                            <p id="fourth-prompt" class="from-them ms-2 text-justify animate__animated animate__zoomIn animate__faster">
                                ${content}
                            </p>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    `);

    thirdAnswer.style.display = "block";
}

// ... (keep all your other existing functions)

// Remove the old getFourthPrompt function since we're using showFourthPrompt now

async function analysisAndRecommendation() {
    secondAnswer.style.display = "none";

    // Show loading message
    createMessageElement(`
        <div class="col-12">
            <div id="analysis-container" class="d-flex flex-column justify-content-end">
                <p class="from-me animate__animated animate__zoomIn animate__faster">
                    Analysis and Recommendations for ${selectedCropForAI} in ${selectedProvince}
                </p>
            </div>
            <div class="row fourth-prompt-loader">
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
    `);

    analysisBtn.classList.add("d-none");

    try {
        // Fetch analysis data from the endpoint
        const response = await fetch(
            `http://localhost:8000/gemini/recommendations-and-analysis?crop=${encodeURIComponent(selectedCropForAI)}&region=${encodeURIComponent(selectedProvince)}`
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Hide loader and show the data
        const loaders = document.querySelectorAll(".fourth-prompt-loader");
        if (loaders.length > 0) {
            loaders[loaders.length - 1].style.display = "none";
        }
        showAnalysisResults(data);
        
    } catch (error) {
        console.error('Error fetching analysis data:', error);
        // Handle error - show error message
        const loaders = document.querySelectorAll(".fourth-prompt-loader");
        if (loaders.length > 0) {
            loaders[loaders.length - 1].style.display = "none";
        }
        
        createMessageElement(`
            <div class="container-fluid">
                <div class="row">
                    <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                        <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                    </div>
                    <div class="col">
                        <div class="d-flex flex-column align-items-start">
                            <div class="">
                                <p class="from-them ms-2 text-justify animate__animated animate__zoomIn animate__faster">
                                    Sorry, I couldn't fetch the analysis for ${selectedCropForAI}. Please try again later.
                                </p>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}

function showAnalysisResults(data) {
    // Format the recommendations from the API response
    // Adjust this based on your actual API response structure
    let recommendationsContent = '';
    
    if (data.recommendations && Array.isArray(data.recommendations)) {
        recommendationsContent = data.recommendations
            .map((rec, index) => `${index + 1}. ${rec}`)
            .join('<br><br>');
    } else {
        // Fallback content if no recommendations are provided
        recommendationsContent = `
            1. Regular Maintenance: Ensure timely pruning, weeding, and pest control to maintain tree health.<br><br>
            2. Soil Management: Conduct regular soil tests to determine nutrient needs.<br><br>
            3. Irrigation: Implement proper water management based on seasonal requirements.
        `;
    }

    createMessageElement(`
        <div class="container-fluid">
            <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                    <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                </div>
                <div class="col">
                    <div class="d-flex flex-column align-items-start">
                        <div class="">
                            <p id="fifth-prompt" class="from-them ms-2 text-justify animate__animated animate__zoomIn animate__faster">
                                <strong>🛠️ Analysis and Recommendations for ${selectedCropForAI} in ${selectedProvince}</strong><br><br>
                                ${data.text || '<strong>Analysis:</strong> Based on regional data and crop requirements...'}<br><br>
                                <strong>Recommendations:</strong><br><br>
                                ${recommendationsContent}
                            </p>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    `);
}

// Remove the old getFifthPrompt function since we're using showAnalysisResults now

function reset() {
    analysisBtn.classList.remove("d-none");
    
    createMessageElement(`
        <div class="container-fluid">
            <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-end animate__animated animate__fadeIn animate__faster">
                    <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
                </div>
                <div class="col">
                    <div class="d-flex flex-column align-items-start">
                        <div class="">
                            <p id="dynamic-prompt" class="from-them ms-2 animate__animated animate__zoomIn animate__faster">
                                Hi! I am Victor, your AI crop assistant. I can help you with crop advisories and recommendations.
                            </p>
                        </div>        
                    </div>
                    <div id="" class="d-none from-them prompt-loader dynamic-prompt-loader ms-2 animate__animated animate__zoomIn animate__faster">
                        <div class="iMessage-loader"></div>
                    </div>
                    <p id="" class="d-none from-them dynamic-prompt-2 ms-2 animate__animated animate__zoomIn animate__faster">
                        Select a province that you wanted to explore.
                    </p>
                </div>
            </div>
        </div>
    `);

    document.querySelectorAll('.dynamic-prompt-loader').forEach(item => {
        item.classList.remove('d-none');
        console.log(item.classList.length);
    });
    setTimeout(() => {
        document.querySelectorAll('.dynamic-prompt-loader').forEach(item => {
            item.classList.add('d-none');
        })
        document.querySelectorAll('.dynamic-prompt-2').forEach(item => {
            item.classList.remove('d-none');
        })
    }, 3000);

    thirdAnswer.style.display = "none";
    setTimeout(getFirstAnswer, 4000);
}

// Event listeners
analysisBtn.addEventListener("click", analysisAndRecommendation);
resetBtn.addEventListener("click", function() {
    reset();
    getFirstPrompt();
    thirdAnswer.style.display = "none";
    setTimeout(getFirstAnswer, 4000);
});

// Initialize the chat
initializeChat();