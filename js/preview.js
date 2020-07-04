'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_PREVIEW = 'img/muffin-grey.svg';
  var HOUSE_PHOTO_ALT = 'Фотография жилья';

  window.preview = {
    avatarPreview: window.util.adForm.querySelector('.ad-form-header__preview img'),
    imagePreview: '',
    setDefaultAvatarPreview: function () {
      window.preview.avatarPreview.src = DEFAULT_AVATAR_PREVIEW;
    },
    setDefaultImgPreview: function () {
      if (window.preview.imagePreview) {
        window.preview.imagePreview.remove();
        window.preview.imagePreview = '';
      }
    }
  };

  var setPreview = function (fileChooser, preview) {
    if (fileChooser.value) {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  // Установка превью для аватара
  var avatarChooser = window.util.adForm.querySelector('input[name=avatar]');

  var avatarChooserChangeHandler = function () {
    setPreview(avatarChooser, window.preview.avatarPreview);
  };

  avatarChooser.addEventListener('change', avatarChooserChangeHandler);

  // Установка превью для фотографии жилья
  var createHousingImg = function () {
    var imageContainer = window.util.adForm.querySelector('.ad-form__photo');
    var img = document.createElement('img');

    imageContainer.appendChild(img);

    img.style = 'width: inherit; height: inherit; border-radius: inherit;';
    img.alt = HOUSE_PHOTO_ALT;

    return img;
  };

  var imageChooser = window.util.adForm.querySelector('input[name=images]');

  var imageChooserChangeHandler = function () {
    if (!window.preview.imagePreview) {
      window.preview.imagePreview = createHousingImg();
    }

    setPreview(imageChooser, window.preview.imagePreview);
  };

  imageChooser.addEventListener('change', imageChooserChangeHandler);
})();
