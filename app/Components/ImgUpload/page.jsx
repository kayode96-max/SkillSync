"use client";
import React from 'react';
import { UploadButton } from '../../utils/uploadthing';

const ImgUpload = ({ setImageUrl, username }) => {
  const handleUploadComplete = async (res) => {
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
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImgUpload;
