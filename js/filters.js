import {priceValue} from './limits.js';
import {MAX_ADS, DEFAULT_VALUE_FILTER, RENDER_DELAY} from './data.js';
import {getData} from './server.js';
import {markerGroup, createMarkers} from './map.js';
import {debounce} from './debounce.js';

const filtersForm = document.querySelector('.map__filters');

const checkType = (ad) => {
  const housingTypeInput = filtersForm.querySelector('#housing-type');
  return ad.offer.type === housingTypeInput.value || DEFAULT_VALUE_FILTER === housingTypeInput.value;
};

const checkRoom = (ad) => {
  const roomsInput = filtersForm.querySelector('#housing-rooms');
  return Number(ad.offer.rooms) === Number(roomsInput.value) || DEFAULT_VALUE_FILTER === roomsInput.value;
};

const checkPrice = (ad) => {
  const priceInput = filtersForm.querySelector('#housing-price');
  if (priceInput.value.toLowerCase() === priceValue.low.name) {
    return ad.offer.price <= priceValue.low.price;
  }
  if (priceInput.value.toLowerCase() === priceValue.middle.name) {
    return ad.offer.price <= priceValue.middle.price && ad.offer.price > priceValue.low.price;
  }
  if (priceInput.value.toLowerCase() === priceValue.high.name) {
    return ad.offer.price > priceValue.middle.price && ad.offer.price < priceValue.high.price;
  }
  if (priceInput.value.toLowerCase() === DEFAULT_VALUE_FILTER) {
    return true;
  }
};

const checkGuests = (ad) => {
  const guestsInput = filtersForm.querySelector('#housing-guests');
  return Number(ad.offer.guests) === Number(guestsInput.value) || guestsInput.value === DEFAULT_VALUE_FILTER;
};

const checkFeatures = (ad) => {
  const checkedCheckboxes = document.querySelector('#housing-features').querySelectorAll('[name="features"]:checked');
  const listCheckedBoxes = [];

  checkedCheckboxes.forEach(
    (checkbox) => {
      listCheckedBoxes.push(checkbox.value);
    }
  );

  if (ad.offer.features){
    const result = listCheckedBoxes.every((element) => ad.offer.features.includes(element));
    return result;
  }
};

const getFilter = () => {
  markerGroup.clearLayers();
  getData((ads) => {
    ads.slice()
      .filter(checkType)
      .filter(checkRoom)
      .filter(checkPrice)
      .filter(checkGuests)
      .filter(checkFeatures)
      .slice(0, MAX_ADS).forEach(
        (ad) => {
          createMarkers(ad);
        }
      );
  });
  markerGroup.clearLayers();
};

filtersForm.addEventListener('change', debounce(
  () => getFilter(),
  RENDER_DELAY)
);
