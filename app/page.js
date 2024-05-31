// ClientComponent.jsx
"use client"; // Add this directive at the top of the file

import React from 'react'
import {useState} from 'react';

import {uploadFile} from './firebase/config'

export default function Page() {
  const [file, setFile] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const result = await uploadFile(file)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100' name="" id="" onChange={e => setFile(e.target.files[0])} />
      <button className='bg-violet-500 hover:bg-violet-600 text-white rounded-full px-2 py-1'>Upload</button>
    </form>
  )
}
