/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { renderCard } from './utils.js';

const INITIAL_COORDS = {
  lat: 49.678323049774,
  lng: 72.68178662327088,
};
const MAP_ZOOM = 10;

const getCampMarkerIcon = (color) => L.icon({
  iconUrl:
      `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// TODO: Заменить на полноценные данные.
const karlag = {
  location: INITIAL_COORDS,
  title: 'Карлаг',
  region: 'Карагандинская область',
  opened: '1931 г.',
  closed: '1959 г.',
  link: 'https://lib.memo.ru/rubric/957',
  markerColor: 'violet',
};

const map = L.map('map-canvas');

const campMarkersGroup = L.layerGroup().addTo(map);

const createCardMarker = async (data) => {
  const campMarker = L.marker(
    data.location,
    {
      icon: getCampMarkerIcon(data.markerColor),
    },
  );

  const response = await fetch('./js/src/kazakhstan.json');
  const kazakhstanMap = await response.json();

  campMarker
    .addTo(campMarkersGroup)
    .bindPopup(
      renderCard(data),
      {
        keepInView: true,
      },
    );

  L.geoJson(kazakhstanMap).addTo(map);
};

const loadMap = () => {
  map.on('load').setView(INITIAL_COORDS, MAP_ZOOM);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

createCardMarker(karlag).catch((error) => console.log(error));

export default loadMap;
