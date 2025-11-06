// src/pages/DetectionPage.jsx
import { useNavigate } from 'react-router-dom';
// Impor ikon (opsional, bisa diganti <img>)
import { ArrowLeftIcon, CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'; 
import GalleryUpload from '../components/GalleryUpload';

export default function DetectionPage() {
  // Hook untuk fungsi "kembali"
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      
      {/* 1. Header (Navbar) */}
      <header className="w-full max-w-md p-4 sticky top-0 z-10">
        <div className="flex items-center justify-center relative">
          {/* Tombol Kembali */}
          <button 
            onClick={() => navigate(-1)} // -1 berarti kembali ke halaman sebelumnya
            className="p-1 rounded-full hover:bg-black/10 absolute left-0 top-1/2 -translate-y-1/2"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-800" />
          </button>
          
          {/* Judul (di tengah) */}
          <h6 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            Kembali
          </h6>
        </div>
      </header>

      {/* 2. Konten Utama */}
      <main className="w-full max-w-md p-8 flex-1 flex flex-col justify-center items-center text-center">
        
        {/* 3. Teks Prompt */}
        <p className="text-gray-600 mb-8 text-lg">
          Silahkan gunakan kamera atau lampiran foto tanaman
        </p>

        {/* 4. Tombol Pilihan */}
        <div className="flex space-x-4 w-full">
          
          {/* Tombol Kamera */}
          <button className="flex-1 flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:bg-gray-50 transition"
            onClick={() => navigate('/detect/camera')}
          >
            
            <CameraIcon className="h-12 w-12 text-green-500 mb-2" />
            <span className="font-medium text-gray-700">Kamera</span>
          </button>

          {/* Tombol Galeri */}
          {/* <button className="flex-1 flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:bg-gray-50 transition">
            <PhotoIcon className="h-12 w-12 text-blue-500 mb-2" />
            <span className="font-medium text-gray-700">Galeri</span>
          </button> */}
          <GalleryUpload />
        </div>
      </main>
    </div>
  );
}