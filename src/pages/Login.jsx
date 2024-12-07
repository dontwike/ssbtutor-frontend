import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("dontwike");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const res = await axios.post("https://ssbtutor-backend.onrender.com/login", {
        username: username,
        password: password,
      });

      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem("token", token);

        // Show alert for successful login and navigate after user presses OK
        window.alert("Login successful! Redirecting to the home page...");
        await navigate("/");
        window.location.reload(); // Reload to ensure updated state
      } else {
        alert("Something went wrong! \nPlease try again");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loader
    }
  }

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl ">
      <form className="flex flex-col">
        <div className="pb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-base font-medium text-[#e6e9ed]"
          >
            Email / Username
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              name="email"
              id="email"
              className="pl-12 mb-2 bg-[#1D232A] text-gray-200 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              placeholder="name@company.com"
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="pb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-base font-medium text-[#e6e9ed]"
          >
            Password
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-asterisk"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-[#1D232A] text-gray-200 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging in..." : "Login"} {/* Show loader text */}
        </button>
        <div className="text-sm font-light text-[#79849b] text-center">
          Don't have an account yet?{" "}
          <a
            href="/register"
            className="font-medium text-[#4F46E5] hover:underline"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
