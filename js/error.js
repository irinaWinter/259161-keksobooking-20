'use strict';

(function () {
  var errorMessage;
  var closeButton;

  window.error = {
    showErrorMessage: function () {
      window.util.main.appendChild(message);

      window.util.body.style.overflow = 'hidden';

      window.addEventListener('keydown', errorMessageKeydownHandler);

      errorMessage = document.querySelector('.error');
      errorMessage.addEventListener('click', errorMessageClickHandler);

      closeButton = document.querySelector('.error__button');
      closeButton.addEventListener('keydown', closeButtonKeydownHandler);
      closeButton.addEventListener('click', closeButtonClickHandler);
    }
  };

  var removeErrorMessage = function () {
    errorMessage.remove();

    window.util.body.style.overflow = 'visible';

    window.removeEventListener('keydown', errorMessageKeydownHandler);

    errorMessage.removeEventListener('click', errorMessageClickHandler);

    closeButton.removeEventListener('keydown', closeButtonKeydownHandler);
    closeButton.removeEventListener('click', closeButtonClickHandler);
  };

  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var message = errorMessageTemplate.cloneNode(true);

  var closeButtonKeydownHandler = function (evt) {
    if (evt.key === window.util.Key.ENTER) {
      removeErrorMessage();
    }
  };

  var closeButtonClickHandler = function (evt) {
    if (evt.button === window.util.Key.LEFT_CLICK) {
      removeErrorMessage();
    }
  };

  var errorMessageKeydownHandler = function (evt) {
    switch (evt.key) {
      case window.util.Key.ESC:
        removeErrorMessage();
        break;
      case window.util.Key.LEFT_CLICK:
        evt.preventDefault();
        break;
      case window.util.Key.TAB:
        closeButton.focus();
        evt.preventDefault();
        break;
    }
  };

  var errorMessageClickHandler = function (evt) {
    if (evt.button === window.util.Key.LEFT_CLICK) {
      removeErrorMessage();
    }
  };
})();
