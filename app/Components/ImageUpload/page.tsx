"use client";
import React from 'react';
import { UploadDropzone } from '../../utils/uploadthing';
import Image from 'next/image';

const ImageUpload = ({ imageUrl }) => {
  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Handle upload completion if needed
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className="w-full cursor-pointer h-[298px] m-0 overflow-hidden bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 flex flex-col items-center"
      />
      {imageUrl && (
        <div >
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
