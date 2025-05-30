// for mobile navigation 
function navbarClick(pageId) {
    // Get all navbar links
    // const navLinks = document.querySelectorAll(".nav-link");

    // // Remove "active" class from all links
    // navLinks.forEach(link => link.classList.remove("active"));
    // Remove "active" class from all menu items
    document.querySelectorAll(".nav-link").forEach(item => {
        item.classList.remove("active");
    });
   
    // Add "active" class to all matching menu items
    document.querySelectorAll(`a[href="#${pageId}"]`).forEach(activeLink => {
        activeLink.parentElement.classList.add("active");
    });
    
}

// for sidebar navigation 
document.addEventListener("DOMContentLoaded", function () {
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll(".page").forEach(page => {
            page.classList.add("collapse");
        });

        // Show the selected page
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.remove("collapse");
        }

        // Remove "active" class from all menu items
        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
        });

        // Add "active" class to all matching menu items
        document.querySelectorAll(`a[href="#${pageId}"]`).forEach(activeLink => {
            activeLink.parentElement.classList.add("active");
        });

        // document.querySelectorAll("#dashboard-nav, #crop-map-nav").forEach(item => {
        //     item.classList.remove("active");
        // });

        // Fix Leaflet Map Rendering Issue
        if (pageId === "crop-map" && typeof map == "undefined") {
            // getMap();
        } 
    }
    
    function handleNavigation() {
        // Get the hash (remove `#`) or default to "main"
        checkWidth();
        const page = window.location.hash.replace("#", "") || "main";
        showPage(page);
        navbarClick(page);
        if (window.innerWidth <= 576) {
            document.getElementById("sidebar").classList.add("collapsed");
        }
        
    }
    handleNavigation();
    // Listen for hash changes
    window.addEventListener("hashchange", handleNavigation);

    // Run on page load
    handleNavigation();
});

// for overview tab 
document.addEventListener("DOMContentLoaded", function () {
    const sections = {
        overview: document.getElementById('overview'),
        productionSummary: document.getElementById('production-summary'),
        news: document.getElementById('news'),
    };

    const tabs = {
        overview: document.getElementById('overview-tab'),
        productionSummary: document.getElementById('production-summary-tab'),
        news: document.getElementById('news-tab'),
    };

    function switchTab(activeTab) {
        Object.keys(sections).forEach(tab => {
            const isActive = tab === activeTab;

            // Toggle section visibility
            sections[tab]?.classList.toggle('d-none', !isActive);
            sections[tab]?.classList.toggle('d-block', isActive);

            // Toggle tab styles
            tabs[tab]?.classList.toggle('active', isActive);
            tabs[tab]?.classList.toggle('text-dark', isActive);
            tabs[tab]?.classList.toggle('text-muted', !isActive);
        });

        // Store the selected tab in localStorage
        localStorage.setItem('currentTab', activeTab);
    }

    // Restore last active tab from localStorage
    const savedTab = localStorage.getItem('currentTab') || 'overview';
    switchTab(savedTab);

    // Attach event listeners
    tabs.overview?.addEventListener("click", () => switchTab('overview'));
    tabs.productionSummary?.addEventListener("click", () => switchTab('productionSummary'));
    tabs.news?.addEventListener("click", () => switchTab('news'));



    // for mobile navbar auto-collapse
    const navLinks = document.querySelectorAll(".navbar-nav a"); // Select all nav links
    const navbarToggler = document.querySelector("#btn-toggle-mbl"); // The button
    const navbarCollapse = document.querySelector("#btn-collapse-mbl"); // The collapsible menu

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("collapsed")) {
                navbarToggler.click(); // Simulate a click to close the menu
            }
        });
    });
});

// for overview filter
function updateFilter(value) {
    // Update the filter value
    document.getElementById('filter-value').innerText = value;
    document.getElementById('filter-badge').classList.add('bg-primary');
    localStorage.setItem('filter-location', `${document.getElementById('filter-value').innerHTML}`);
    updateWeather();

    // Show or hide the "x" button based on the selected value
    const clearButton = document.getElementById('clear-button');
    if (value === 'Select') {
        clearButton.style.display = 'none'; // Hide the "x" button for "Select"
    } else {
        clearButton.style.display = 'inline-block'; // Show the "x" button for other values
    }
}
function getSelectedYearForLeadingCrop() {
    selectedYear = document.getElementById("year-for-leading-crop-map").value;
    localStorage.setItem("year-for-leading-crop-map", selectedYear);
}
getSelectedYearForLeadingCrop();

// function initialize() {
//     selectedCrop = document.getElementById("rank-for-leading-crop-map").value;
//     localStorage.setItem("rank-for-leading-crop-map", selectedCrop);

