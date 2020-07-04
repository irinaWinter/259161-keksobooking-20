'use strict';

(function () {
  var NOT_FOR_GUESTS_ROOMS = 100;
  var NOT_FOR_GUESTS = 0;
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var DefaultCoord = {
    X: 570,
    Y: 375
  };

  window.form = {
    title: window.util.adForm.querySelector('input[name=title]'),
    price: window.util.adForm.querySelector('input[name=price]'),
    type: window.util.adForm.querySelector('select[name=type]'),
    submitButton: window.util.adForm.querySelector('button[type=submit]'),
    changeAddressFieldValue: function () {
      window.form.setAddressFieldValue(getTipCoordinates(window.util.mainPin, window.util.MainPin.WIDTH, window.util.MainPin.HEIGHT));
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
          setPrice(MinPrice.BUNGALO);
          break;
        case 'flat':
          setPrice(MinPrice.FLAT);
          break;
        case 'house':
          setPrice(MinPrice.HOUSE);
          break;
        case 'palace':
          setPrice(MinPrice.PALACE);
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
      window.util.mainPin.style.left = DefaultCoord.X + 'px';
      window.util.mainPin.style.top = DefaultCoord.Y + 'px';
    }
  };

  var getTipCoordinates = function (pin, width, height) {
    return (parseInt(pin.style.left, 10) + width / 2) + ', ' + (parseInt(pin.style.top, 10) + height);
  };

  var addressField = window.util.adForm.querySelector('input[name=address]');

  // Валидация поля "Цена за ночь"
  var getTypeValue = function () {
    return window.form.type.value;
  };

  var setPrice = function (newPrice) {
    window.form.price.min = newPrice;
    window.form.price.placeholder = newPrice;
    window.form.price.value = newPrice;
  };

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

  var roomsChangeHandler = function () {
    window.form.verifyValidityOfCapacityField();
  };

  window.form.rooms.addEventListener('change', roomsChangeHandler);

  // Сброс формы
  var resetForm = function () {
    window.pageStates.deactivatePage();

    window.validation.returnDefaultFieldStyle(window.form.title);
    window.validation.returnDefaultFieldStyle(window.form.price);

    window.preview.setDefaultAvatarPreview();
    window.preview.setDefaultImgPreview();
  };

  var resetButtonClickHandler = function (evt) {
    if (evt.buttons === 1) {
      resetForm();
    }
  };

  var resetButtonKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      resetForm();
    }
  };

  var resetButton = window.util.adForm.querySelector('button[type=reset]');
  resetButton.addEventListener('mousedown', resetButtonClickHandler);
  resetButton.addEventListener('keyup', resetButtonKeydownHandler);
})();
