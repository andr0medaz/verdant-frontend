// src/components/GalleryUpload.jsx

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function GalleryUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Pindahkan fungsi handleFileSelect ke sini
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // const response = await fetch('http://127.0.0.1:8000/predict/' , {
      const response = await fetch('https://modelapi.adminmonitoringanak.my.id/predict/', { 
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Gagal mendeteksi gambar');
      const data = await response.json();
      if (data.status !== 'success') throw new Error('API gagal memproses');

      navigate('/result', { state: { results: data.result } });

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan: ' + error.message);
      setIsLoading(false); // Set loading false hanya jika gagal
    }
  };

  // 2. Pindahkan semua JSX yang berhubungan ke sini
  return (
    <>
      {/* Tombol Galeri */}
      <button 
        onClick={() => fileInputRef.current.click()}
        disabled={isLoading}
        className="flex-1 flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:bg-gray-50 transition disabled:opacity-50"
      >
        <PhotoIcon className="h-12 w-12 text-blue-500 mb-2" />
        <span className="font-medium text-gray-700">Galeri</span>
      </button>

      {/* Input Tersembunyi */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/png, image/jpeg"
        className="hidden"
      />

      {/* Overlay Loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-8 border-dashed border-white rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}