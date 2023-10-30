function initializeList(stationInfo, events) {
  updateStationList(stationInfo.data.stations, events);

  events.addEventListener('filter-stations', (evt) => {
    const filteredStations = evt.detail.filteredStations;
    updateStationList(filteredStations, events);
  });
}

function updateStationList(stations, events) {
  const stationList = document.querySelector('#station-list');
  let html = '';

  for (const station of stations) {
    html += `
      <li data-station-id=${station.station_id}>${station.name}</li>
    `;
  }
  stationList.innerHTML = html;

  for (const li of stationList.querySelectorAll('li')) {
    li.addEventListener('mouseover', (evt) => {
      const stationId = evt.target.dataset.stationId;
      const newEvent = new CustomEvent('focus-station', {
        detail: { stationId },
      });
      events.dispatchEvent(newEvent);
    });
  }
}

export {
  initializeList,
};
