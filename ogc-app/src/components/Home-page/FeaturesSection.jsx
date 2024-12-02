import React from "react";

const FeaturesSection = () => {
  return (
    <div>
      {/* Features Section */}
      <section className="bg-gradient-to-t  from-[#1D232A] to-blue-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-300">Why Choose Us</h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Discover the features that make our template the perfect solution
              for your next project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              "Customizable Design",
              "Optimized Performance",
              "24/7 Support",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1D232A] p-8 rounded-lg shadow-lg hover:shadow-2xl transform transition hover:scale-105"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto">
                  💡
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mt-4">
                  {feature}
                </h3>
                <p className="mt-2 text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
