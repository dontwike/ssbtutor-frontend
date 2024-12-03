import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PricingCard from "../components/PricingCard";

const PricingDashboard = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Basic",
      description: "Basic features. Get started completely for free.",
      features: [
        "10 PP&DT and TAT",
        "2 Word Association Test",
        "1 Situation Reaction Test",
      ],
      buttonText: "Get started - 100% Free",
      buttonAction: () => navigate("/home"),
    },
    {
      title: "Premium",
      description: "Exclusive features.",
      features: [
        "Unlimited Access of all Services",
        "AI feature",
        "24/7 Dedicated Customer Support",
      ],
      buttonText: "Buy Premium",
      buttonAction: () => navigate("/payment"),
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
