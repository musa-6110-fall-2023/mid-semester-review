function initializeMap(stationInfo, events) {
  const map = L.map('map').setView([39.95, -75.16], 12);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v12',
    accessToken: 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA',
  }).addTo(map);

  const stationsLayer = L.layerGroup();
  stationsLayer.addTo(map);

  updateMapStations(stationInfo.data.stations, stationsLayer);

  events.addEventListener('filter-stations', (evt) => {
    const filteredStations = evt.detail.filteredStations;
    updateMapStations(filteredStations, stationsLayer);
  });

  return map;
}

function updateMapStations(stations, stationsLayer) {
  stationsLayer.clearLayers();
  console.log(`Adding ${stations.length} stations to the map.`);

  const stationIcon = L.icon({
    iconUrl: 'images/station-marker.png',
    iconSize: [22, 31.5], // size of the icon
    iconAnchor: [11, 31.5], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  });

  for (const station of stations) {
    const marker = L.marker([station.lat, station.lon], {
      alt: station.name,
      icon: stationIcon,
    });
    marker.bindTooltip(station.name);
    marker.bindPopup(`
      <h2 class="station-name">${station.name}</h2>
      <p class="station-address">${station.address}</p>
    `);
    marker.addTo(stationsLayer);
  }
}

export {
  initializeMap,
};
