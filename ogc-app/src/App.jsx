import Navbar from './components/Navbar.jsx';
import PPDT from './pages/PPDT.jsx';
import Home from './pages/Home.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login.jsx';
import Signin from './pages/signin.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ppdt" element={<PPDT />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
