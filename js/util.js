'use strict';

(function () {
  window.util = {
    MAIN_PIN_WIDTH: 62,
    MAIN_PIN_HEIGHT: 84,
    COORD_Y_TOP: 130,
    COORD_Y_BOTTOM: 630,
    COORD_X_LEFT: 0,
    COORD_X_RIGHT: 1200,
    map: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    getFragment: function (data, action) {
      var fragment = document.createDocumentFragment();

      data.forEach(function (item, index) {
        if (index) {
          fragment.appendChild(action(item, index));
        } else {
          fragment.appendChild(action(item));
        }
      });

      return fragment;
    }
  };
})();
