'use strict';

(function () {
  var FieldBorderColor = {
    INVALID: 'red',
    DEFAULT: ''
  };

  // Выделение невалидных полей
  var showInvalidField = function (field) {
    if (!field.checkValidity()) {
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
  window.validation = {
    returnDefaultFieldStyle: function (field) {
      field.style.borderColor = FieldBorderColor.DEFAULT;
    }
  };

  var titleFieldKeydownHandler = function () {
    window.validation.returnDefaultFieldStyle(window.form.title);
  };

  var titleFieldPasteHandler = function () {
    window.validation.returnDefaultFieldStyle(window.form.title);
  };

  window.form.title.addEventListener('keydown', titleFieldKeydownHandler);
  window.form.title.addEventListener('paste', titleFieldPasteHandler);

  var priceFieldKeydownHandler = function () {
    window.validation.returnDefaultFieldStyle(window.form.price);
  };

  var priceFieldChangeHandler = function () {
    window.validation.returnDefaultFieldStyle(window.form.price);
  };

  var priceFieldPasteHandler = function () {
    window.validation.returnDefaultFieldStyle(window.form.price);
  };

  window.form.price.addEventListener('keydown', priceFieldKeydownHandler);
  window.form.price.addEventListener('change', priceFieldChangeHandler);
  window.form.price.addEventListener('paste', priceFieldPasteHandler);
})();
