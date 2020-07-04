'use strict';

(function () {
  var adFormSubmitHandler = function () {
    window.pageStates.deactivatePage();
    window.preview.setDefaultAvatarPreview();
    window.preview.setDefaultImgPreview();
    window.succsess.showSuccsessMessage();
  };

  var adFormErrorHandler = function () {
    window.error.showErrorMessage();
  };

  window.util.adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.util.adForm), adFormSubmitHandler, adFormErrorHandler);
    evt.preventDefault();
  });
})();
