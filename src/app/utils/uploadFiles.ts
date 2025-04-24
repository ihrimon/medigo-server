import { UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import { cloudinaryUpload } from '../config/cloudinary.config';

export const uploadFiles = async (
  filePath: string
): Promise<string> => {
  try {
    const result: UploadApiResponse = await cloudinaryUpload.uploader.upload(
      filePath
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('File delete error:', err);
      } else {
        console.log('File deleted successfully:', filePath);
      }
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
};
