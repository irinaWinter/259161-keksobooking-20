'use strict';

(function () {
  var ADS_NUMBER = 8;
  var FILE_PATH = 'img/avatars/user0';
  var FILE_FORMAT = '.png';
  var DEFAULT_TITLE = 'Заголовок предложения';
  var DEFAULT_ADDRESS = '600, 350';
  var DEFAULT_PRICE = 5000;
  var DEFAULT_ROOMS = 3;
  var DEFAULT_GUESTS = 3;
  var OBJECTS_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var CHECKIN_TIME = [12, 13, 14];
  var CHECKOUT_TIME = [12, 13, 14];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DEFAULT_DESCRIPTION = 'Описание';
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomTime = function (time) {
    return window.random.generateRandomData(time) + ':00';
  };

  var getOfferDetails = function () {
    return {
      'title': DEFAULT_TITLE,
      'address': DEFAULT_ADDRESS,
      'price': DEFAULT_PRICE,
      'type': OBJECTS_TYPES[window.random.getRandomProperty(OBJECTS_TYPES)],
      'rooms': DEFAULT_ROOMS,
      'guests': DEFAULT_GUESTS,
      'checkin': getRandomTime(CHECKIN_TIME),
      'checkout': getRandomTime(CHECKOUT_TIME),
      'features': window.random.generateRandomArray(FEATURES),
      'description': DEFAULT_DESCRIPTION,
      'photos': window.random.generateRandomArray(PHOTOS),
      'location': {
        'x': window.random.generateRandomNumber(window.util.COORD_X_LEFT, window.util.COORD_X_RIGHT),
        'y': window.random.generateRandomNumber(window.util.COORD_Y_TOP, window.util.COORD_Y_BOTTOM)
      }
    };
  };

  var avatarIndex = 1;

  var generateAd = function () {
    return {
      'autor': {
        'avatar': FILE_PATH + avatarIndex + FILE_FORMAT
      },
      'offer': getOfferDetails()
    };
  };

  var generateArray = function (arr, data, length) {
    if (length === 0) {
      return arr;
    } else {
      arr.push(data());
      avatarIndex++;
      return generateArray(arr, data, length - 1);
    }
  };

  window.data = {
    ads: generateArray([], generateAd, ADS_NUMBER)
  };
})();
