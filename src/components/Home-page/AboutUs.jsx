import React from "react";

const AboutUs = () => {
  return (
    <div>
      {/* About Us Section */}
      <section className="bg-[#1D232A] py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://res.cloudinary.com/davqmcelg/image/upload/v1733422069/cds-2-2023-result_1_mxto7u.png"
              alt="About Us"
              className="rounded-lg "
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-300">About Us</h2>
            <p className="mt-6 text-gray-400">
              Our platform was designed with one goal in mind—helping you
              succeed in the SSB selection process. We understand the challenges
              you face, and we are here to provide you with all the resources
              you need to prepare effectively. From stage-specific practice
              tests to expert advice, we’ve created a space where every aspirant
              can thrive and reach their fullest potential.
            </p>
            {/* <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700">
              Learn More
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
