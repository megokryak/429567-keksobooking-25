import {createAd, ads} from './create-ad.js';
import {MAX_ADS} from './data.js';
import {apartmentsSettings} from './enum.js';
import {getRoomsDeclension, getGuestsDeclension} from './get-declension.js';
createAd(MAX_ADS);

const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
const adsListElement = document.querySelector('#map-canvas');

ads.forEach(
  (element) => {
    const adsElement = adsTemplate.cloneNode(true);
    adsElement.querySelector('.popup__title').textContent = element.offer.title;
    adsElement.querySelector('.popup__text--address').textContent = element.offer.address;
    adsElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;

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
    else { // Не стал добавлять для родителя, малоли поедет верстка
      popupFeaturesList.forEach(
        (popupFeaturesItem) => {
          popupFeaturesItem.classList.add('hide');
        }
      );
    }
    if (element.offer.type.length > 0) {
      adsElement.querySelector('.popup__type').textContent = apartmentsSettings[element.offer.type.toLowerCase()].name;
    }
    else {
      adsElement.querySelector('.popup__type').classList.add('hide');
    }
    if (element.offer.rooms === 0 || element.offer.rooms === '' || element.offer.guests === 0 || element.offer.guests === '') {
      adsElement.querySelector('.popup__text--capacity').classList.add('hide');
    }
    else {
      adsElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} ${getRoomsDeclension(element.offer.rooms)} для ${element.offer.rooms} ${getGuestsDeclension(element.offer.rooms)}`;
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
