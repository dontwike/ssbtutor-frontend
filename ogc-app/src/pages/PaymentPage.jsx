import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:8080/create-order", {
        amount: 10000, // Amount in the smallest currency unit (e.g., paisa for INR)
      });

      const order = response.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "WIK Technologies",
        description: "Payment for your credits",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8080/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            const result = verifyResponse.data;

            if (result.success) {
              alert("Payment successful!");
              const purchasedCredits = await axios.post(
                "http://localhost:8080/purchase-credits",
                {},
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );

              if (purchasedCredits.data.success) {
                navigate("/ppdt");
              } else {
                alert("Some error occurred, contact owner.");
              }
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            alert("Error verifying payment: " + error.message);
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9808407890",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new window.Razorpay(options);
      rzpay.on("payment.failed", (response) => {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzpay.open();
    } catch (err) {
      console.error("Error during payment:", err);
      alert("Error creating order: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 font-semibold"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentPage;
