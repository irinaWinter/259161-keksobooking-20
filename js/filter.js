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
      rank += 1;
    }

    // Price

    if (ad.offer.rooms === +rooms.value) {
      rank += 1;
    }

    if (ad.offer.guests === +guests.value) {
      rank += 1;
    }

    // Features

    return rank;
  };

  var total = 0;

  var changeTotal = function (evt) {
    var currentValue;

    if (evt.target.value !== 'any' && (currentValue === 'any' || !currentValue)) {
      total++;
    } else if (evt.target.value !== 'any' && currentValue !== 'any') {
      total = total;
    } else if (evt.target.value === 'any' && evt.target.value !== currentValue) {
      total--;
    }
    currentValue = evt.target.value;
  };

  var compareRank = function (it) {
    return getRank(it) === total;
  };

  var updateAds = function () {
    var filteredAds = window.map.ads.filter(compareRank);
    console.log(filteredAds);

    window.card.removeAdCard();
    window.map.addPins(filteredAds);
  };

  var filterChangeHandler = function (evt) {
    changeTotal(evt);
    updateAds();
  };

  var filter = document.querySelector('.map__filters');
  filter.addEventListener('change', filterChangeHandler);
})();
