function previewImage(fileInput, previewElement) {
  const files = fileInput.files;

  if (files) {
    previewElement.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.classList.add('etablissement__form__preview__image');

        previewElement.appendChild(imgElement);
      });

      reader.readAsDataURL(file);
    }
  }
}

export default previewImage;