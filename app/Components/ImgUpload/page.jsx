"use client";
import React from 'react';
import { UploadButton } from '../../utils/uploadthing';

const ImgUpload = ({ onUpload }) => {
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res[0]?.url) {
            onUpload(res[0].url);
          }
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
        
      />
    </div>
  );
};

export default ImgUpload;
