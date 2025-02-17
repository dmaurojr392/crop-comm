// Inquiries per Month (Bar Chart)
new Chart(document.getElementById("onion-histogram-2023"), {
    type: 'bar',
    data: {
        labels: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021" , "2022", "2023"],
        datasets: [{
            label: "Inquiries",
            data: [142279.44, 115834.57, 61002.63, 115474.37, 105087.21, 135628.51, 141479.26, 117058.83, 124572.86, 129838.86],
            backgroundColor: "#CDAAFD"
        }]
    },
    options: {
        plugins: {
            legend: { display: false }
        }
    }
});

// Inquiry Source Breakdown (Stacked Bar Chart)
new Chart(document.getElementById("squash-histogram-2023"), {
  type: 'bar',
    data: {
        labels: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021" , "2022", "2023"],
        datasets: [{
            label: "Inquiries",
            data: [18762.67, 18895.88, 17812.82, 13206.83, 12709.83, 13938.49, 15732.50, 15002.80, 15699.38, 16879.52],
            backgroundColor: "#FFD28F"
        }]
    },
    options: {
        plugins: {
            legend: { display: false }
        }
    }
});

// Income per Month (Bar Chart)
new Chart(document.getElementById("tomato-histogram-2023"), {
  type: 'bar',
    data: {
        labels: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021" , "2022", "2023"],
        datasets: [{
            label: "Inquiries",
            data: [18762.67, 18895.88, 17812.82, 15125.83, 14774.44, 17639.71, 18391.87, 18351.21, 19891.26, 21173.46],
            backgroundColor: "#FFA3A3"
        }]
    },
    options: {
        plugins: {
            legend: { display: false }
        }
    }
});

// Income Source per Month (Stacked Bar Chart)
new Chart(document.getElementById("crop-summary-2023"), {
  type: 'pie',
  data: {
      labels: ['Onion', 'Squash', 'Tomato'],
      datasets: [{
          data: [129838.86, 16879.52, 21173.46],
          backgroundColor: ['#CDAAFD', '#FFD28F', '#FFA3A3']
      }]
  },
  options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      let value = context.raw.toLocaleString();
                      return `${context.label}: ${value} MT`;
                  }
              }
          }
      }
  }
});