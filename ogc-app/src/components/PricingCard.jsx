import React from "react";

const PricingCard = ({
  title,
  description,
  features,
  buttonText,
  buttonAction,
}) => {
  return (
    <div className="flex flex-col rounded-2xl w-full xl:w-96 bg-[#1D232A] text-[#a7b2c0] shadow-xl">
      <figure className="flex justify-center items-center">
        <img
          src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
          alt="Card Preview"
          className="rounded-t-2xl"
        />
      </figure>
      <div className="flex flex-col p-8 h-full">
        <div className="text-2xl font-bold pb-6">{title}</div>
        <div className="font-bold text-base pb-12">{description}</div>
        <div className="flex flex-col gap-3 font-bold text-sm">
          {features.map((feature, index) => (
            <div className="flex flex-row gap-3" key={index}>
              <div className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </div>
              <div>{feature}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-grow"></div>
        <div className="flex pt-10">
          <button
            className="w-full bg-[#2d6ddd] text-[#ffffff] font-bold text-base p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform"
            onClick={buttonAction}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
