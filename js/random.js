'use strict';

(function () {
  window.random = {
    generateRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    generateRandomData: function (data) {
      return data[window.random.generateRandomNumber(0, data.length - 1)];
    },
    generateRandomArray: function (data) {
      var arr = [];

      data.forEach(function (item) {
        if (window.random.generateRandomNumber(0, 1)) {
          arr.push(item);
        }
      });

      if (!arr.length) {
        arr.push(data[(window.random.generateRandomNumber(0, data.length - 1))]);
      }

      return arr;
    },
    getRandomProperty: function (obj) {
      return Object.keys(obj)[window.random.generateRandomNumber(0, Object.keys(obj).length - 1)];
    }
  };
})();
