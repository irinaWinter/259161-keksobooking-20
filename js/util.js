'use strict';

(function () {
  window.util = {
    map: document.querySelector('.map'),
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
