'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.backend = {
    load: function (loadHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        loadHandler(xhr.response);
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
