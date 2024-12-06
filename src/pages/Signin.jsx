import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const res = await axios.post("https://ssbtutor-backend.onrender.com/signup", {
        username: username,
        password: password,
        name: name,
        phno: phno,
      });

      // Navigate only if the response status is successful
      if (res?.status === 200 || res?.status === 201) {
        console.log("Signup successful:", res?.data || "No data");
        navigate("/login");
      } else {
        alert(res?.data.message)
        console.error("Unexpected response:", res?.status, res?.data);
      }
    } catch (error) {
      // Log detailed error for debugging
      console.error("Error during signup:", error?.response?.data || error?.message || error);
      alert("Signup failed. Please try again.");
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-300"
              >
                Email address / Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-5"
                  onChange={(e) => setUsername(e?.target?.value || "")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-300"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-5"
                  onChange={(e) => setPassword(e?.target?.value || "")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-300"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-5"
                  onChange={(e) => setName(e?.target?.value || "")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phno"
                className="block text-sm/6 font-medium text-gray-300"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phno"
                  name="phno"
                  required
                  autoComplete="phno"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-5"
                  onChange={(e) => setPhno(e?.target?.value || "")}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
