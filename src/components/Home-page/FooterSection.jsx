import React from "react";

const FooterSection = () => {
  return (
    <div>
      {/* Footer Section */}
      <footer className="bg-gradient-to-t  from-[#1D232A] to-blue-900 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">ssbtutor</h3>
              <p className="mt-2 text-gray-400">
              Our Mission Your Success.
              </p>
            </div>
            <div className="flex space-x-4 mt-6 md:mt-0">
              <a href="mailto:itspranjal00@gmail.com" className="text-gray-400 hover:text-white">
                Mail Us
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a> */}
            </div>
          </div>
          <p className="mt-10 text-center text-gray-500">
            © {new Date().getFullYear()} ssbtutor.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
