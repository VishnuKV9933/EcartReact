import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";

function App() {
  return (
    <BrowserRouter>
     <Routes>
     <Route exact path="/" element={<Home />} />
     <Route exact path="/login" element={<Login />} />
     <Route exact path="/register" element={<Register />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
