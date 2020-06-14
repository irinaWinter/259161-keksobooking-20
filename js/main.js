'use strict';

var ADS_NUMBER = 8;
var OBJECTS_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECKIN_TIME = [12, 13, 14];
var CHECKOUT_TIME = [12, 13, 14];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COORD_Y_TOP = 130;
var COORD_Y_BOTTOM = 630;
// var PHOTO_WIDTH = 45;
// var PHOTO_HEIGHT = 40;
// var PHOTO_ALT = 'Фотография жилья';

var makeDisabled = function (item) {
  item.disabled = true;
};

var adForm = document.querySelector('.ad-form');

var adFormFieldsets = adForm.querySelectorAll('fieldset');
adFormFieldsets.forEach(makeDisabled);

var map = document.querySelector('.map');

var mapFilters = map.querySelectorAll('.map__filters select, .map__filters fieldset');
mapFilters.forEach(makeDisabled);

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

var getRandomProperty = function (obj) {
  return Object.keys(obj)[generateRandomNumber(0, Object.keys(obj).length - 1)];
};

var generateAd = function () {
  return {
    'autor': {
      'avatar': 'img/avatars/user0' + avatarIndex + '.png'
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': '600, 350',
      'price': 5000,
      'type': OBJECTS_TYPES[getRandomProperty(OBJECTS_TYPES)],
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

// Отрисовка меток
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

var collectPins = function (adsArray) {
  var fragment = document.createDocumentFragment();

  adsArray.forEach(function (item) {
    fragment.appendChild(renderPin(item));
  });

  return fragment;
};

var addPins = function () {
  pinsList.appendChild(collectPins(ads));
};

// Активация страницы
var makeEnabled = function (item) {
  item.disabled = false;
};

var activateElement = function (item, elements, removableClass) {
  elements.forEach(makeEnabled);
  item.classList.remove(removableClass);
};

var mainPin = map.querySelector('.map__pin--main');
var addressField = adForm.querySelector('input[name=address]');

var setAddressFieldValue = function () {
  addressField.value = (parseInt(mainPin.style.left, 10) - mapPin.offsetWidth / 2) + ', ' + (parseInt(mainPin.style.top, 10) + mapPin.offsetWidth); // Доработать
};

var activatePage = function () {
  activateElement(map, mapFilters, 'map--faded');
  activateElement(adForm, adFormFieldsets, 'ad-form--disabled');
  addPins();
};


var onMainPinClick = function (evt) {
  if (evt.button === 0) {
    activatePage();
    setAddressFieldValue();

    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', onMainPinKeydown);
  }
};

var onMainPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
    setAddressFieldValue();

    mainPin.removeEventListener('keydown', onMainPinKeydown);
    mainPin.removeEventListener('mousedown', onMainPinClick);
  }
};

setAddressFieldValue();

mainPin.addEventListener('mousedown', onMainPinClick);
mainPin.addEventListener('keydown', onMainPinKeydown);

// Заполнение поля адреса

// Отрисовка описания объявления
// var adCardTemplate = document.querySelector('#card')
//   .content
//   .querySelector('.map__card');

// var renderFeature = function (adFeature) {
//   var feature = document.createElement('li');
//   feature.classList.add('popup__feature', 'popup__feature--' + adFeature);

//   return feature;
// };

// var addFeatures = function (features) {
//   var fragment = document.createDocumentFragment();

//   features.forEach(function (item) {
//     fragment.appendChild(renderFeature(item));
//   });

//   return fragment;
// };

// var renderPhoto = function (adPhoto) {
//   var photo = document.createElement('img');
//   photo.classList.add('popup__photo');
//   photo.src = adPhoto;
//   photo.width = PHOTO_WIDTH;
//   photo.height = PHOTO_HEIGHT;
//   photo.alt = PHOTO_ALT;

//   return photo;
// };

// var addPhotos = function (photos) {
//   var fragment = document.createDocumentFragment();

//   photos.forEach(function (item) {
//     fragment.appendChild(renderPhoto(item));
//   });

//   return fragment;
// };

// var removeChilds = function (node) {
//   while (node.firstChild) {
//     node.removeChild(node.lastChild);
//   }
// };

// var renderAdCard = function (ad) {
//   var adCardElement = adCardTemplate.cloneNode(true);
//   var offer = ad.offer;

//   var title = adCardElement.querySelector('.popup__title');
//   title.textContent = offer.title;

//   var address = adCardElement.querySelector('.popup__text--address');
//   address.textContent = offer.address;

//   var price = adCardElement.querySelector('.popup__text--price');
//   price.textContent = offer.price + '₽/ночь';

//   var housingType = adCardElement.querySelector('.popup__type');
//   housingType.textContent = offer.type;

//   var guestsAndRoomsNumber = adCardElement.querySelector('.popup__text--capacity');
//   guestsAndRoomsNumber.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';

//   var checkinAndCheckoutTime = adCardElement.querySelector('.popup__text--time');
//   checkinAndCheckoutTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

//   var features = adCardElement.querySelector('.popup__features');
//   removeChilds(features);
//   features.appendChild(addFeatures(offer.features));

//   var objectDescription = adCardElement.querySelector('.popup__description');
//   objectDescription.textContent = offer.description;

//   var photos = adCardElement.querySelector('.popup__photos');
//   removeChilds(photos);
//   photos.appendChild(addPhotos(offer.photos));

//   var avatar = adCardElement.querySelector('.popup__avatar');
//   avatar.src = ad.autor.avatar;

//   return adCardElement;
// };

// var firstAd = renderAdCard(ads[0]);

// var mapFilters = map.querySelector('.map__filters-container');
// map.insertBefore(firstAd, mapFilters);
