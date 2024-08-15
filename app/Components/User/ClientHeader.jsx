"use client";
import React, { useState } from 'react';
import ImageUpload from '../ImageUpload/page';
import ImgUpload from '../ImgUpload/page';

const ClientHeader = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <ImageUpload imageUrl={imageUrl} />
      <span className="absolute top-80 right-14">
        <ImgUpload onUpload={(url) => setImageUrl(url)} />
      </span>
    </div>
  );
};

export default ClientHeader;
