import React from "react";

const ButtonFooter = () => {
  return (
    <div className="flex-col flex-wrap flex items-center md:flex-row md:justify-around md:w-[70%] ">
      <button className="btn btn-wide">Previous</button>
      <br />
      <button className="btn btn-wide">Next</button>
    </div>
  );
};

export default ButtonFooter;
