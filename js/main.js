import { initializeMap } from './map.js';

const stationInfoResp = await fetch('https://gbfs.bcycle.com/bcycle_indego/station_information.json');
const stationInfo = await stationInfoResp.json();

initializeMap(stationInfo);
