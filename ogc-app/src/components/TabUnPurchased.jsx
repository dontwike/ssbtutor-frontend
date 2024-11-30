import React from "react";
import { useNavigate } from "react-router-dom";

const TabUnPurchased = (props) => {
  const navigate = useNavigate();

  function handleOnSubmit(event) {
    event.stopPropagation();
    navigate('/subscribe')
  }

  return (
    <div
      className="relative w-36 h-36 p-5 bg-[#1D232A] rounded-xl border-2 border-gray-300 overflow-visible transition-all duration-500 ease-out hover:border-blue-500 hover:shadow-lg flex flex-col justify-between"
      onClick={props.onClick}
    >
      <a
        href={`/ppdt/${props.link}`}
        className="flex-grow grid place-content-center text-[#a7b2c0]"
      >
        <p className="text-l font-bold">{props.name}</p>
      </a>

      <button
        className="w-full mt-1 text-black font-semibold py-1 rounded-lg border-2 bg-white shadow-lg  active:scale-95 transition-transform opacity-60 hover:opacity-90"
        onClick={handleOnSubmit}
      >
        10 Cr
      </button>
    </div>
  );
};

export default TabUnPurchased;
