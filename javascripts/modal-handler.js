document.addEventListener("DOMContentLoaded", function () {
    var previewTopCropModal = document.getElementById("previewTopCropModal");
    var previewSecondCropModal = document.getElementById("previewSecondCropModal");
    var previewSecondCropModal = document.getElementById("previewSecondCropModal");

    previewTopCropModal.addEventListener("show.bs.offcanvas", function () {
        // Get data from the first occurrence of the class
        let cropLabel = document.getElementsByClassName('top-crop-label')[0]?.innerText || "Unknown";
        let cropVolume = document.getElementsByClassName('top-crop-volume')[0]?.innerText || "Unknown";
        let volumePercentageDifference = (((parseFloat(topCropLatestRecord.replace(/,/g, "")) - parseFloat(topCropPreviousYearRecord.replace(/,/g, ""))) / parseFloat(topCropPreviousYearRecord.replace(/,/g, ""))) * 100).toFixed(2);
        let volumeDifference = (parseFloat(topCropLatestRecord.replace(/,/g, "")) - parseFloat(topCropPreviousYearRecord.replace(/,/g, ""))).toFixed(2);
        // Set modal content
        if(topCropLatestRecord > topCropPreviousYearRecord) {
        var volumeIndicator = "went up";
        var volumeIndicator2 = "increase";
        var volumeIndicator3 = "growth";
        var insights = `<p style="margin-top:-2%; text-align: justify;">The rise could be attributed to <i><strong>enhanced farming practices, favorable climate conditions, or expanded cultivation efforts</strong></i>. With this positive trend, ${cropLabel.toLowerCase()} farmers may experience increased market opportunities and economic gains.</p>`;
        } else if(topCropLatestRecord < topCropPreviousYearRecord){
        var volumeIndicator = "went down";
        var volumeIndicator2 = "decrease";
        var volumeIndicator3 = "dropped";
        var insights = `<p style="margin-top:-2%; text-align: justify;">This decline of <strong>${Number(volumeDifference).toLocaleString().replace(/-/g, "")} MT</strong> in production may indicate challenges in <i><strong>weather conditions, pest infestations, or resource availability</strong></i>. If this trend continues, it could impact <i><strong>market supply, leading to potential price increases</strong></i>. Addressing these issues through <i><strong>better farming techniques, government support, and climate adaptation strategies</i></strong> could help stabilize production in the coming years.</p>`;
        }else{
        var volumeIndicator = "remains the same";
        }

        document.getElementById("exampleModalLabel").innerHTML = `${cropLabel} Production in ${localStorage.getItem("filter-location") == "Select" ? "Region III" : localStorage.getItem('filter-location').replace(/-/g, " ")}`;

        document.getElementById("modalBodyContent").innerHTML = `
            <center><img src="assets/crop-img/${cropLabel}.jpg" height="250" width="400px" alt="${cropLabel} Picture" style="object-fit: cover; border-radius: 10px;"></center>
            <p style="text-align: justify;" class="mt-2">
                In <i>2023</i>, <strong>${cropLabel}</strong> production ${volumeIndicator} to <strong>${cropVolume}</strong>, marking   <strong>${Number(volumePercentageDifference).toLocaleString().replace(/-/g, "")}%</strong> ${volumeIndicator2} from <i>2022</i>’s output of <strong>${topCropPreviousYearRecord} MT</strong>. This translates to <strong>${Number(volumeDifference).toLocaleString().replace(/-/g, "")} MT</strong> ${volumeIndicator2} in production—demonstrating ${volumeIndicator3} in yield performance compared to the previous year.
            </p>
            ${insights}
            <a href="#ai-assistant">Click here for more insights about the crop.</a>`;
    });

    previewSecondCropModal.addEventListener("show.bs.offcanvas", function () {
        // Get data from the first occurrence of the class
        let cropLabel = document.getElementsByClassName('second-crop-label')[0]?.innerText || "Unknown";
        let cropVolume = document.getElementsByClassName('second-crop-volume')[0]?.innerText || "Unknown";
        console.log(cropLabel);
        let volumePercentageDifference = (((parseFloat(secondCropLatestRecord.replace(/,/g, "")) - parseFloat(secondCropPreviousYearRecord.replace(/,/g, ""))) / parseFloat(secondCropPreviousYearRecord.replace(/,/g, ""))) * 100).toFixed(2);
        let volumeDifference = (parseFloat(secondCropLatestRecord.replace(/,/g, "")) - parseFloat(secondCropPreviousYearRecord.replace(/,/g, ""))).toFixed(2);

        // Set modal content
        if(secondCropLatestRecord > secondCropPreviousYearRecord) {
        var volumeIndicator = "went up";
        var volumeIndicator2 = "increase";
        var volumeIndicator3 = "growth";
        var insights = `<p style="margin-top:-2%; text-align: justify;">The rise could be attributed to <i><strong>enhanced farming practices, favorable climate conditions, or expanded cultivation efforts</strong></i>. With this positive trend, ${cropLabel.toLowerCase()} farmers may experience increased market opportunities and economic gains.</p>`;
        } else if(secondCropLatestRecord < secondCropPreviousYearRecord){
        var volumeIndicator = "went down";
        var volumeIndicator2 = "decrease";
        var volumeIndicator3 = "dropped";
        var insights = `<p style="margin-top:-2%; text-align: justify;">This decline of <strong>${Number(volumeDifference).toLocaleString().replace(/-/g, "")} MT</strong> in production may indicate challenges in <i><strong>weather conditions, pest infestations, or resource availability</strong></i>. If this trend continues, it could impact <i><strong>market supply, leading to potential price increases</strong></i>. Addressing these issues through <i><strong>better farming techniques, government support, and climate adaptation strategies</i></strong> could help stabilize production in the coming years.</p>`;
        }else{
        var volumeIndicator = "remains the same";
        }
        
        document.getElementById("secondCropModalLabel").innerHTML = `${cropLabel} Production in ${localStorage.getItem("filter-location") == "Select" ? "Region III" : localStorage.getItem('filter-location').replace(/-/g, " ")}`;
        document.getElementById("secondCropModalBodyContent").innerHTML = `
            <center><img src="assets/crop-img/${cropLabel}.jpg" height="250" alt="${cropLabel} Picture" width="400px" style="object-fit: cover; border-radius: 10px;"></center>
            <p style="text-align: justify;" class="mt-2">
                In <i>2023</i>, <strong>${cropLabel}</strong> production ${volumeIndicator} to <strong>${cropVolume}</strong>, marking   <strong>${Number(volumePercentageDifference).toLocaleString().replace(/-/g, "")}%</strong> ${volumeIndicator2} from <i>2022</i>’s output of <strong>${secondCropPreviousYearRecord} MT</strong>. This translates to <strong>${Number(volumeDifference).toLocaleString().replace(/-/g, "")} MT</strong> ${volumeIndicator2} in production—demonstrating ${volumeIndicator3} in yield performance compared to the previous year.
            </p>
            ${insights}
            <a href="#ai-assistant">Click here for more insights about the crop.</a>`;
    });

    previewThirdCropModal.addEventListener("show.bs.offcanvas", function () {
        // Get data from the first occurrence of the class
        let cropLabel = document.getElementsByClassName('third-crop-label')[0]?.innerText || "Unknown";
        let cropVolume = document.getElementsByClassName('third-crop-volume')[0]?.innerText || "Unknown";
        let volumePercentageDifference = (((parseFloat(thirdCropLatestRecord.replace(/,/g, "")) - parseFloat(thirdCropPreviousYearRecord.replace(/,/g, ""))) / parseFloat(thirdCropPreviousYearRecord.replace(/,/g, ""))) * 100).toFixed(2);
        let volumeDifference = (parseFloat(thirdCropLatestRecord.replace(/,/g, "")) - parseFloat(thirdCropPreviousYearRecord.replace(/,/g, ""))).toFixed(2);
        // Set modal content
        if(thirdCropLatestRecord > thirdCropPreviousYearRecord) {
        var volumeIndicator = "went up";
        var volumeIndicator2 = "increase";
        var volumeIndicator3 = "growth";
        var insights = `<p style="margin-top:-2%; text-align: justify;">The rise could be attributed to <i><strong>enhanced farming practices, favorable climate conditions, or expanded cultivation efforts</strong></i>. With this positive trend, ${cropLabel.toLowerCase()} farmers may experience increased market opportunities and economic gains.</p>`;
        } else if(thirdCropLatestRecord < thirdCropPreviousYearRecord){
        var volumeIndicator = "went down";
        var volumeIndicator2 = "decrease";
        var volumeIndicator3 = "dropped";
        var insights = `<p style="margin-top:-2%; text-align: justify;">This decline of <strong>${Number(volumeDifference).toLocaleString().replace(/-/g, "")} MT</strong> in production may indicate challenges in <i><strong>weather conditions, pest infestations, or resource availability</strong></i>. If this trend continues, it could impact <i><strong>market supply, leading to potential price increases</strong></i>. Addressing these issues through <i><strong>better farming techniques, government support, and climate adaptation strategies</i></strong> could help stabilize production in the coming years.</p>`;
        }else{
        var volumeIndicator = "remains the same";
        }
        document.getElementById("thirdCropModalLabel").innerHTML = `${cropLabel} Production in ${localStorage.getItem("filter-location") == "Select" ? "Region III" : localStorage.getItem('filter-location').replace(/-/g, " ")}`;
        document.getElementById("thirdCropModalBodyContent").innerHTML = `
            <center><img src="assets/crop-img/${cropLabel}.jpg" height="250" alt="${cropLabel} Picture" width="400px" style="object-fit: cover; border-radius: 10px;"></center>
            <p style="text-align: justify;" class="mt-2">
                In <i>2023</i>, <strong>${cropLabel}</strong> production ${volumeIndicator} to <strong>${cropVolume}</strong>, marking   <strong>${Number(volumePercentageDifference).toLocaleString().replace(/-/g, "")}%</strong> ${volumeIndicator2} from <i>2022</i>’s output of <strong>${thirdCropPreviousYearRecord} MT</strong>. This translates to <strong>${Number(volumeDifference).toLocaleString().replace(/-/g, "")} MT</strong> ${volumeIndicator2} in production—demonstrating ${volumeIndicator3} in yield performance compared to the previous year.
            </p>
            ${insights}
            <a href="#ai-assistant" >Click here for more insights about the crop.</a>`;
    });
});