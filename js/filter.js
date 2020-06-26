'use strict';

(function () {
  var type = document.querySelector('#housing-type');

  var updateAds = function () {

    var sameType = window.map.ads.filter(function (it) {
      if (type.value === 'any') {
        return it.offer.type !== type.value;
      }

      return it.offer.type === type.value;
    });
    window.card.removeAdCard();
    window.map.addPins(sameType);
  };

  var typeChangeHandler = function () {
    updateAds();
  };

  type.addEventListener('change', typeChangeHandler);
})();
