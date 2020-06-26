'use strict';

(function () {
  var FieldBorderColor = {
    INVALID: 'red',
    DEFAULT: ''
  };

  // Выделение невалидных полей
  var showInvalidField = function (field) {
    if (field.checkValidity() === false) {
      field.style.borderColor = FieldBorderColor.INVALID;
    }
  };

  var validateFields = function () {
    showInvalidField(window.form.title);
    showInvalidField(window.form.price);
  };

  var submitButtonClickHandler = function () {
    validateFields();
  };

  var submitButton = window.util.adForm.querySelector('button[type=submit]');
  submitButton.addEventListener('click', submitButtonClickHandler);

  // Отмена выделения невалидных полей
  var returnDefaultStyle = function (field) {
    field.style.borderColor = FieldBorderColor.DEFAULT;
  };

  var titleFieldKeydownHandler = function () {
    returnDefaultStyle(window.form.title);
  };

  var titleFieldPasteHandler = function () {
    returnDefaultStyle(window.form.title);
  };

  window.form.title.addEventListener('keydown', titleFieldKeydownHandler);
  window.form.title.addEventListener('paste', titleFieldPasteHandler);

  var priceFieldKeydownHandler = function () {
    returnDefaultStyle(window.form.price);
  };

  var priceFieldChangeHandler = function () {
    returnDefaultStyle(window.form.price);
  };

  var priceFieldPasteHandler = function () {
    returnDefaultStyle(window.form.price);
  };

  window.form.price.addEventListener('keydown', priceFieldKeydownHandler);
  window.form.price.addEventListener('change', priceFieldChangeHandler);
  window.form.price.addEventListener('paste', priceFieldPasteHandler);
})();
