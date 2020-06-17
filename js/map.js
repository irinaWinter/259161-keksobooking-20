'use strict';

(function () {
  // Добавление меток на страницу
  var pinsList = window.util.map.querySelector('.map__pins');

  window.map = {
    addPins: function () {
      pinsList.appendChild(window.util.getFragment(window.data.ads, window.pin.renderPin));
    }
  };

  // Показ карточки объявления
  var removeAdCard = function () {
    var adCard = window.util.map.querySelector('.map__card');

    if (adCard) {
      adCard.remove();
      window.removeEventListener('keydown', closeButtonKeydownHandler);
    }
  };

  var closeButtonKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeAdCard();
    }
  };

  var closeButtonClickHandler = function (evt) {
    if (evt.button === 0) {
      removeAdCard();
    }
  };

  var showAdCard = function (item) {
    var id = +/\d+/.exec(item.id);
    var filters = window.util.map.querySelector('.map__filters-container');

    window.util.map.insertBefore(window.card.renderAdCard(window.data.ads[id]), filters);

    var closeButton = window.util.map.querySelector('.popup__close');
    closeButton.addEventListener('click', closeButtonClickHandler);

    window.addEventListener('keydown', closeButtonKeydownHandler);
  };

  var pinsListClickHandler = function (evt) {
    var pinButton = evt.target.closest('button[type=button]');
    if (pinButton || pinsList.contains(pinButton)) {
      removeAdCard();
      showAdCard(pinButton);
    }
  };

  pinsList.addEventListener('click', pinsListClickHandler);
})();
