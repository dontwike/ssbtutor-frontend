import React from "react";

const FeaturesSection = () => {
  const data = [
    {
      heading: "Comprehensive Practice Tests",
      description:
        "Experience realistic SSB exam simulations with our meticulously designed practice tests. Each test mirrors the actual SSB environment, preparing you for every stage with confidence.",
    },
    {
      heading: "Personalized Feedback & Insights",
      description:
        "Identify your strengths and target improvement areas through detailed performance analysis and expert feedback. Tailored guidance helps you focus on what matters most.",
    },
    {
      heading: "All-in-One Guidance",
      description:
        "From OIR and PPDT to GTO tasks and final interviews, our platform offers expert resources and tests to keep you organized, track progress, and stay motivated every step of the way.",
    },
  ];

  return (
    <div>
      {/* Features Section */}
      <section className="bg-gradient-to-t  from-[#1D232A] to-blue-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-300">Why Choose Us</h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Discover the features that make our platform the ultimate
              companion for your SSB preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {data.map((feature, index) => (
              <div
                key={index}
                className="bg-[#1D232A] p-8 rounded-lg shadow-lg hover:shadow-2xl transform transition hover:scale-105"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto">
                  💡
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mt-4">
                  {feature.heading}
                </h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
