'use strict';

(function () {
  window.util = {
    MainPin: {
      WIDTH: 62,
      HEIGHT: 84
    },
    map: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    filters: document.querySelector('.map__filters'),
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
    },
    removeChild: function (node) {
      node.remove();
    },
    removeChilds: function (node) {
      while (node.firstChild) {
        node.removeChild(node.lastChild);
      }
    },
    body: document.querySelector('body'),
    main: document.querySelector('main'),
    data: [],
  };
})();
