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
  var features = document.querySelectorAll('#housing-features input');
  var requiredFeatures;

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

    requiredFeatures.forEach(function (item) {
      if (ad.offer.features.includes(item)) {
        rank++;
      }
    });

    return rank;
  };

  var total;

  var checkField = function (field) {
    if (field.value !== 'any' && field.value) {
      total++;
    }
  };

  var addFeature = function (feature) {
    if (feature.checked) {
      requiredFeatures.push(feature.value);
      total++;
    }
  };

  var changeTotal = function () {
    total = 0;

    Array.from(filter.children).forEach(checkField);

    requiredFeatures = [];
    features.forEach(addFeature);

    return total;
  };

  var compareRank = function (item) {
    return getRank(item) === total;
  };

  var updateAds = function () {
    window.card.removeAdCard();

    var filteredAds = window.map.ads.filter(compareRank);
    window.map.addPins(filteredAds);
  };

  var filterChangeHandler = function () {
    changeTotal();
    updateAds();
  };

  var filter = document.querySelector('.map__filters');
  filter.addEventListener('change', filterChangeHandler);
})();
