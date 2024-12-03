import React from "react";

const Tab = (props) => {
  function handleOnSubmit(event) {
    event.stopPropagation();
    console.log("Purchased");
  }

  return (
    <div className="w-48 h-64 bg-[#1D232A] rounded-xl shadow-xl p-5 transition-all duration-500 ease-out hover:border-blue-500 hover:shadow-lg">
      <a
        href={`/ppdt/${props.link}`}
        className="w-full h-full grid place-content-center gap-2 text-[#a7b2c0]"
      >
        <div className="w-full h-1/5">
          <p className="text-xl font-bold text-center text-[#a7b2c0]">
            {props.name}
          </p>
        </div>

        {/* Button */}
        <button
          className="px-6 py-2 block mx-auto mt-7 bg-[#1D232A] text-[#a7b2c0] font-semibold rounded-lg hover:bg-indigo-500"
          onClick={handleOnSubmit}
        >
          Purchase
        </button>
      </a>
    </div>
  );
};

export default Tab;
