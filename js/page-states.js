'use strict';

(function () {
  // Блокировка страницы
  window.pageStates = {
    deactivatePage: function () {
      setDefaultPageState();
      window.form.setDefaultMainPinPosition();
      window.card.removeAdCard();
      window.reset.clearForm();

      var ads = window.util.map.querySelectorAll('button[type=button]');
      ads.forEach(window.util.removeChild);
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

  var activateElement = function (item, elements, removableClass) {
    elements.forEach(makeEnabled);
    item.classList.remove(removableClass);
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

  var activatePage = function () {
    activateElement(window.util.map, mapFilters, 'map--faded');
    activateElement(window.util.adForm, adFormFieldsets, 'ad-form--disabled');

    window.backend.load(window.map.addPins);
    window.form.changeAddressFieldValue();
    mainPinRemoveHandlers();
  };

  setDefaultPageState();
})();
