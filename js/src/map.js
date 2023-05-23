/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { renderCard } from './utils.js';

const INITIAL_COORDS = {
  lat: 49.678323049774,
  lng: 72.68178662327088,
};
const MAP_ZOOM = 10;
const AD_ICON_SIZE = [80, 80];
const AD_ICON_ANCHOR = [20, 40];

// TODO: Заменить на полноценные данные.
const karlag = {
  location: INITIAL_COORDS,
  title: 'Карлаг',
  region: 'Карагандинская область',
  opened: '1931 г.',
  closed: '1959 г.',
  link: 'https://lib.memo.ru/rubric/957',
};

const map = L.map('map-canvas');

const addMarkersGroup = L.layerGroup().addTo(map);
const adMarkerIcon = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: AD_ICON_SIZE,
  iconAnchor: AD_ICON_ANCHOR,
});

const createCardMarker = (data) => {
  const { lat, lng } = data.location;

  const adMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      adMarkerIcon,
    },
  );

  adMarker
    .addTo(addMarkersGroup)
    .bindPopup(
      renderCard(data),
      {
        keepInView: true,
      },
    );
};

const loadMap = () => {
  map.on('load').setView(INITIAL_COORDS, MAP_ZOOM);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

createCardMarker(karlag);

export default loadMap;
