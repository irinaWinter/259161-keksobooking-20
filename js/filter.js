'use strict';

(function () {
  var type = document.querySelector('#housing-type');

  var getRank = function (ad) {
    var rank = 0;

    if (ad.offer.type === type.value) {
      rank++;
    }

    return rank;
  };

  var changeTotal = function (evt) {
    var total = 0;

    if (total) {
      total--;
    }

    if (evt.target.value !== 'any') {
      total++;
    }

    return total;
  };

  var updateAds = function (evt) {
    var filteredAds = window.map.ads.filter(function (ad) {
      return getRank(ad) === changeTotal(evt);
    });

    window.card.removeAdCard();
    window.map.addPins(filteredAds);
  };

  var typeChangeHandler = function (evt) {
    changeTotal(evt);
    updateAds(evt);
  };

  type.addEventListener('change', typeChangeHandler);
})();
