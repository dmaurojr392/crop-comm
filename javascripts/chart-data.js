let currentLocation = localStorage.getItem('filter-location');
let updatedLocation = "";

let topCropLatestRecord;
let secondCropLatestRecord;
let thirdCropLatestRecord;

setInterval(() => {
    updatedLocation = localStorage.getItem('filter-location');
    if (currentLocation !== updatedLocation) {
        currentLocation = updatedLocation;
        checkFilter();
    }
}, 1000);

function checkFilter() {
    let selectedLocation = updatedLocation || 'Select';
    let selectedLocationElement = document.getElementById('selectedLocation');
    selectedLocationElement.textContent = selectedLocation;

    // let selectedLocation = updatedLocation || 'Select'; // Use currentLocation instead of updatedLocation
    // var selectedLocationElement = document.getElementById('selectedLocation');
    if (selectedLocation == 'Select') {
        sheetName = 'REGION III';
        selectedLocationElement.textContent = `${sheetName}`;
    } else if (selectedLocation == 'Aurora') {
        sheetName = 'AURORA';
        selectedLocationElement.textContent = `${sheetName}`;
    } else if (selectedLocation == 'Bataan') {
        sheetName = 'BATAAN';
        selectedLocationElement.textContent = sheetName;
    } else if (selectedLocation == 'Bulacan') {
        sheetName = 'BULACAN';
        selectedLocationElement.textContent = sheetName;
    } else if (selectedLocation == 'Nueva-Ecija') {
        sheetName = 'NUEVA ECIJA';
        selectedLocationElement.textContent = sheetName;
    } else if (selectedLocation == 'Pampanga') {
        sheetName = 'PAMPANGA';
        selectedLocationElement.textContent = sheetName;
    } else if (selectedLocation == 'Tarlac') {
        sheetName = 'TARLAC';
        selectedLocationElement.textContent = sheetName;
    } else if (selectedLocation == 'Zambales') {
        sheetName = 'ZAMBALES';
        selectedLocationElement.textContent = sheetName;
    }
    const RANGE = `${sheetName}`;

    async function fetchSheetData() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/1ZUfW6r4SaF01njB7_N3g1YeAgOcyO_Qcn5pYEF1jahU/values:batchGet?ranges=${sheetName}!A1:Z100&ranges='${sheetName} HARVEST AREA'!A1:Z100&key=AIzaSyC2K27qYEGDTm0-pZyrrTRM767D2M2Cu6A`;
        try {
            document.getElementById("loader").classList.remove("d-none");
            document.getElementById("loader").classList.add("d-flex");
            document.getElementById("overview-content").classList.remove("d-block");
            document.getElementById("overview-content").classList.add("d-none");
            const response = await fetch(url);
            const data = await response.json();

            let firstDataSheet = data.valueRanges[0];
            let secondDataSheet = data.valueRanges[1];
            if (!firstDataSheet.values || !secondDataSheet.values) return;
            document.getElementById("loader").classList.remove("d-flex");
            document.getElementById("loader").classList.add("d-none");
            document.getElementById("overview-content").classList.remove("d-none");
            document.getElementById("overview-content").classList.add("d-block");
            let croppingYear = firstDataSheet.values[1].slice(1, -1);
            
            let datedYearData = croppingYear ? croppingYear[croppingYear.length - 1] : null;
            
            let topCropData = firstDataSheet.values[2].slice(1, -1).map(v => Number(v.replace(/,/g, "")) || 0);
            let topCropHarvestArea = secondDataSheet.values[2].slice(1, -1).map(v => Number(v.replace(/,/g, "")) || 0);
            topCropLabel = firstDataSheet.values[2][0];
            topCropLatestRecord = topCropData.length > 2 ? Number(topCropData[topCropData.length - 1]).toLocaleString() : null;
            topCropLatestHarvestAreaRecord = topCropHarvestArea.length > 2 ? Number(topCropHarvestArea[topCropHarvestArea.length - 1]).toLocaleString() : null;
            topCropPreviousYearRecord = topCropData.length > 2 ? Number(topCropData[topCropData.length - 2]).toLocaleString() : null;

            let secondCropData = firstDataSheet.values[3].slice(1, -1).map(v => Number(v.replace(/,/g, "")) || 0);
            let secondCropHarvestArea = secondDataSheet.values[3].slice(1, -1).map(v => Number(v.replace(/,/g, "")) || 0);
            secondCropLabel = firstDataSheet.values[3][0];
            secondCropLatestRecord = secondCropData.length > 2 ? Number(secondCropData[secondCropData.length - 1]).toLocaleString() : null;
            secondCropLatestHarvestAreaRecord = secondCropHarvestArea.length > 2 ? Number(secondCropHarvestArea[secondCropHarvestArea.length - 1]).toLocaleString() : null;
            secondCropPreviousYearRecord = secondCropData.length > 2 ? Number(secondCropData[secondCropData.length - 2]).toLocaleString() : null;

            let thirdCropData = firstDataSheet.values[4].slice(1, -1).map(v => Number(v.replace(/,/g, "")) || 0);
            let thirdCropHarvestArea = secondDataSheet.values[4].slice(1, -1).map(v => Number(v.replace(/,/g, "")) || 0);
            thirdCropLabel = firstDataSheet.values[4][0];
            thirdCropLatestRecord = thirdCropData.length > 2 ? Number(thirdCropData[thirdCropData.length - 1]).toLocaleString() : null;
            thirdCropLatestHarvestAreaRecord = thirdCropHarvestArea.length > 2 ? Number(thirdCropHarvestArea[thirdCropHarvestArea.length - 1]).toLocaleString() : null;
            thirdCropPreviousYearRecord = thirdCropData.length > 2 ? Number(thirdCropData[thirdCropData.length - 2]).toLocaleString() : null;

            if (topCropLatestRecord > topCropPreviousYearRecord) {
                var topVolumeBgColor = "bg-success";
                var topVolumeIcon = "<i class='bi bi-caret-up-fill'></i>";
            }else if(topCropLatestRecord < topCropPreviousYearRecord){
                var topVolumeBgColor = "bg-danger";
                var topVolumeIcon = "<i class='bi bi-caret-down-fill'></i>";
            }else{
                var topVolumeBgColor = "bg-warning";
                var topVolumeIcon = "-";
            }

            if(secondCropLatestRecord > secondCropPreviousYearRecord){
                var secondVolumeBgColor = "bg-success";
                var secondVolumeIcon = "<i class='bi bi-caret-up-fill'></i>";
            }else if(secondCropLatestRecord < secondCropPreviousYearRecord){
                var secondVolumeBgColor = "bg-danger";
                var secondVolumeIcon = "<i class='bi bi-caret-down-fill'></i>";
            }else{
                var secondVolumeBgColor = "bg-warning";
                var secondVolumeIcon = "-";
            }

            if(thirdCropLatestRecord > thirdCropPreviousYearRecord){
                var thirdVolumeBgColor = "bg-success";
                var thirdVolumeIcon = "<i class='bi bi-caret-up-fill'></i>";
            }else if(thirdCropLatestRecord < thirdCropPreviousYearRecord){
                var thirdVolumeBgColor = "bg-danger";
                var thirdVolumeIcon = "<i class='bi bi-caret-down-fill'></i>";
            }else{
                var thirdVolumeBgColor = "bg-warning";
                var thirdVolumeIcon = "-";
            }

            document.getElementById("cropping-year").textContent = datedYearData;
            document.querySelectorAll('.top-crop-label').forEach(el => el.textContent = topCropLabel);
            document.querySelectorAll('.second-crop-label').forEach(el => el.textContent = secondCropLabel);
            document.querySelectorAll('.third-crop-label').forEach(el => el.textContent = thirdCropLabel);
            document.querySelectorAll('.top-crop-area').forEach(el => el.textContent = topCropLatestHarvestAreaRecord + " Hectares");
            document.querySelectorAll('.second-crop-area').forEach(el => el.textContent = secondCropLatestHarvestAreaRecord + " Hectares");
            document.querySelectorAll('.third-crop-area').forEach(el => el.textContent = thirdCropLatestHarvestAreaRecord + " Hectares");

            document.getElementsByClassName('top-crop-volume')[0].innerHTML = `<div class='${topVolumeBgColor} text-light rounded px-3'>${topVolumeIcon} ${topCropLatestRecord}  MT</div>`;
            document.getElementsByClassName('second-crop-volume')[0].innerHTML = `<div class='${secondVolumeBgColor} text-light rounded px-3'>${secondVolumeIcon} ${secondCropLatestRecord}  MT</div>`;
            document.getElementsByClassName('third-crop-volume')[0].innerHTML = `<div class='${thirdVolumeBgColor} text-light rounded px-3'>${thirdVolumeIcon} ${thirdCropLatestRecord}  MT</div>`;

            document.getElementsByClassName('top-crop-volume')[1].innerHTML = ` ${topCropLatestRecord} `;
            document.getElementsByClassName('second-crop-volume')[1].innerHTML = `${secondCropLatestRecord}`;
            document.getElementsByClassName('third-crop-volume')[1].innerHTML = `${thirdCropLatestRecord}`;

            updateChart('top-histogram', topCropData, croppingYear, '#CDAAFD');
            updateChart('second-histogram', secondCropData, croppingYear, '#FFA3A3');
            updateChart('third-histogram', thirdCropData, croppingYear, '#FFD28F');
            updatePieChart('crop-summary', [topCropData[0], secondCropData[0], thirdCropData[0]], ['#CDAAFD', '#FFA3A3', '#FFD28F']);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    fetchSheetData();
}

let chartInstances = {};
function updateChart(canvasId, data, labels, color) {
   
    let canvas = document.getElementById(canvasId);
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    chartInstances[canvasId] = new Chart(canvas.getContext("2d"), {
        type: 'bar',
        data: { labels: labels, datasets: [{ label: "Production", data: data, backgroundColor: color }] },
        options: { plugins: { legend: { display: false } } }
    });
}

function updatePieChart(canvasId, data, colors) {
    let canvas = document.getElementById(canvasId);
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    chartInstances[canvasId] = new Chart(canvas.getContext("2d"), {
        type: 'pie',
        data: { labels: [topCropLabel, secondCropLabel, thirdCropLabel], datasets: [{ data: data, backgroundColor: colors }] },
        options: { plugins: { legend: { display: false } } }
    });
}

checkFilter();
