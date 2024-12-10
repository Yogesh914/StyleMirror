import { storage, ref, uploadBytes, getDownloadURL } from '../config/firebase';
import * as FileSystem from 'expo-file-system';
import { fal } from "@fal-ai/client";
import * as MediaLibrary from 'expo-media-library';


// Configure fal API key
fal.config({
  credentials: "FAL_API_KEY"
});

export const uploadImageToFirebase = async (uri, path) => {
  try {
    // First, fetch the image and convert to blob
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Create a unique filename
    const filename = `${Date.now()}.jpg`;
    const storageRef = ref(storage, `${path}/${filename}`);
    
    // Upload the blob
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

export const generateOutfit = async (humanImageUrl, garmentImageUrl) => {
  try {
    const result = await fal.subscribe("fal-ai/idm-vton", {
      input: {
        human_image_url: humanImageUrl,
        garment_image_url: garmentImageUrl,
        description: "Virtual try-on image",
        num_inference_steps: 30,
      },
      logs: true,
    });
    return result.data.image.url;
  } catch (error) {
    console.error('Error generating outfit:', error);
    throw error;
  }
};

export const saveImageLocally = async (imageUrl) => {
  try {
    // Request permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission denied');
    }

    // Download the image
    const fileUri = `${FileSystem.documentDirectory}outfit-${Date.now()}.jpg`;
    const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

    // Save to camera roll
    const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
    return asset;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};