'use strict';

(function () {
  var DefaultValue = {
    TYPE: 'flat',
    ROOMS: 1,
    CHECKIN_TIME: '12:00'
  };

  window.reset = {
    clearForm: function () {
      var avatar = window.util.adForm.querySelector('input[name=avatar]');
      setDefaultFieldValue(avatar);

      var title = window.util.adForm.querySelector('input[name=title]');
      setDefaultFieldValue(title);

      window.form.setAddressFieldValue(window.form.getCenterCoordinates(window.util.mainPin, window.util.MAIN_PIN_WIDTH));

      window.form.type.value = DefaultValue.TYPE;
      window.form.changeMinPrice();

      window.form.checkinTime.value = DefaultValue.CHECKIN_TIME;
      window.form.synchronizeTime(window.form.checkinTime, window.form.checkoutTime);

      window.form.rooms.value = DefaultValue.ROOMS;
      window.form.verifyValidityOfCapacityField();

      var features = window.util.adForm.querySelectorAll('input[name=features]');
      features.forEach(deselectCheckbox);

      var description = window.util.adForm.querySelector('textarea[name=description]');
      setDefaultFieldValue(description);

      var images = window.util.adForm.querySelector('input[name=images]');
      setDefaultFieldValue(images);
    }
  };

  var deselectCheckbox = function (item) {
    item.checked = false;
  };

  var setDefaultFieldValue = function (field) {
    field.value = '';
  };
})();
