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
    window.backend.load(window.map.addPins);
    window.form.setAddressFieldValue();
    mainPinRemoveHandlers();
  };

  var mainPinRemoveHandlers = function () {
    window.util.mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    window.util.mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var mainPinKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  window.util.mainPin.addEventListener('mousedown', mainPinClickHandler);
  window.util.mainPin.addEventListener('keydown', mainPinKeydownHandler);
})();
