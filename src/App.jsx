import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signin from "./pages/Signin.jsx";
import PPDTMain from "./pages/PPDTMain.jsx";
import PPDT from "./pages/PPDT.jsx";
import Cloudinary from "./pages/Cloudinary.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import Subscribe from "./pages/PricingDashboard.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import Feedback from "./pages/Feedback.jsx";
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signin />} />
          {/* <Route path="/subscribe" element={<PrivateRoute><Subscribe /></PrivateRoute>} /> */}
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ppdt" element={<PrivateRoute><PPDTMain /></PrivateRoute>} />
          <Route path="/ppdt/:id" element={<PPDT />} />
          <Route path="/upload" element={<PrivateRoute><Cloudinary /></PrivateRoute>} />
          <Route path="/tat" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
          <Route path="/wat" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
          <Route path="/srt" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
          <Route path="/sd" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
          <Route path="/gd" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
          <Route path="/interview" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
