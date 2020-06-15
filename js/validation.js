'use strict';

var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;
var NOT_FOR_GUESTS_ROOMS = 100;
var NOT_FOR_GUESTS = 0;

var adForm = document.querySelector('.ad-form');

// Валидация поля "Цена за ночь"
var type = adForm.querySelector('select[name=type]');

var gettypeValue = function () {
  return type.value;
};

var price = adForm.querySelector('input[name=price]');

var changeMinPrice = function () {
  var typeValue = gettypeValue();

  switch (typeValue) {
    case 'bungalo':
      price.min = BUNGALO_MIN_PRICE;
      price.placeholder = BUNGALO_MIN_PRICE;
      break;
    case 'flat':
      price.min = FLAT_MIN_PRICE;
      price.placeholder = FLAT_MIN_PRICE;
      break;
    case 'house':
      price.min = HOUSE_MIN_PRICE;
      price.placeholder = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      price.min = PALACE_MIN_PRICE;
      price.placeholder = PALACE_MIN_PRICE;
      break;
  }
};

var typeChanngeHandler = function () {
  changeMinPrice();
};

changeMinPrice();

type.addEventListener('change', typeChanngeHandler);

// Валидация поля "Время заезда и выезда"
var checkinTime = adForm.querySelector('select[name=timein]');
var checkoutTime = adForm.querySelector('select[name=timeout]');

var synchronizeTime = function (changeableField, synchronizableField) {
  synchronizableField.value = changeableField.value;
};

var checkinTimeChangeHandler = function () {
  synchronizeTime(checkinTime, checkoutTime);
};

var checkoutTimeChangeHandler = function () {
  synchronizeTime(checkoutTime, checkinTime);
};

checkinTime.addEventListener('change', checkinTimeChangeHandler);
checkoutTime.addEventListener('change', checkoutTimeChangeHandler);

// Валидация поля "Количество мест"
var rooms = adForm.querySelector('select[name=rooms]');
var capacity = adForm.querySelector('select[name=capacity]');

var limitChoiceOfCapacityOptions = function (item) {
  if ((+item.value > +rooms.value ||
    !+item.value &&
    +rooms.value !== NOT_FOR_GUESTS_ROOMS)
    ||
    (+rooms.value === NOT_FOR_GUESTS_ROOMS &&
    +item.value !== NOT_FOR_GUESTS)) {
    item.disabled = true;
  } else {
    item.disabled = false;
  }
};

var verifyValidityOfCapacityValue = function () {
  if (typeof capacity[capacity['selectedIndex']].getAttribute('disabled') !== 'object') {
    capacity.setCustomValidity('Выберите значение из доступных');
  } else {
    capacity.setCustomValidity('');
  }
};

var verifyValidityOfCapacityField = function () {
  var capacityOptions = capacity.querySelectorAll('option');
  capacityOptions.forEach(limitChoiceOfCapacityOptions);
  verifyValidityOfCapacityValue();
};

var capacityChangeHandler = function () {
  verifyValidityOfCapacityField();
};

var roomsChangeHandler = function () {
  verifyValidityOfCapacityField();
};

verifyValidityOfCapacityField();

capacity.addEventListener('change', capacityChangeHandler);
rooms.addEventListener('change', roomsChangeHandler);
