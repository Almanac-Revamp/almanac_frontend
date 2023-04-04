export const changeImage = (
  file: File,
  onLoad: (e: ProgressEvent<FileReader>) => void
) => {
  if (file) {
    if (file.type.includes("image")) {
      const reader = new FileReader();
      reader.onload = onLoad;
      reader.readAsDataURL(file);
    } else {
      alert("This file is not an image file.");
    }
  }
};
