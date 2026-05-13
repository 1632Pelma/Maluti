import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campuses from "./components/Campuses";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Campuses />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;