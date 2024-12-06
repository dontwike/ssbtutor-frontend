import React, { useState } from "react";

const Feedback = () => {
  return (
    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-[#1D232A] p-8">
      <h2 className="title-font mb-1 text-lg font-medium text-gray-200 flex justify-center">
        Feedback
      </h2>
      <p className="mb-5 leading-relaxed text-gray-200">
        If you had any issues or you liked our product, please share with us!
      </p>
      
      <a className="title-font mb-1 text-lg font-medium text-gray-200 flex justify-center" href="mailto:itspranjal00@gmail.com">
        Click here to mail us
      </a>
    </div>
  );
};

export default Feedback;
