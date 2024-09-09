"use client";
import React from 'react';
import { UploadButton } from '../../utils/uploadthing';


interface ImgUploadProps  {
  setImageUrl: (url: string) => void;
  username: string;
}

const ImgUpload: React.FC<ImgUploadProps> = ({ setImageUrl, username }) => {
  const handleUploadComplete = async (res: { url?: string }[]) => {
    if (res[0]?.url) {
      // Update the image URL in the state
      setImageUrl(res[0].url);

      // Post the new image URL to the server along with the username
      try {
        const response = await fetch('/api/UpdateProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username, // Ensure username is passed down correctly
            bannerImage: res[0].url,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log(result.message);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        content={{
          button({ ready }) {
            if (ready) return <>Upload</>;
       
            return "ready..";
          },
          allowedContent({ ready, isUploading }) {
            if (!ready) return "Checking";
            if (isUploading) return "It's uploading";
            return `upload Image`;
          },
        }}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className='ut-button:w-16  text-xs ut-button:h-6 ut-button:p-2 ut-button:text-xs ut-button:text-center ut-allowed-content:text-xs'
      />
    </>
  );
};

export default ImgUpload;
