import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';

const stationInfoResp = await fetch('https://gbfs.bcycle.com/bcycle_indego/station_information.json');
const stationInfo = await stationInfoResp.json();

const events = new EventTarget();

const map = initializeMap(stationInfo, events);
initializeList(stationInfo, events);
initializeSearch(stationInfo, events);

function handleGeolocationSuccess(pos) {
  console.log(pos);

  const newEvent = new CustomEvent('geolocated', { detail: pos });
  events.dispatchEvent(newEvent);
}

function handleGeolocationError(err) {
  console.log(err);
}

navigator.geolocation.getCurrentPosition(
  handleGeolocationSuccess,
  handleGeolocationError);

window.map = map;
