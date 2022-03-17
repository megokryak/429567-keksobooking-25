import {createAd, ads} from './create-ad.js';
import {MAX_ADS} from './data.js';
createAd(MAX_ADS);

const adsTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const adsListElement = document.querySelector(`#map-canvas`);

ads.forEach(
  (element) => {
    const adsElement = adsTemplate.cloneNode(true);
    adsElement.querySelector(`.popup__title`).textContent = element.offer.title;
    adsElement.querySelector(`.popup__text--address`).textContent = element.offer.address;
    adsElement.querySelector(`.popup__text--price`).textContent = element.offer.price + " ₽/ночь";
    adsListElement.append(adsElement);
    const popupFeaturesList = adsElement.querySelectorAll(`.popup__feature`);
    popupFeaturesList.forEach(
      (popupFeaturesItem) => {
        const isNecessary = element.offer.features.some(
          (userFeature) => {
            console.log(popupFeaturesItem.classList);
            console.log(`popup__feature--` + userFeature);
            popupFeaturesItem.classList.contains(`popup__feature--` + userFeature);
          }
        );
        console.log(isNecessary);

        if (!isNecessary) {
          popupFeaturesItem.remove();
        }
      }
    );
  }
);
