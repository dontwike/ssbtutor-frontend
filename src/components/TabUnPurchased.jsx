import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PPDTPrice } from "../atoms/PurchaseAtoms";
import { CreditAtom } from "../atoms/CreditsAtom";
import axios from "axios";

const TabUnPurchased = (props) => {
  const navigate = useNavigate();
  const ppdtprice = useRecoilValue(PPDTPrice);
  const [credits, setCredits] = useRecoilState(CreditAtom);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading
  const ppdtname = props.name;

  async function handleOnSubmit(event) {
    event.stopPropagation();

    // Prevent multiple submissions
    if (isSubmitting) return;

    if (credits > ppdtprice) {
      setIsSubmitting(true); // Set loading state
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.post(
            "https://ssbtutor-backend.onrender.com/buyppdt",
            { ppdtprice, ppdtname },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          setCredits(res.data.credits);
          window.location.reload(); // Refresh the page after successful purchase
        } catch (error) {
          console.error("Error during purchase:", error?.message || error);
        } finally {
          setIsSubmitting(false); // Reset loading state
        }
      }
    } else {
      navigate("/subscribe");
    }
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
        className={`w-full mt-1 text-black font-semibold py-1 rounded-lg border-2 bg-white shadow-lg active:scale-95 transition-transform ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "opacity-60 hover:opacity-90"
        }`}
        onClick={handleOnSubmit}
        disabled={isSubmitting} // Disable button during submission
      >
        {isSubmitting ? "Processing..." : "10 Cr"}
      </button>
    </div>
  );
};

export default TabUnPurchased;
