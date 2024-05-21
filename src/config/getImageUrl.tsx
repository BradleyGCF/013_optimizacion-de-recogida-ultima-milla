import axios from "axios";
const cloudName = import.meta.env.VITE_CLOUD_NAME;

export const getImageUrl = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    const fileUploaded = response.data;
    const imageUrl = fileUploaded.secure_url;
    return imageUrl;
  } catch (error) {
    console.error(error, "ERROR");
  }
};
