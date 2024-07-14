// services/storageService.js

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadImageToStorage = async (uri) => {
  try {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${new Date().getTime()}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export { uploadImageToStorage };
