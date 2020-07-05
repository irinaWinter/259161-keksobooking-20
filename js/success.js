'use strict';

(function () {
  var successMessage;

  window.succsess = {
    showSuccsessMessage: function () {
      window.form.submitButton.blur();

      window.util.main.appendChild(message);

      window.util.body.style.overflow = 'hidden';

      window.addEventListener('keydown', successMessageKeydownHandler);

      successMessage = document.querySelector('.success');
      successMessage.addEventListener('click', successMessageClickHandler);
    }
  };

  var removeSuccsessMessage = function () {
    successMessage.remove();
    window.util.body.style.overflow = 'visible';

    window.removeEventListener('keydown', successMessageKeydownHandler);
    successMessage.removeEventListener('click', successMessageClickHandler);
  };

  var succsessMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var message = succsessMessageTemplate.cloneNode(true);

  var successMessageKeydownHandler = function (evt) {
    if (evt.key === window.util.Key.ESC) {
      removeSuccsessMessage();
    } else {
      evt.preventDefault();
    }
  };

  var successMessageClickHandler = function (evt) {
    if (evt.button === window.util.Key.LEFT_CLICK) {
      removeSuccsessMessage();
    }
  };
})();
