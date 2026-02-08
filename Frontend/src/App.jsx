import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Rewrite from "./pages/Rewrite";
import "./App.css";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Rewrite" element={<Rewrite />} />
        <Route path="/rewrite" element={<Rewrite />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
