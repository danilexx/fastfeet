const getFileFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};

export default getFileFormData;
