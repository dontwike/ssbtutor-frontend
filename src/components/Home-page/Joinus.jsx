import React from "react";

const Joinus = () => {
  const WHATSAPP_LINK = "https://chat.whatsapp.com/HLSq8FFT5uUFCjXqVxn0pc";

  return (
    <div>
      {/* About Us Section */}
      <section id="join-us" className="bg-[#1D232A] py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-20 justify-center">
          <div className="md:w-4/12 mb-8 md:mb-0">
            <img
              src="https://res.cloudinary.com/davqmcelg/image/upload/v1733423884/Group_9402_1_at0gvk.png"
              alt="About Us"
              className="rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-300">
              Join Our WhatsApp Community
            </h2>
            <p className="mt-6 text-gray-400">
              Stay connected with like-minded aspirants and get instant updates,
              tips, and resources to boost your SSB preparation. Collaborate
              with peers to share insights and stay informed with timely
              updates on schedules and important news. 👉 Take the next step
              toward your dream. Join our community now!
            </p>
            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              aria-label="Join our WhatsApp community"
            >
              Join our WhatsApp community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Joinus;
