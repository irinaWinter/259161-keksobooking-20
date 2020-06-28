'use strict';

(function () {
  var housingPrice = {
    'low': 10000,
    'middle': 50000,
  };
  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  // Features

  var getRank = function (ad) {
    var rank = 0;

    if (ad.offer.type === type.value) {
      rank++;
    }

    switch (price.value) {
      case 'low':
        if (ad.offer.price < housingPrice.low) {
          rank++;
        }
        break;
      case 'middle':
        if (ad.offer.price >= housingPrice.low && ad.offer.price <= housingPrice.middle) {
          rank++;
        }
        break;
      case 'high':
        if (ad.offer.price > housingPrice.middle) {
          rank++;
        }
        break;
    }

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

    Array.from(filter.children).forEach(function (it) {
      if (it.value !== 'any' && it.value) {
        total++;
      }
    });

    return total;
  };

  var compareRank = function (it) {
    return getRank(it) === total;
  };

  var updateAds = function () {
    var filteredAds = window.map.ads.filter(compareRank);

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
