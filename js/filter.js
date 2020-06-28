'use strict';

(function () {
  var type = document.querySelector('#housing-type');
  // Price
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  // Features

  var getRank = function (ad) {
    var rank = 0;

    if (ad.offer.type === type.value) {
      rank++;
    }

    // Price

    if (ad.offer.rooms === +rooms.value) {
      rank++;
    }

    if (ad.offer.guests === +guests.value) {
      rank++;
    }

    // Features

    return rank;
  };

  var total;

  var changeTotal = function () {
    total = 0;

    // console.log(filter.children);
    Array.from(filter.children).forEach(function (it) {
      if (it.value !== 'any' && it.value) {
        total++;
      }
      // console.log(it.value);
    });

    // console.log(total);
    return total;
  };

  var compareRank = function (it) {
    return getRank(it) === total;
  };

  var updateAds = function () {
    var filteredAds = window.map.ads.filter(compareRank);
    // console.log(filteredAds);

    window.card.removeAdCard();
    window.map.addPins(filteredAds);
  };

  var filterChangeHandler = function () {
    changeTotal();
    updateAds();
  };

  var filter = document.querySelector('.map__filters');
  filter.addEventListener('change', filterChangeHandler);
})();
