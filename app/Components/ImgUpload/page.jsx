"use client";
import React, { useState } from 'react';
import { UploadButton } from '../../utils/uploadthing';

const ImgUpload = ({setImageUrl}) => {
  
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res[0]?.url) {
            setImageUrl(res[0].url);
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
