'use strict';

(function () {
  // Блокировка страницы
  window.pageStates = {
    deactivatePage: function () {
      window.util.adForm.reset();
      window.form.changeMinPrice();
      window.form.verifyValidityOfCapacityField();
      window.util.filters.reset();
      setDefaultPageState();

      window.form.setDefaultMainPinPosition();
      window.form.setAddressFieldValue(window.form.getCenterCoordinates(window.util.mainPin, window.util.MAIN_PIN_WIDTH));

      window.card.removeAdCard();
      window.map.pins = window.util.map.querySelectorAll('button[type=button]');
      window.map.pins.forEach(window.util.removeChild);
    }
  };

  var makeDisabled = function (item) {
    item.disabled = true;
  };

  var deactivateElement = function (item, elements, addedClass) {
    elements.forEach(makeDisabled);
    item.classList.add(addedClass);
  };

  var mapFilters = window.util.map.querySelectorAll('.map__filters select, .map__filters fieldset');
  var adFormFieldsets = window.util.adForm.querySelectorAll('fieldset');

  var setDefaultPageState = function () {
    deactivateElement(window.util.map, mapFilters, 'map--faded');
    deactivateElement(window.util.adForm, adFormFieldsets, 'ad-form--disabled');

    window.util.mainPin.addEventListener('mousedown', mainPinClickHandler);
    window.util.mainPin.addEventListener('keydown', mainPinKeydownHandler);
  };

  // Активация страницы
  var makeEnabled = function (item) {
    item.disabled = false;
  };

  var mainPinRemoveHandlers = function () {
    window.util.mainPin.removeEventListener('mousedown', mainPinClickHandler);
    window.util.mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  var mainPinKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var loadHandler = function (data) {
    window.map.ads = data;
    window.map.addPins(window.map.ads);
    mapFilters.forEach(makeEnabled);
  };

  var activatePage = function () {
    window.util.adForm.classList.remove('ad-form--disabled');
    window.util.map.classList.remove('map--faded');
    window.backend.load(loadHandler);
    adFormFieldsets.forEach(makeEnabled);
    window.form.changeAddressFieldValue();
    mainPinRemoveHandlers();
  };

  setDefaultPageState();
})();
