'use strict';

(function () {
  var VALUE_ANY = 'any';
  var DEFAULT_SCORE = 0;
  var PriceLevel = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

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
      case PriceLevel.LOW:
        if (ad.offer.price < housingPrice.low) {
          rank++;
        }
        break;
      case PriceLevel.MIDDLE:
        if (ad.offer.price >= housingPrice.low && ad.offer.price <= housingPrice.middle) {
          rank++;
        }
        break;
      case PriceLevel.HIGH:
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
    if (field.value !== VALUE_ANY && field.value) {
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
    total = DEFAULT_SCORE;

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
    changeTotal();

    var filteredAds = window.map.ads.filter(compareRank);
    window.map.addPins(filteredAds);
  };

  var filterChangeHandler = function () {
    window.debounce(updateAds);
  };

  var filter = document.querySelector('.map__filters');
  filter.addEventListener('change', filterChangeHandler);
})();
