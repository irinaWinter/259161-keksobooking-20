'use strict';

(function () {
  var MAX_ADS_COUNT = 5;

  // Добавление меток на страницу
  var pinsList = window.util.map.querySelector('.map__pins');

  window.map = {
    addPins: function (pins) {
      var takeNumber = pins.length > MAX_ADS_COUNT ? MAX_ADS_COUNT : pins.length;

      window.map.pins = window.util.map.querySelectorAll('button[type=button]');

      if (window.map.pins) {
        window.map.pins.forEach(window.util.removeChild);
      }

      for (var i = 0; i < takeNumber; i++) {
        pinsList.appendChild(window.pin.renderPin(pins[i], i, pins));
      }
    },
    id: 0,
    ads: [],
    pins: ''
  };

  // Показ карточки объявления
  var showAdCard = function (item) {
    window.map.id = +/\d+/.exec(item.id);
    window.backend.load(window.card.renderAdCard);
  };

  var pinsListClickHandler = function (evt) {
    var pin = evt.target.closest('button[type=button]');
    if (pin || pinsList.contains(pin)) {
      window.card.removeAdCard();
      showAdCard(pin);
    }
  };

  pinsList.addEventListener('click', pinsListClickHandler);
})();
