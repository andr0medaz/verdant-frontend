// src/pages/CameraPage.jsx
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

// Helper function untuk mengubah base64 ke File
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default function CameraPage() {
  const API_URL = "https://controlledly-larcher-olene.ngrok-free.dev";
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk mengambil gambar
  const capture = useCallback(async () => {
    setIsLoading(true);
    const imageSrcBase64 = webcamRef.current.getScreenshot();
    
    // 1. Ubah base64 string menjadi File object
    const imageFile = dataURLtoFile(imageSrcBase64, 'detection-image.jpg');

    // 2. Buat FormData untuk dikirim ke API
    const formData = new FormData();
    formData.append('file', imageFile); // 'file' harus cocok dengan nama di FastAPI

    // 3. Kirim ke Backend FastAPI
    try {
      const response = await fetch(`${API_URL}/predict/`, { // Asumsi endpointnya /detect
      // const response = await fetch('http://127.0.0.1:8000/predict/', { // Asumsi endpointnya /detect
      // const response = await fetch('https://modelapi.adminmonitoringanak.my.id/predict/', { // Asumsi endpointnya /detect
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal mendeteksi gambar');
      }

      const data = await response.json();

      // 4. Kirim hasil ke halaman ResultPage
      // Kita juga kirim gambar yg diambil untuk ditampilkan di halaman hasil
      navigate('/result', { state: { results: data.result } });

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirim gambar: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [webcamRef, navigate]);

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col justify-center items-center">
      {/* Tampilan Kamera Fullscreen */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        videoConstraints={{ facingMode: 'environment' }} // 'environment' untuk kamera belakang
      />

      {/* Tombol Shutter (di atas kamera) */}
      <div className="absolute bottom-10 z-10">
        <button
          onClick={capture}
          disabled={isLoading}
          className="
            w-20 h-20 rounded-full bg-white 
            flex items-center justify-center
            border-4 border-gray-400
            disabled:opacity-50
          "
        >
          {/* Lingkaran dalam tombol shutter */}
          {isLoading ? (
            <div className="w-8 h-8 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
          ) : (
            <div className="w-18 h-18 rounded-full bg-white"></div>
          )}
        </button>
      </div>
      
      {/* (Opsional) Tombol kembali */}
      {/* ...tambahkan tombol kembali di pojok kiri atas jika perlu... */}
    </div>
  );
}