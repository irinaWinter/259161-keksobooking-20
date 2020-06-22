'use strict';

(function () {
  // Добавление меток на страницу
  var pinsList = window.util.map.querySelector('.map__pins');

  window.map = {
    addPins: function (pins) {
      pinsList.appendChild(window.util.getFragment(pins, window.pin.renderPin));
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
