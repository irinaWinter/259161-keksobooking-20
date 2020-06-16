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

var setPrice = function (newPrice) {
  price.min = newPrice;
  price.placeholder = newPrice;
  price.value = newPrice;
};

var changeMinPrice = function () {
  var typeValue = gettypeValue();

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
  if ((+item.value > +rooms.value
    || !+item.value
    && +rooms.value !== NOT_FOR_GUESTS_ROOMS)
    ||
    (+rooms.value === NOT_FOR_GUESTS_ROOMS
    && +item.value !== NOT_FOR_GUESTS)) {
    item.disabled = true;
    item.selected = false;
  } else if (+rooms.value === NOT_FOR_GUESTS_ROOMS
    && +item.value === NOT_FOR_GUESTS) {
    item.selected = true;
  } else {
    item.disabled = false;
  }
};

var verifyValidityOfCapacityField = function () {
  var capacityOptions = capacity.querySelectorAll('option');
  capacityOptions.forEach(limitChoiceOfCapacityOptions);
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
