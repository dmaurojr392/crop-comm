document.addEventListener("DOMContentLoaded", () => {
    const downloadHistogram = (containerId, cropLabelClass) => {
        const cropLabel = document.getElementsByClassName(cropLabelClass)[0];
        const node = document.getElementById(containerId);

        if (!cropLabel || !node) {
            alert(`Required elements not found!`);
            return;
        }

        const cropName = cropLabel.innerText.trim();
        // const cropYear = document.getElementById("cropping-year")?.innerText.trim() || "Unknown Year";
        const rawLocation = localStorage.getItem("filter-location");
        const location = rawLocation === "Select" ? "Central Luzon" : rawLocation || "Unknown Location";

        const scale = 3;
        const style = {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${node.offsetWidth}px`,
            height: `${node.offsetHeight}px`
        };

        const param = {
            width: node.offsetWidth * scale,
            height: node.offsetHeight * scale,
            style: style
        };

        domtoimage.toPng(node, param)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${cropName}'s Yield Production - Histogram [${location}]`;
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error('Failed to generate image:', error);
            });
    };

    document.getElementById("top-histogram-download")
        ?.addEventListener("click", () => downloadHistogram('top-histogram-container', 'top-crop-label'));

    document.getElementById("second-histogram-download")
        ?.addEventListener("click", () => downloadHistogram('second-histogram-container', 'second-crop-label'));

    document.getElementById("third-histogram-download")
        ?.addEventListener("click", () => downloadHistogram('third-histogram-container', 'third-crop-label'));
});
