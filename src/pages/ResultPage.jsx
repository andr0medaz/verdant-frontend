// src/pages/ResultPage.jsx
import React, { useState, useEffect } from 'react'; // <-- 1. IMPORT useState & useEffect
import { useLocation, useNavigate } from 'react-router-dom';

// --- INI ADALAH FUNGSI DUMMY ANDA ---
// Ini mensimulasikan panggilan API ke Laravel
const fetchDummyPlantInfo = (className) => {
  console.log("Meminta info untuk:", className);
  
  // Data palsu yang akan dikembalikan oleh Laravel
  const dummyDatabase = {
    "terong": {
      "nama_lokal": "Terong Ungu",
      "manfaat": [
        "Menjaga kesehatan jantung",
        "Baik untuk kesehatan otak",
        "Mengandung antioksidan tinggi (nasunin)"
      ]
    },
    "cabai": {
      "nama_lokal": "Cabai Rawit",
      "manfaat": [
        "Meningkatkan metabolisme tubuh",
        "Kaya akan Vitamin C",
        "Meredakan nyeri (capsaicin)"
      ]
    },
    "okra": {
      "nama_lokal": "okra",
      "manfaat": [
        "Melancarkan pencernaan",
        "menurunkan kolesterol",
        "Meningkatkan daya tahan tubuh"
      ]
    },
    "tomat_rampai": {
      "nama_lokal": "rampai",
      "manfaat": [
        "kaya vitamin C",
        "kaya antioksidan dan serat",
        "menjaga kesehatan kulit"
      ]
    },
    "sawi": {
      "nama_lokal": "sawi",
      "manfaat": [
        "kaya akan vitamin A,C,dan K",
        "Membantu meningkatkan kekebalan tubuh",
        "Mencegah kanker karena mengandung glukosinolat"
      ]
    },
    "kucai": {
      "nama_lokal": "kucai",
      "manfaat": [
        "bermanfaat untuk kesehatan otak",
        "bagus untuk kesehatan otak",
        "mencegah osteoporosis)"
      ]
    }
  };

  // Kita gunakan Promise + setTimeout untuk simulasi jeda jaringan (1 detik)
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = dummyDatabase[className.toLowerCase()]; // Cari data
      if (data) {
        resolve(data); // Kirim data jika ditemukan
      } else {
        resolve({ nama_lokal: className, manfaat: ["Informasi manfaat belum tersedia."] }); // Kirim default
      }
    }, 1000); // Jeda 1 detik
  });
}
// ------------------------------------

const API_URL = "https://controlledly-larcher-olene.ngrok-free.dev";

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- 2. STATE BARU (WADAH LARAVEL) ---
  const [plantInfo, setPlantInfo] = useState(null); // Untuk data manfaat
  const [isLoadingInfo, setIsLoadingInfo] = useState(true); // Untuk loading

  // Cek state dari FastAPI (seperti sebelumnya)
  const results = location.state?.results;

  // Ambil data deteksi
  const detection = results?.detections?.[0];
  const imageUrl = results?.image_path ? `${API_URL}/${results.output_path}` : null;
  // const imageUrl = results?.image_path ? `http://127.0.0.1:8000/${results.output_path}` : null;
  // const imageUrl = results?.image_path ? `https://modelapi.adminmonitoringanak.my.id/${results.output_path}` : null;

  // --- 3. useEffect UNTUK MEMANGGIL LARAVEL (DUMMY) ---
  useEffect(() => {
    // Hanya jalankan jika kita punya nama kelas (class_name)
    if (detection && detection.class_name) {
      
      const className = detection.class_name;
      
      // Panggil fungsi dummy kita
      fetchDummyPlantInfo(className).then(data => {
        setPlantInfo(data); // Masukkan data ke "wadah"
        setIsLoadingInfo(false); // Selesai loading
      });

    } else {
      // Jika tidak ada deteksi, langsung set selesai loading
      setIsLoadingInfo(false);
    }
  }, [detection]); // <-- 'detection' adalah dependency-nya

  // Handling jika 'results' tidak ada (mis. refresh halaman)
  if (!results) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Tidak ada data hasil</h2>
        <p className="text-gray-600 mb-6">
          Silakan kembali dan lakukan deteksi ulang.
        </p>
        <button 
          onClick={() => navigate('/detect')}
          className="bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          Kembali ke Deteksi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* ... (Header Anda) ... */}
      
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        
        {/* === BAGIAN 1: HASIL DARI FASTAPI === */}
        {imageUrl ? (
          <img src={imageUrl} alt="Hasil Deteksi" className="w-full rounded-lg" />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg">
            <p className="text-gray-500">Gambar tidak ditemukan</p>
          </div>
        )}
        
        {detection ? (
          <div>
            <h2 className="text-xl font-bold mb-1">
              Tanaman terdeteksi: "{detection.class_name}"
            </h2>
            <p className="text-gray-700">
              Keyakinan (Confidence): {Math.round(detection.confidence * 100)}%
            </p>
          </div>
        ) : (
          <h2 className="text-xl font-bold mb-1">
            Tidak ada tanaman yang terdeteksi.
          </h2>
        )}
        
        {/* === GARIS PEMISAH === */}
        <hr className="border-gray-200" /> 

        {/* === BAGIAN 2: HASIL DARI LARAVEL (WADAH ANDA) === */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Informasi Tanaman:</h3>
          
          {/* Tampilkan loading spinner selagi menunggu */}
          {isLoadingInfo ? (
            <div className="text-center text-gray-500">
              <div className="w-6 h-6 border-4 border-dashed border-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
              Memuat manfaat...
            </div>
          ) : (
            // Jika sudah selesai loading, tampilkan datanya
            plantInfo && (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Nama Populer: </span> 
                  {plantInfo.nama_lokal}
                </p>
                <p className="font-semibold">Manfaat Utama:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {plantInfo.manfaat.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate('/detect')}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6 font-semibold"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}