//     // Update the legend dynamically based on selection
//     updateLegend(selectedCrop);

//     document.getElementById('map-hint').style.display = "block";
//     document.getElementById('map-details').classList.add("d-none");
//     document.getElementById('map-details').classList.remove("d-block");
// }


function getSelectedCropForLeadingCrop() {
    selectedCrop = document.getElementById("rank-for-leading-crop-map").value;
    localStorage.setItem("rank-for-leading-crop-map", selectedCrop);
    // getMap();
}
getSelectedCropForLeadingCrop();

function clearFilter() {
    // Reset the filter to "Select"
    updateFilter('Select');
    document.getElementById('filter-badge').classList.remove('bg-primary');
    localStorage.setItem('filter-location', `${document.getElementById('filter-value').innerHTML}`);
}
clearFilter();

const mediaQuery = window.matchMedia('(max-width: 767.20px)');

function handleBreakpointChange(e) {
  const element = document.querySelector('#sidebar');
  if (e.matches) {
    // 700px and below
    checkWidth();
    element.classList.add('collapsed');
    if (element && element.classList.contains('collapsed')){
        document.querySelectorAll('.sub-menu-list .menu-item').forEach(item => {
            item.classList.remove('ms-4','ms-3');
            item.style.marginLeft = "-25px";
        });

        document.querySelectorAll('.menu-item .menu-title').forEach(item => {
            item.classList.remove('ms-4');
        });
    }
    // element.classList.remove('desktop-class');
  } else {
    // above 700px
    // element.classList.add('desktop-class');
    element.classList.remove('collapsed');
        document.querySelectorAll('.sub-menu-list .menu-item').forEach(item => {
            item.classList.remove('ms-4','ms-3');
            item.removeAttribute('style');

        });

        document.querySelectorAll('.menu-item .menu-title').forEach(item => {
            item.classList.remove('ms-4');
        });
  }
}

// Initial check
handleBreakpointChange(mediaQuery);

// Listen for changes
mediaQuery.addEventListener('change', handleBreakpointChange);

const main = document.getElementById('main');
const cropMap = document.getElementById('crop-map');
const aiAssistant = document.getElementById('ai-assistant');

// setInterval(()=>{
//     console.log(main.offsetWidth);
// }, 50)
function checkWidth() {
    // Wait for the layout to finish
    setTimeout(() => {
        const currWidthMain = main.offsetWidth; // NOW it's the updated width
        const currWidthCropMap = cropMap.offsetWidth; // NOW it's the updated width
        const currWidthAiAssistant = aiAssistant.offsetWidth; // NOW it's the updated width

        const hash = window.location.hash;
        if(hash == "#main"){
            if (currWidthMain < 300) {
                main.style.opacity = "0";
                main.style.transition = "opacity 0.3s ease";
            } else {
                main.style.opacity = "1";
                main.style.transition = "opacity 0.3s ease";
            }
        }else if(hash == "#crop-map"){
            if (currWidthCropMap < 300) {
                cropMap.style.opacity = "0";
                cropMap.style.transition = "opacity 0.3s ease";
            } else {
                cropMap.style.opacity = "1";
                cropMap.style.transition = "opacity 0.3s ease";
            }
        }else if(hash == "#ai-assistant"){
            if (currWidthAiAssistant < 300) {
                aiAssistant.style.opacity = "0";
                aiAssistant.style.transition = "opacity 0.3s ease";   
            } else {
                aiAssistant.style.opacity = "1";
                aiAssistant.style.transition = "opacity 0.3s ease";
            }
        }else{
            main.style.opacity = "0";
            main.style.transition = "opacity 0.3s ease";
            if (currWidthMain < 300) {
                
                // document.querySelectorAll('.sub-menu-list .menu-item').forEach(item => {
                //     item.classList.remove('ms-4','ms-3');
                //     item.removeAttribute('style');
        
                // });
        
                // document.querySelectorAll('.menu-item .menu-title').forEach(item => {
                //     item.classList.remove('ms-4');
                // });
                
            } else {
                main.style.opacity = "1";
                main.style.transition = "opacity 0.2s ease";
                // document.querySelectorAll('.sub-menu-list .menu-item').forEach(item => {
                //     item.classList.remove('ms-4','ms-3');
                //     item.style.marginLeft = "-25px";
                // });
        
                // document.querySelectorAll('.menu-item .menu-title').forEach(item => {
                //     item.classList.remove('ms-4');
                // });
                
            }
        }

    }, 251); // small delay, usually 50ms is enough
}

document.getElementById("btn-toggle-mbl").addEventListener("click", checkWidth);
document.getElementById("btn-collapse-mbl").addEventListener("click", checkWidth);
