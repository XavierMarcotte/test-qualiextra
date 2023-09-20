function previewImage(fileInput, previewElement) {
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.addEventListener('load', function() {
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
  
        previewElement.innerHTML = '';
        previewElement.appendChild(imgElement);
      });
  
      reader.readAsDataURL(file);
    }
  }
export default previewImage;