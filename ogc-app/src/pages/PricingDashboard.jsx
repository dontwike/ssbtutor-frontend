import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentPage from './PaymentPage';

const PricingCard = ({ title, description, features, buttonText, buttonAction }) => {
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

const PricingDashboard = () => {
  const navigate = useNavigate();
  const plans = [
    {
      title: 'Basic',
      description: 'Basic features. Get started completely for free.',
      features: ['10 PP&DT and TAT', '2 Word Association Test', '1 Situation Reaction Test'],
      buttonText: 'Get started - 100% Free',
      buttonAction: () => navigate('/home'),
    },
    {
      title: 'Premium',
      description: 'Exclusive features.',
      features: [
        'Unlimited Access of all Services',
        'AI feature',
        '24/7 Dedicated Customer Support',
      ],
      buttonText: 'Buy Premium',
      buttonAction: () => navigate('/payment'),
    },
  ];

  return (
    <div className="flex mx-auto justify-center items-center">
      {/* Container for the grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 m-8 justify-items-center lg:max-w-5xl">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            buttonAction={plan.buttonAction}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingDashboard;

