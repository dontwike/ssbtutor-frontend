import React from "react";

const Tab = (props) => {
  return (
    <div
      className="relative w-36 h-36 p-5 bg-[#1D232A] rounded-xl border-2 border-gray-300 overflow-visible transition-all duration-500 ease-out hover:border-blue-500 hover:shadow-lg flex flex-col justify-between"
      onClick={props?.onClick}
    >
      <a
        href={`/ppdt/${props?.link}`}
        className="flex-grow grid place-content-center text-[#a7b2c0]"
      >
        <p className="text-l font-bold">{props?.name}</p>
      </a>
    </div>
  );
};

export default Tab;
