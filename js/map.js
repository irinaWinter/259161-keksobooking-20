'use strict';

(function () {
  var MAX_ADS_COUNT = 5;

  // Добавление меток на страницу
  var pinsList = window.util.map.querySelector('.map__pins');
  var adPins = pinsList.querySelectorAll('input[type=button]');

  window.map = {
    addPins: function (pins) {
      var takeNumber = pins.length > MAX_ADS_COUNT ? MAX_ADS_COUNT : pins.length;
      window.util.removeChilds(adPins);

      for (var i = 0; i < takeNumber; i++) {
        pinsList.appendChild(window.pin.renderPin(pins[i], i, pins));
      }
    },
    id: 0
  };

  // Показ карточки объявления
  var showAdCard = function (item) {
    window.map.id = +/\d+/.exec(item.id);
    window.backend.load(window.card.renderAdCard);
  };

  var pinsListClickHandler = function (evt) {
    var pinButton = evt.target.closest('button[type=button]');
    if (pinButton || pinsList.contains(pinButton)) {
      window.card.removeAdCard();
      showAdCard(pinButton);
    }
  };

  pinsList.addEventListener('click', pinsListClickHandler);
})();
