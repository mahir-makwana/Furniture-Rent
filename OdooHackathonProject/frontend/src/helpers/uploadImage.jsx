const uploadImage = async (image) => {
  const url = `https://api.cloudinary.com/v1_1/dv7ndvscc/image/upload`;
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "furnitureProduct");
  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return dataResponse.json();
};

export default uploadImage;
