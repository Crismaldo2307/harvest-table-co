const mapContainer = document.getElementById('map');
if (mapContainer && typeof L !== 'undefined') {
  const map = L.map('map', {
    scrollWheelZoom: false,
    attributionControl: true
  }).setView([41.3851, 2.1734], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> colaboradores'
  }).addTo(map);

  const districts = [
    { name: 'Ciutat Vella', coords: [41.3809, 2.1730], rent: '1.250 €' },
    { name: 'Eixample', coords: [41.3931, 2.1633], rent: '1.400 €' },
    { name: 'Gràcia', coords: [41.4025, 2.1564], rent: '1.200 €' },
    { name: 'Sant Martí', coords: [41.4098, 2.1999], rent: '1.320 €' },
    { name: 'Sants-Montjuïc', coords: [41.3735, 2.1490], rent: '1.150 €' }
  ];

  districts.forEach(district => {
    const marker = L.marker(district.coords).addTo(map);
    marker.bindTooltip(`${district.name} – Renta media: ${district.rent}`, {
      direction: 'top',
      offset: [0, -12]
    });
  });
}
