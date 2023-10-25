function initializeSearch(stationInfo, events) {
  const searchBox = document.querySelector('#station-name-filter');
  searchBox.addEventListener('input', (evt) => {
    handleSearchBoxInput(evt, stationInfo, events);
  });
}

function handleSearchBoxInput(evt, stationInfo, events) {
  updateFilteredStations(stationInfo, events);
}

function updateFilteredStations(stationInfo, events) {
  const searchBox = document.querySelector('#station-name-filter');
  const lowercaseValue = searchBox.value.toLowerCase();

  const filteredStations = [];
  for (const station of stationInfo.data.stations) {
    if (station.name.toLowerCase().includes(lowercaseValue)) {
      filteredStations.push(station);
    }
  }

  // const filteredStations = stationInfo.data.stations
  //     .filter((station) => station.name.toLowerCase().includes(lowercaseValue));

  const newEvent = new CustomEvent('filter-stations', { detail: { filteredStations }});
  events.dispatchEvent(newEvent);
}

export {
  initializeSearch,
};
