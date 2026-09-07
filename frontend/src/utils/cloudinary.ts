/**
 * Cloudinary image upload utility
 */

export const CLOUDINARY_CLOUD_NAME = 'i7mccbnx';
export const CLOUDINARY_UPLOAD_PRESET = 'careconnect_avatars';

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Uploads an image file directly to Cloudinary using an unsigned upload preset.
 * @param file The image File object to upload
 * @returns Promise resolving to the secure Cloudinary image URL
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file (JPG, PNG, WebP, etc.).');
  }

  // 10MB limit
  const MAX_SIZE_BYTES = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('Image size exceeds 10MB limit. Please choose a smaller photo.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data?.error?.message ||
      `Upload failed (${response.status}: ${response.statusText})`;
    throw new Error(errorMsg);
  }

  if (!data.secure_url) {
    throw new Error('No secure URL returned by Cloudinary.');
  }

  return data.secure_url;
}
