import {createAd, ads} from './create-ad.js';
import {MAX_ADS} from './data.js';
createAd(MAX_ADS);

const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
const adsListElement = document.querySelector('#map-canvas');

ads.forEach(
  (element) => {
    const adsElement = adsTemplate.cloneNode(true);
    if (element.offer.title === ''){
      adsElement.querySelector('.popup__title').classList.add('hide');
    }
    else {
      adsElement.querySelector('.popup__title').textContent = element.offer.title;
    }
    if (element.offer.address === '') {
      adsElement.querySelector('.popup__text--address').classList.add('hide');
    }
    else {
      adsElement.querySelector('.popup__text--address').textContent = element.offer.address;
    }
    if (element.offer.price === '') {
      adsElement.querySelector('.popup__text--price').classList.add('hide');
    }
    else {
      adsElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
    }

    const popupFeaturesList = adsElement.querySelectorAll('.popup__feature');
    if (element.offer.features.length > 0) {
      popupFeaturesList.forEach(
        (popupFeaturesItem) => {
          const isNecessary = element.offer.features.some(
            (userFeature) => popupFeaturesItem.classList.contains(`popup__feature--${userFeature}`),
          );

          if (!isNecessary) {
            popupFeaturesItem.remove();
          }
        }
      );
    }
    else {
      popupFeaturesList.classList.add('hdie');
    }
    if (element.offer.type.length > 0) {
      let typeAds;
      switch (element.offer.type) {
        case 'flat':
          typeAds = 'Квартира';
          break;
        case 'bungalow':
          typeAds = 'Бунгало';
          break;
        case 'house':
          typeAds = 'Дом';
          break;
        case 'palace':
          typeAds = 'Дворец';
          break;
        case 'hotel':
          typeAds = 'Отель';
          break;
      }
      adsElement.querySelector('.popup__type').textContent = typeAds;
    }
    else {
      adsElement.querySelector('.popup__type').classList.add('hdie');
    }
    if (element.offer.rooms === 0 || element.offer.rooms === '' || element.offer.guests === 0 || element.offer.guests === '') {
      adsElement.querySelector('.popup__text--capacity').classList.add('hide');
    }
    else {
      let countRooms;
      let countGuests;
      switch (element.offer.rooms) {
        case 1:
          countRooms = `${element.offer.rooms} комната для `;
          break;
        case 2:
          countRooms = `${element.offer.rooms} комнаты для `;
          break;
        default:
          countRooms = `${element.offer.rooms} комнат для `;
          break;
      }
      switch (element.offer.guests) {
        case 1:
          countGuests = `${element.offer.guests} гостя`;
          break;
        default:
          countGuests = `${element.offer.guests} гостей`;
          break;
      }
      adsElement.querySelector('.popup__text--capacity').textContent = countRooms + countGuests;
    }

    if (element.offer.checkin === '' || element.offer.checkout === '') {
      adsElement.querySelector('.popup__text--time').classList.add('hide');
    }
    else {
      adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin} , выезд до ${element.offer.checkout}`;
    }
    if (element.offer.description === '') {
      adsElement.querySelector('.popup__description').classList.add('hide');
    }
    else {
      adsElement.querySelector('.popup__description').textContent = element.offer.description;
    }

    const imgListElement = adsElement.querySelector('.popup__photos');
    if (element.offer.type.length > 0) {
      const imgItemFragmet = document.createDocumentFragment();
      element.offer.photos.forEach((imgElementSrc) => {
        const imgListItem = document.createElement('img');
        imgListItem.classList.add('popup__photo');
        imgListItem.width = 45;
        imgListItem.height = 40;
        imgListItem.alt = 'Фотография жилья';
        imgListItem.src = imgElementSrc;
        imgItemFragmet.append(imgListItem);
      });
      imgListElement.innerHTML = '';
      imgListElement.append(imgItemFragmet);
    }
    else {
      imgListElement.classList.add('hide');
    }


    adsListElement.append(adsElement);
  }
);
