import {apartmentsSettings} from './limits.js';
import {getRoomsDeclension, getGuestsDeclension} from './get-declension.js';

const adsTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateAds = (ad) => {
  const adsContainer = adsTemplate.cloneNode(true);
  adsContainer.querySelector('.popup__title').textContent = ad.offer.title;
  adsContainer.querySelector('.popup__text--address').textContent = ad.offer.address;
  adsContainer.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;

  const popupListFeatures = adsContainer.querySelectorAll('.popup__feature');
  if (ad.offer.features) {
    popupListFeatures.forEach(
      (popupFeaturesItem) => {
        const isNecessary = ad.offer.features.some(
          (userFeature) => popupFeaturesItem.classList.contains(`popup__feature--${userFeature}`),
        );

        if (!isNecessary) {
          popupFeaturesItem.remove();
        }
      }
    );
  }
  else {
    popupListFeatures.forEach(
      (popupFeaturesItem) => {
        popupFeaturesItem.classList.add('hide');
      }
    );
  }
  if (ad.offer.type.length > 0) {
    adsContainer.querySelector('.popup__type').textContent = apartmentsSettings[ad.offer.type.toLowerCase()].name;
  }
  else {
    adsContainer.querySelector('.popup__type').classList.add('hide');
  }
  if (ad.offer.rooms === 0 || ad.offer.rooms === '' || ad.offer.guests === 0 || ad.offer.guests === '') {
    adsContainer.querySelector('.popup__text--capacity').classList.add('hide');
  }
  else {
    adsContainer.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} ${getRoomsDeclension(ad.offer.rooms)} для ${ad.offer.rooms} ${getGuestsDeclension(ad.offer.rooms)}`;
  }

  if (ad.offer.checkin === '' || ad.offer.checkout === '') {
    adsContainer.querySelector('.popup__text--time').classList.add('hide');
  }
  else {
    adsContainer.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin} , выезд до ${ad.offer.checkout}`;
  }
  if (ad.offer.description === '') {
    adsContainer.querySelector('.popup__description').classList.add('hide');
  }
  else {
    adsContainer.querySelector('.popup__description').textContent = ad.offer.description;
  }

  const imgListElement = adsContainer.querySelector('.popup__photos');
  if (ad.offer.type.length > 0 && ad.offer.photos !== undefined) {
    const imgItemFragmet = document.createDocumentFragment();
    ad.offer.photos.forEach((imgElementSrc) => {
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
  return adsContainer;
};

export {generateAds};
