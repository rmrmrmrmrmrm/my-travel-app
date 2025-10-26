import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DestinationDetail from "./pages/DestinationDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
