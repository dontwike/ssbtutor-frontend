import Navbar from './components/Navbar.jsx';
import PPDT from './pages/PPDT.jsx';
import Home from './pages/Home.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login.jsx';
import Signin from './pages/signin.jsx';
import Cloudinary from './pages/Cloudinary.jsx';
import PPDTMain from './pages/PPDTMain.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ppdt" element={<PPDTMain />} />
          <Route path="/ppdt/:id" element={<PPDT />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signin />} />
          <Route path='/upload' element={<Cloudinary />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
