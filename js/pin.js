'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 64;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin = {
    renderPin: function (ad, index, ads) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');

      pinElement.style = 'left: ' + (ad.location.x - PIN_WIDTH / 2) + 'px; top: ' + (ad.location.y - PIN_HEIGHT) + 'px;';
      pinElement.id = 'pin-' + ads.indexOf(ad);
      pinImg.src = ad.author.avatar;
      pinImg.alt = ad.offer.title;

      return pinElement;
    }
  };
})();
