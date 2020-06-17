'use strict';

(function () {
  // Блокировка страницы
  var makeDisabled = function (item) {
    item.disabled = true;
  };

  var adFormFieldsets = window.util.adForm.querySelectorAll('fieldset');
  adFormFieldsets.forEach(makeDisabled);

  var mapFilters = window.util.map.querySelectorAll('.map__filters select, .map__filters fieldset');
  mapFilters.forEach(makeDisabled);

  // Активация страницы
  var makeEnabled = function (item) {
    item.disabled = false;
  };

  var activateElement = function (item, elements, removableClass) {
    elements.forEach(makeEnabled);
    item.classList.remove(removableClass);
  };

  var activatePage = function () {
    activateElement(window.util.map, mapFilters, 'map--faded');
    activateElement(window.util.adForm, adFormFieldsets, 'ad-form--disabled');
    window.map.addPins();
    window.form.setAddressFieldValue();
  };

  var mainPin = window.util.map.querySelector('.map__pin--main');

  var mainPinRemoveHandlers = function () {
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
      mainPinRemoveHandlers();
    }
  };

  var mainPinKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      mainPinRemoveHandlers();
    }
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);
})();
