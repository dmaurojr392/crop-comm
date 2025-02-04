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
