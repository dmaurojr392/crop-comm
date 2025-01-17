// Sample data (raw data points)
const rawData = [5, 12, 18, 22, 27, 35, 42, 48, 52, 60, 61, 70, 75, 80, 85, 90, 95, 100];

// Number of bins
const numBins = 10;

// Calculate min and max of the data
const min = Math.min(...rawData);
const max = Math.max(...rawData);

// Bin width
const binWidth = (max - min) / numBins;

// Create bins and initialize frequencies
const bins = Array.from({ length: numBins }, (_, i) => `${Math.floor(min + i * binWidth)}-${Math.floor(min + (i + 1) * binWidth)}`);
const frequencies = new Array(numBins).fill(0);

// Populate frequencies
rawData.forEach(value => {
    const binIndex = Math.min(Math.floor((value - min) / binWidth), numBins - 1); // Ensure the max value is included in the last bin
    frequencies[binIndex]++;
});

// Generate pastel colors dynamically
const pastelColors = bins.map(() => `hsla(${Math.random() * 360}, 70%, 80%, 0.8)`);

// Create the chart
const ctx = document.getElementById('histogramChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: bins, // Dynamic bins
        datasets: [{
            label: 'Frequency',
            data: frequencies, // Dynamic frequencies
            backgroundColor: pastelColors,
            borderColor: pastelColors.map(color => color.replace('0.8', '1')), // Adjust border opacity
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Value Ranges'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Frequency'
                },
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false // Hides the legend for a cleaner histogram
            }
        }
    }
});