let crop;
let hash;
let suitMap = null;

function suitabilityMapHandler(){

    hash = window.location.hash;
    if (!hash.startsWith("#suitability-map-")) return;
    crop = hash.split('-').pop();
    // document.getElementById('crop-name').innerText = crop.toUpperCase();
    document.querySelectorAll(".crop-name").forEach(item => {
        item.innerText = crop.toUpperCase();
    })
    // window.alert("hash changed to" + hash);
    if (suitMap !== null) {
        suitMap.remove(); // Clean up existing map
    }
    suitMap = L.map(crop + '-map', 
    ).setView([15.5, 121.5], 8); // Adjust center and zoom
    setTimeout(() => {
        suitMap.invalidateSize();
    }, 100); // give time for DOM to be visible

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: 'Central Luzon Agri-Analytics',
        // subdomains: 'abcd',
        // maxZoom: 20
    }).addTo(suitMap);
    // PNG overlay
    const imageURL = 'assets/crops-suitability-map/' + crop +'.png';  // Path to your PNG
    const imageBounds = [[14.371, 119.61], [16.566, 122.42]];  // SW and NE corners

    suitMap.createPane("imagePane");
    suitMap.getPane("imagePane").style.zIndex = 200; // lower than markers (which default to zIndex 400)


    L.imageOverlay(imageURL, imageBounds, {
        pane: 'imagePane'
    }).addTo(suitMap);

    const provinceLabels = [
        { name: "Aurora", lat: 15.7338, lng: 121.5959 },
        { name: "Bataan", lat: 14.616, lng: 120.5660 },
        { name: "Bulacan", lat: 14.9500, lng: 121.199 },
        { name: "Nueva Ecija", lat: 15.5975, lng: 121.07 },
        { name: "Pampanga", lat: 15.0294, lng: 120.7190 },
        { name: "Tarlac", lat: 15.4800, lng: 120.6000 },
        { name: "Zambales", lat: 15.2333, lng: 120.2667 }
    ];

    provinceLabels.forEach(({ name, lat, lng }) => {
        L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'province-label',
            html: '<div style="color: #000; text-shadow: 2px 2px 2px #dedede; font-size: 14px; font-weight:500; padding: 2px 5px; border-radius: 4px;">' + name + '</div>',
        iconSize: [100, 30]
        })
        }).addTo(suitMap);
    });



    let legendSuitMap = L.control({ position: "topright" });

    legendSuitMap.onAdd = function (suitMap) {
        const div = L.DomUtil.create("div", "suitability-map");
        // div.id = "map-legend";
        div.innerHTML = `
            <div class="info legend  d-flex flex-column">
            <div style="border-bottom: .5px solid rgb(0,0,0,0.2);">
                <div class="d-flex align-items-center justify-content-center">
                <img src="assets/logo/DOST3-logo.png" width="50px" height="50px" alt="">
                <img src="assets/logo/CLSU-logo-new.png" width="37px" height="37px" alt="">
                </div>
                <div class="text-center">
                <p style="font-size: 9pt; margin-bottom: 8px;">Department of Science and Technology - Region III<br>
                Central Luzon State University</p>
                </div>
            </div>
            <div class="text-center mt-2"> 
                <h5 style="text-shadow: 2px 2px 8px #fff;">${crop.toUpperCase()} SUITABILITY MAP</h5>
                <h6 style="text-shadow: 2px 2px 8px #fff;">CENTRAL LUZON</h6>
            </div>
            </div>
            <div class="info legend mt-2">
            <h6 class="text-center">LEGENDS</h6>
            <div class="d-flex align-items-center">
                <div style="width: 25px; height: 15px; border: 1px solid gray; background-color: #007206;" class="me-2"></div>
                <div>Highly Suitable</div>
            </div>
            <div class="d-flex align-items-center">
                <div style="width: 25px; height: 15px; border: 1px solid gray; background-color: #7DB810;" class="me-2"></div>
                <div>Suitable</div>
            </div>
            <div class="d-flex align-items-center">
                <div style="width: 25px; height: 15px; border: 1px solid gray; background-color: #F2FE1E;" class="me-2"></div>
                <div>Moderately Suitable</div>
            </div>
            <div class="d-flex align-items-center">
                <div style="width: 25px; height: 15px; border: 1px solid gray; background-color: #FFAC12" class="me-2"></div>
                <div>Low Suitable</div>
            </div>
            <div class="d-flex align-items-center">
                <div style="width: 25px; height: 15px; border: 1px solid gray; background-color: #FC3B09" class="me-2"></div>
                <div>Not Suitable</div>
            </div>
            </div>
        `;
        return div;
    };

    legendSuitMap.addTo(suitMap);
}

downloadSuitMap = () => {
  const node = document.getElementById(crop + '-map-view-container');
  if (!node) {
    alert('Map container not found!');
    return;
  }

  const scale = 3; // Increase for higher resolution
  const style = {
    transform: 'scale(' + scale + ')',
    transformOrigin: 'top left',
    width: node.offsetWidth + 'px',
    height: node.offsetHeight + 'px'
  };

  const param = {
    width: node.offsetWidth * scale,
    height: node.offsetHeight * scale,
    style: style
  };

  domtoimage.toPng(node, param)
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = crop + '-suitability-map.png';
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error('Failed to generate image:', error);
    });
};

