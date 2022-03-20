const form = document.querySelector('.ad-form');
const formFiledset = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');

const formNoActive = () => {
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

const formActive = () => {
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

export {formNoActive};
export {formActive};
