'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_ALT = 'Фотография жилья';

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

  var removeChilds = function (node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  };

  window.card = {
    renderAdCard: function (ad) {
      var adCardElement = adCardTemplate.cloneNode(true);
      var offer = ad.offer;

      var title = adCardElement.querySelector('.popup__title');
      title.textContent = offer.title;

      var address = adCardElement.querySelector('.popup__text--address');
      address.textContent = offer.address;

      var price = adCardElement.querySelector('.popup__text--price');
      price.textContent = offer.price + '₽/ночь';

      var housingType = adCardElement.querySelector('.popup__type');
      housingType.textContent = offer.type;

      var guestsAndRoomsNumber = adCardElement.querySelector('.popup__text--capacity');
      guestsAndRoomsNumber.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';

      var checkinAndCheckoutTime = adCardElement.querySelector('.popup__text--time');
      checkinAndCheckoutTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

      var features = adCardElement.querySelector('.popup__features');
      removeChilds(features);
      features.appendChild(window.util.getFragment(offer.features, renderFeature));

      var objectDescription = adCardElement.querySelector('.popup__description');
      objectDescription.textContent = offer.description;

      var photos = adCardElement.querySelector('.popup__photos');
      removeChilds(photos);
      photos.appendChild(window.util.getFragment(offer.photos, renderPhoto));

      var avatar = adCardElement.querySelector('.popup__avatar');
      avatar.src = ad.autor.avatar;

      return adCardElement;
    }
  };
})();
