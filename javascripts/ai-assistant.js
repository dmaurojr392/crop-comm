const imessageContainer = document.getElementById("imessage");
const firstAnswer = document.getElementById("first-answer");
const secondAnswer = document.getElementById("second-answer");
const firstPromptLoader = document.getElementById("first-prompt-loader");
const topCropButton = document.getElementById("ai-top-crop-btn");
const secondCropButton = document.getElementById("ai-second-crop-btn");
const thirdCropButton = document.getElementById("ai-third-crop-btn");

firstPromptLoader.style.display = "none";
firstAnswer.style.display = "none";
secondAnswer.style.display = "none";

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
            <p class="from-me animate__animated animate__zoomIn animate__faster">I'd like to know crop advisories, recommendations, and farm practices in Aurora. </p>    
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
    // <div class="col-1 d-flex justify-content-center align-items-end">
    //     <img src="assets/ai-logo/farmer.png" width="65px" height="65px" alt="">
    // </div>

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
                    Coconut farming in Aurora Province, particularly in areas like Dingalan, Dinalungan, and Baler, plays a significant role in the local economy. To enhance productivity and sustainability, it's essential to consider tailored advisories, best practices, and insights from historical data.<br><br>
                    <strong>🌴 Crop Advisories & Recommendations for Coconut Farming in Aurora</strong><br><br>

                    <strong>1. Adopt Improved Farming Practices</strong><br>
                    A study in Dingalan highlighted the need for better farming techniques due to challenges like low yield and limited support. Recommendations include establishing extension activities focused on farmer training and capability building, as well as strengthening political will to promote marketing and farming practices.<br><br>

                    <strong>2. Utilize Quality Planting Materials</strong><br>
                    The Philippine Coconut Authority (PCA) has distributed dwarf coconut seedlings in areas like San Luis, aiming to rejuvenate aging plantations and improve yields . Engaging with PCA for high-quality seedlings is advisable.<br><br>

                    <strong>3. Implement Integrated Farming Systems</strong><br>
                    Integrating livestock, such as native cattle, into coconut farming can diversify income and optimize land use. Training programs have been conducted to educate farmers on native cattle production and management.<br><br>

                    <strong>4. Enhance Infrastructure and Accessibility</strong><br>
                    Infrastructure projects, like the 4.6-kilometer access road in Dinalungan, have improved transportation of agricultural products, connecting plantations to major roads and markets . Such developments facilitate better market access and reduce post-harvest losses.<br>

                    <strong>5. Strengthen Flood Protection Measures</strong><br>
                    Flood mitigation structures, including river walls and slope protections along rivers in Baler, have been constructed to safeguard coconut plantations from flooding . Implementing similar protective measures can minimize agricultural losses during heavy rains.
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
