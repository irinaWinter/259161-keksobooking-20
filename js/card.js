'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_ALT = 'Фотография жилья';
  var OBJECT_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  window.card = {
    removeAdCard: function () {
      var adCard = window.util.map.querySelector('.map__card');

      if (adCard) {
        adCard.remove();
        window.removeEventListener('keydown', closeButtonKeydownHandler);
      }
    },
    renderAdCard: function (ad) {
      var id = window.map.id;

      var adCardElement = adCardTemplate.cloneNode(true);
      var offer = ad[id].offer;

      var title = adCardElement.querySelector('.popup__title');
      title.textContent = offer.title;

      var address = adCardElement.querySelector('.popup__text--address');
      address.textContent = offer.address;

      var price = adCardElement.querySelector('.popup__text--price');
      price.textContent = offer.price + '₽/ночь';

      var housingType = adCardElement.querySelector('.popup__type');
      housingType.textContent = OBJECT_TYPE[offer.type];

      var guestsAndRoomsNumber = adCardElement.querySelector('.popup__text--capacity');
      guestsAndRoomsNumber.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';

      var checkinAndCheckoutTime = adCardElement.querySelector('.popup__text--time');
      checkinAndCheckoutTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

      var features = adCardElement.querySelector('.popup__features');
      window.util.removeChilds(features);
      features.appendChild(window.util.getFragment(offer.features, renderFeature));

      var objectDescription = adCardElement.querySelector('.popup__description');
      objectDescription.textContent = offer.description;

      var photos = adCardElement.querySelector('.popup__photos');
      window.util.removeChilds(photos);
      photos.appendChild(window.util.getFragment(offer.photos, renderPhoto));

      var avatar = adCardElement.querySelector('.popup__avatar');
      avatar.src = ad[id].author.avatar;

      var filters = window.util.map.querySelector('.map__filters-container');

      var closeButton = adCardElement.querySelector('.popup__close');

      window.util.map.insertBefore(adCardElement, filters);

      closeButton.addEventListener('click', closeButtonClickHandler);
      window.addEventListener('keydown', closeButtonKeydownHandler);
    },
  };

  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderFeature = function (adFeature) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + adFeature);

    return feature;
  };

  var renderPhoto = function (adPhoto) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = adPhoto;
    photo.width = PHOTO_WIDTH;
    photo.height = PHOTO_HEIGHT;
    photo.alt = PHOTO_ALT;

    return photo;
  };

  var closeButtonKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      window.card.removeAdCard();
    }
  };

  var closeButtonClickHandler = function (evt) {
    if (evt.button === 0) {
      window.card.removeAdCard();
    }
  };
})();
