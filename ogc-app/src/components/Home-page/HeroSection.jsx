import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  function handleSignup() {
    navigate("/register");
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-t  from-blue-900 to-[#1D232A] text-white py-16">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Build Your Dream Project with Ease
              </h1>
              <p className="mt-6 text-lg">
                A modern, responsive landing page template tailored for startups
                and creators. Customize and launch in minutes.
              </p>
              <div className="mt-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <button
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg"
                  onClick={handleSignup}
                >
                  Signup
                </button>
                <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="https://via.placeholder.com/500"
                alt="Illustration"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
