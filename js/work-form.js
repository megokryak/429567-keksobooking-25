import {isEscapeKey} from './util.js';
import {MAX_GUEST, MIN_ROOM} from './data.js';
import {ApartmentType} from './enum.js';

const form = document.querySelector('.ad-form');
const formFiledset = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');

const roomSelect = form.querySelector('#room_number');
const guestSelect = form.querySelector('#capacity');

const errorMessage = document.querySelector('#error');
const errorElement = errorMessage.content.querySelector('.error').cloneNode(true);

const selectTypeAppartment = document.querySelector('#type');
const typePrice = document.querySelector('#price');

const timeIn  = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formFiledset.forEach(
    (element) => {
      element.disabled = 'disabled';
    }
  );
  form.querySelector('.ad-form__slider').classList.add('ad-form__slider--disabled');

  mapFilters.classList.add('map__filters--disabled');
  mapSelects.forEach(
    (element) => {
      element.disabled = 'disabled';
    }
  );
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formFiledset.forEach(
    (element) => {
      element.disabled = false;
    }
  );

  form.querySelector('.ad-form__slider').classList.remove('ad-form__slider--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapSelects.forEach(
    (element) => {
      element.disabled = false;
    }
  );
};

const checkRoomsAndGuests = () => {
  const optionRoomsSelect = Number(roomSelect.options[roomSelect.selectedIndex].value);
  const optionGuestsSelect = Number(guestSelect.options[guestSelect.selectedIndex].value);
  if (Number(optionGuestsSelect) > Number(optionRoomsSelect) && Number(optionGuestsSelect) !== MAX_GUEST && Number(optionRoomsSelect) !== MIN_ROOM) {
    return 'Количество гостей не может быть больше чем количество комнат';
  }
  if (Number(optionGuestsSelect) === MIN_ROOM) {
    return 'Необходим хотя бы 1 гость';
  }
  if (Number(optionRoomsSelect) === MAX_GUEST) {
    return 'Данный тип не предназначен для гостей';
  }
  return false;
};

const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

function closeErrorMessage () {
  errorElement.remove();

  document.removeEventListener('keydown', onEscKeydown);
}


const showErrorMessage = (message) => {
  errorElement.querySelector('.error__message').textContent = message;
  document.querySelector('body').append(errorElement);

  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });

  document.addEventListener('keydown', closeErrorMessage);
};

form.addEventListener('submit', (evt) => {
  const message = checkRoomsAndGuests();
  if (message) {
    evt.preventDefault();
    showErrorMessage(message);
  }
});

const changePlaceHolder = (evt) => {
  typePrice.placeholder = ApartmentType[selectTypeAppartment.options[evt.target.options.selectedIndex].value.toUpperCase()].MIN_PRICE;
};

selectTypeAppartment.addEventListener('change', changePlaceHolder);

const changeTimeOut = (evt) => {
  const selectElement = timeIn.options[evt.target.options.selectedIndex].value;
  for (let i =0; i < timeOut.options.length; i++) {
    if (timeOut.options[i].value === selectElement) {
      timeOut.options[i].selected = 'selected';
    }
  }
};

const changeTimeIn = (evt) => {
  const selectElement = timeOut.options[evt.target.options.selectedIndex].value;
  for (let i =0; i < timeIn.options.length; i++) {
    if (timeIn.options[i].value === selectElement) {
      timeIn.options[i].selected = 'selected';
    }
  }
};

timeIn.addEventListener('change', changeTimeOut);

timeOut.addEventListener('change', changeTimeIn);

export {disableForm, enableForm};
