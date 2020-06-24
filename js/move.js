'use strict';

(function () {
  var limitMovingArea = function (coord, position, minCoord, maxCoord) {
    if (coord < minCoord) {
      window.util.mainPin.style[position] = minCoord + 'px';
    } else if (coord > maxCoord) {
      window.util.mainPin.style[position] = maxCoord + 'px';
    }
  };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var MouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordY = window.util.mainPin.offsetTop - shift.y;

      window.util.mainPin.style.top = coordY + 'px';

      var minCoordTop = window.util.COORD_Y_TOP - window.util.MAIN_PIN_HEIGHT;
      var maxCoordBottom = window.util.COORD_Y_BOTTOM - window.util.MAIN_PIN_HEIGHT;

      limitMovingArea(coordY, 'top', minCoordTop, maxCoordBottom);

      var coordX = window.util.mainPin.offsetLeft - shift.x;

      window.util.mainPin.style.left = coordX + 'px';

      var minCoordLeft = window.util.COORD_X_LEFT - window.util.MAIN_PIN_WIDTH / 2;
      var maxCoordRight = window.util.COORD_X_RIGHT - window.util.MAIN_PIN_WIDTH / 2;

      limitMovingArea(coordX, 'left', minCoordLeft, maxCoordRight);

      window.form.changeAddressFieldValue();
    };

    var MouseUpHandler = function () {
      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });
})();
