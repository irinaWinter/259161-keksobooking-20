'use strict';

(function () {
  var GET_URL = 'https://javascript.pages.academy/keksobooking/data';
  var POST_URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.backend = {
    load: function (loadHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        loadHandler(xhr.response);
      });

      xhr.open('GET', GET_URL);
      xhr.send();
    },
    save: function (data, saveHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          saveHandler(xhr.response);
        } else {
          errorHandler();
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler();
      });

      xhr.addEventListener('timeout', function () {
        errorHandler();
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();
