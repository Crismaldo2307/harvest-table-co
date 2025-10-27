const barCanvas = document.getElementById('rentBarChart');
const lineCanvas = document.getElementById('correlationLineChart');

if (barCanvas && lineCanvas && typeof Chart !== 'undefined') {
  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  const rentData = [950, 990, 1020, 1090, 1175, 1250, 1325];

  const barChart = new Chart(barCanvas, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Renta promedio (€)',
        data: rentData,
        backgroundColor: 'rgba(112, 130, 56, 0.7)',
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(90, 106, 45, 0.85)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: '€ por mes'
          }
        }
      },
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          backgroundColor: '#222',
          titleColor: '#fff',
          bodyColor: '#fff'
        }
      }
    }
  });

  const lineChart = new Chart(lineCanvas, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Renta promedio (€)',
          data: rentData,
          borderColor: '#708238',
          backgroundColor: 'rgba(112, 130, 56, 0.15)',
          tension: 0.35,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Índice turístico (base 100)',
          data: [100, 108, 85, 70, 105, 122, 136],
          borderColor: '#2a3c24',
          backgroundColor: 'rgba(34, 34, 34, 0.08)',
          tension: 0.35,
          fill: false,
          yAxisID: 'y1'
        },
        {
          label: 'Actividad comercial (base 100)',
          data: [95, 97, 90, 93, 110, 118, 127],
          borderColor: '#44512d',
          backgroundColor: 'rgba(68, 81, 45, 0.2)',
          tension: 0.35,
          fill: false,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      stacked: false,
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Renta (€)'
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: 'Índice base 100'
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          backgroundColor: '#222',
          titleColor: '#fff',
          bodyColor: '#fff'
        }
      }
    }
  });

  const toggleRent = document.getElementById('toggleRent');
  const toggleTourism = document.getElementById('toggleTourism');
  const toggleCommerce = document.getElementById('toggleCommerce');

  const updateDatasets = () => {
    if (!lineChart) return;
    lineChart.data.datasets[0].hidden = !toggleRent.checked;
    lineChart.data.datasets[1].hidden = !toggleTourism.checked;
    lineChart.data.datasets[2].hidden = !toggleCommerce.checked;
    lineChart.update();
  };

  [toggleRent, toggleTourism, toggleCommerce].forEach(toggle => {
    if (toggle) {
      toggle.addEventListener('change', updateDatasets);
    }
  });
}
