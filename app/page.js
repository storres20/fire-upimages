// ClientComponent.jsx
"use client"; // Add this directive at the top of the file

import React, { useState } from 'react';
import { uploadFile } from './firebase/config';
import Image from 'next/image';

export default function Page() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(''); // State for image preview
  const [url, setUrl] = useState(''); // State for URL image

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await uploadFile(file);
      console.log(result);
      setUrl(result);
      alert("The image was uploaded succesfully!!")
    } catch (error) {
      console.error(error);
      alert(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-5'>
      <h1 className='pb-5'><b>Upload and Preview Image</b></h1>
      <input
        type="file"
        className='block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100'
        name=""
        id=""
        onChange={handleFileChange}
      />
      
      {preview && (
        <div className="relative w-80 h-80">
        
        <Image
          src={preview}
          alt="Image Preview"
          layout="fill"
          objectFit="cover"
        />
      </div>
      )}
      <button className='bg-violet-500 hover:bg-violet-600 text-white rounded-full px-2 py-1'>Upload</button>
      
      {url && (
        <div className='pt-5'>
          <h2><b>URL created</b></h2>
          <b className='text-blue-500'>{url}</b>
        </div>
      )}
    </form>
  );
}
