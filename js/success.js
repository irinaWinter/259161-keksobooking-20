'use strict';

(function () {
  var successMessage;

  window.succsess = {
    showSuccsessMessage: function () {
      window.util.main.appendChild(renderSuccsessMessage());

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

  var renderSuccsessMessage = function () {
    return succsessMessageTemplate.cloneNode(true);
  };

  var successMessageKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeSuccsessMessage();
    } else {
      evt.preventDefault();
    }
  };

  var successMessageClickHandler = function (evt) {
    if (evt.button === 0) {
      removeSuccsessMessage();
    }
  };
})();