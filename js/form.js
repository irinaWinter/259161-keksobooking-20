'use strict';

(function () {
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var NOT_FOR_GUESTS_ROOMS = 100;
  var NOT_FOR_GUESTS = 0;
  var DEFAULT_COORD_X = 570;
  var DEFAULT_COORD_Y = 375;

  window.form = {
    title: window.util.adForm.querySelector('input[name=title]'),
    price: window.util.adForm.querySelector('input[name=price]'),
    type: window.util.adForm.querySelector('select[name=type]'),
    changeAddressFieldValue: function () {
      window.form.setAddressFieldValue(getTipCoordinates(window.util.mainPin, window.util.MAIN_PIN_WIDTH, window.util.MAIN_PIN_HEIGHT));
    },
    getCenterCoordinates: function (pin, size) {
      return (parseInt(pin.style.left, 10) + size / 2) + ', ' + (parseInt(pin.style.top, 10) + size / 2);
    },
    setAddressFieldValue: function (coordinates) {
      addressField.value = coordinates;
    },
    changeMinPrice: function () {
      var typeValue = getTypeValue();

      switch (typeValue) {
        case 'bungalo':
          setPrice(BUNGALO_MIN_PRICE);
          break;
        case 'flat':
          setPrice(FLAT_MIN_PRICE);
          break;
        case 'house':
          setPrice(HOUSE_MIN_PRICE);
          break;
        case 'palace':
          setPrice(PALACE_MIN_PRICE);
          break;
      }
    },
    checkinTime: window.util.adForm.querySelector('select[name=timein]'),
    checkoutTime: window.util.adForm.querySelector('select[name=timeout]'),
    synchronizeTime: function (changeableField, synchronizableField) {
      synchronizableField.value = changeableField.value;
    },
    rooms: window.util.adForm.querySelector('select[name=rooms]'),
    verifyValidityOfCapacityField: function () {
      var capacityOptions = capacity.querySelectorAll('option');
      capacityOptions.forEach(limitChoiceOfCapacityOptions);
    },
    setDefaultMainPinPosition: function () {
      window.util.mainPin.style.left = DEFAULT_COORD_X + 'px';
      window.util.mainPin.style.top = DEFAULT_COORD_Y + 'px';
    }
  };

  var getTipCoordinates = function (pin, width, height) {
    return (parseInt(pin.style.left, 10) + width / 2) + ', ' + (parseInt(pin.style.top, 10) + height);
  };

  // Заполнение поля "Адрес"
  var addressField = window.util.adForm.querySelector('input[name=address]');

  window.form.setAddressFieldValue(window.form.getCenterCoordinates(window.util.mainPin, window.util.MAIN_PIN_WIDTH));

  // Валидация поля "Цена за ночь"
  var getTypeValue = function () {
    return window.form.type.value;
  };

  var setPrice = function (newPrice) {
    window.form.price.min = newPrice;
    window.form.price.placeholder = newPrice;
    window.form.price.value = newPrice;
  };

  window.form.changeMinPrice();

  var typeChanngeHandler = function () {
    window.form.changeMinPrice();
  };

  window.form.type.addEventListener('change', typeChanngeHandler);

  // Валидация поля "Время заезда и выезда"
  var checkinTimeChangeHandler = function () {
    window.form.synchronizeTime(window.form.checkinTime, window.form.checkoutTime);
  };

  var checkoutTimeChangeHandler = function () {
    window.form.synchronizeTime(window.form.checkoutTime, window.form.checkinTime);
  };

  window.form.checkinTime.addEventListener('change', checkinTimeChangeHandler);
  window.form.checkoutTime.addEventListener('change', checkoutTimeChangeHandler);

  // Валидация поля "Количество мест"
  var limitChoiceOfCapacityOptions = function (item) {
    if ((+item.value > +window.form.rooms.value
      || !+item.value
      && +window.form.rooms.value !== NOT_FOR_GUESTS_ROOMS)
      ||
      (+window.form.rooms.value === NOT_FOR_GUESTS_ROOMS
      && +item.value !== NOT_FOR_GUESTS)) {
      item.disabled = true;
      item.selected = false;
    } else if (+window.form.rooms.value === NOT_FOR_GUESTS_ROOMS
      && +item.value === NOT_FOR_GUESTS) {
      item.disabled = false;
      item.selected = true;
    } else {
      item.disabled = false;
    }
  };

  var capacity = window.util.adForm.querySelector('select[name=capacity]');

  window.form.verifyValidityOfCapacityField();

  var roomsChangeHandler = function () {
    window.form.verifyValidityOfCapacityField();
  };

  window.form.rooms.addEventListener('change', roomsChangeHandler);

  // Сброс формы
  var resetButton = window.util.adForm.querySelector('button[type=reset]');

  var resetButtonClickHandler = function () {
    window.pageStates.deactivatePage();
    window.util.filters.reset();
  };

  resetButton.addEventListener('click', resetButtonClickHandler);
})();
