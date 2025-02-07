function navbarClick(id) {
    // Get all navbar links
    const navLinks = document.querySelectorAll(".nav-link");

    // Remove "active" class from all links
    navLinks.forEach(link => link.classList.remove("active"));
    
    // Add "active" class to the clicked link if it exists
    if(id){
        document.getElementById(id)?.classList.add("active");
    }else{
        document.getElementById("dashboard-nav")?.classList.add("active");
    }
}

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
            sections[tab]?.classList.toggle('d-flex', isActive);

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
    const navbarToggler = document.querySelector(".navbar-toggler"); // The button
    const navbarCollapse = document.querySelector("#navbarNav"); // The collapsible menu

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.click(); // Simulate a click to close the menu
            }
        });
    });
});
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
        if (pageId === "crop-map" && typeof map !== "undefined") {
            setTimeout(() => {
                map.invalidateSize(); // Ensure the map resizes properly
            }, 300);
        } 
    }

    function handleNavigation() {
        // Get the hash (remove `#`) or default to "main"
        const page = window.location.hash.replace("#", "") || "main";
        showPage(page);
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleNavigation);

    // Run on page load
    handleNavigation();
});
