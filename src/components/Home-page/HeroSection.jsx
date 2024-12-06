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
      <section className="bg-gradient-to-t  from-blue-900 to-[#1D232A] text-white md:pb-16 pt-16">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-4xl font-extrabold leading-tight">
                Your Journey to the Armed Forces Begins Here
              </h1>
              <p className="mt-6 text-xl">
                Ace the SSB with realistic practice tests, expert guidance, and
                personalized feedback. Our platform is designed to help you
                succeed at every stage, from screening to final interviews.
              </p>
              <div className="mt-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <button
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg"
                  onClick={handleSignup}
                >
                  Signup
                </button>
                <button
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="md:w-5/12 mb-10">
              <img
                src="https://res.cloudinary.com/davqmcelg/image/upload/v1733418674/hero_section_image_hwmllo.png"
                alt="Illustration"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
