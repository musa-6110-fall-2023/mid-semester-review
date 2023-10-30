import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';

const stationInfoResp = await fetch('https://gbfs.bcycle.com/bcycle_indego/station_information.json');
const stationInfo = await stationInfoResp.json();

const events = new EventTarget();

initializeMap(stationInfo, events);
initializeList(stationInfo, events);
initializeSearch(stationInfo, events);