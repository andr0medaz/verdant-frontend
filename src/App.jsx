import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetectionPage from "./pages/DetectionPage";
import CameraPage from "./pages/CameraPage"
import ResultPage from "./pages/ResultPage"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<DetectionPage />}/>
            <Route path="/detect/camera" element={<CameraPage />}/>
            <Route path="/result" element={<ResultPage />}/>
        </Routes>
    )
}