import React from "react";
import { useNavigate } from "react-router-dom";

const CallToSection = () => {
  const navigate = useNavigate();
  function handleSignup() {
    navigate("/register");
  }

  return (
    <div>
      {/* Call to Action */}
      <section className="bg-gradient-to-t from-blue-900 to-[#1D232A] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Get Early Access Now</h2>
          <p className="mt-4 text-lg">
            Don’t miss out on the opportunity to elevate your potential. Sign up
            for early access today.
          </p>
          <button
            className="mt-6 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default CallToSection;
