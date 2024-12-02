import React from "react";

const AboutUs = () => {
  return (
    <div>
      {/* About Us Section */}
      <section className="bg-[#1D232A] py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://via.placeholder.com/500"
              alt="About Us"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-300">About Us</h2>
            <p className="mt-6 text-gray-400">
              We are committed to delivering top-notch designs that simplify
              your workflow. Our team works hard to provide solutions that save
              you time and energy, so you can focus on building your dream
              projects.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
