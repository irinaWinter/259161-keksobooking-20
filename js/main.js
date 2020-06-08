'use strict';

var ADS_NUMBER = 8;
var OBJECTS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = [12, 13, 14];
var CHECKOUT_TIME = [12, 13, 14];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COORD_Y_TOP = 130;
var COORD_Y_BOTTOM = 630;

var avatarIndex = 1;

var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var generateRandomData = function (data) {
  return data[generateRandomNumber(0, data.length - 1)];
};

var generateRandomArray = function (data) {
  var arr = [];
  data.forEach(function (item) {
    if (generateRandomNumber(0, 1)) {
      arr.push(item);
    }
  });

  if (!arr.length) {
    arr.push(data[(generateRandomNumber(0, data.length - 1))]);
  }

  return arr;
};

var map = document.querySelector('.map');

var generateAd = function () {
  return {
    'autor': {
      'avatar': 'img/avatars/user0' + avatarIndex + '.png'
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': '600, 350',
      'price': 5000,
      'type': generateRandomData(OBJECTS_TYPES),
      'rooms': 3,
      'guests': 3,
      'checkin': generateRandomData(CHECKIN_TIME) + ':00',
      'checkout': generateRandomData(CHECKOUT_TIME) + ':00',
      'features': generateRandomArray(FEATURES),
      'description': 'Описание',
      'photos': generateRandomArray(PHOTOS),
      'location': {
        'x': generateRandomNumber(0, map.offsetWidth),
        'y': generateRandomNumber(COORD_Y_TOP, COORD_Y_BOTTOM)
      }
    }
  };
};

var ads = [];

var generateArray = function (arr, data, length) {
  if (length === 0) {
    return arr;
  } else {
    arr.push(data());
    avatarIndex++;
    return generateArray(arr, data, length - 1);
  }
};

generateArray(ads, generateAd, ADS_NUMBER);

map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pinsList = document.querySelector('.map__pins');
var mapPin = pinsList.querySelector('.map__pin');

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (ad.offer.location.x - mapPin.offsetWidth / 2) + 'px; top: ' + (ad.offer.location.y + mapPin.offsetHeight) + 'px;';
  pinImg.src = ad.autor.avatar;
  pinImg.alt = ad.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

var addPin = function (ad) {
  fragment.appendChild(renderPin(ad));
};

ads.forEach(addPin);
pinsList.appendChild(fragment);
