import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IsLoggedIn } from "../atoms/LoggedInAtom";
import { CreditAtom } from "../atoms/CreditsAtom";
import axios from "axios";
import { UserAtom } from "../atoms/UserAtom";

const Navbar = () => {
  const [isloggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
  const [credits, setCredits] = useRecoilState(CreditAtom);
  const [UserDetails, setUserDetails] = useRecoilState(UserAtom);
  const navigate = useNavigate();
  const effectRan = useRef(false); // Prevent double execution

  const getCredits = async (token) => {
    try {
      const res = await axios.get("https://ssbtutor-backend.onrender.com/getCredits", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res.data);
      setCredits(res.data.credits);
      setUserDetails(res.data.user);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  useEffect(() => {
    if (effectRan.current) return; // Skip subsequent calls
    effectRan.current = true; // Set flag

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getCredits(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Run only once on mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCredits(null);
    navigate("/login");
  };

  return (
    <div className="navbar py-3 bg-[#1D232A]">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-[#a7b2c0]"
          >
            <li>
              <Link to="/ppdt">PP&DT</Link>
            </li>
            <li>
              <span>PSYCH</span>
              <ul className="p-2">
                <li>
                  <Link to="/tat">TAT</Link>
                </li>
                <li>
                  <Link to="/wat">WAT</Link>
                </li>
                <li>
                  <Link to="/srt">SRT</Link>
                </li>
                <li>
                  <Link to="/sd">SD</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/gd">GD</Link>
            </li>
            <li>
              <Link to="/interview">INTERVIEW</Link>
            </li>
            {/* <li>
              <Link to="/subscribe">SUBSCRIBE</Link>
            </li> */}
            <li>
              <Link to="/feedback">FEEDBACK</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl text-[#ffffffe7]" to="/">
          ssbtutor
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#a7b2c0]">
          <li>
            <Link to="/ppdt">PP&DT</Link>
          </li>
          <li>
            <Link to="/tat">TAT</Link>
          </li>
          <li>
            <Link to="/wat">WAT</Link>
          </li>
          <li>
            <Link to="/srt">SRT</Link>
          </li>
          <li>
            <Link to="/sd">SD</Link>
          </li>
          <li>
            <Link to="/gd">GD</Link>
          </li>
          <li>
            <Link to="/interview">INTERVIEW</Link>
          </li>
          {/* <li>
            <Link to="/subscribe">SUBSCRIBE</Link>
          </li> */}
          <li>
            <Link to="/feedback">FEEDBACK</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="btn mr-2 border-none md:mr-5 bg-transparent text-white hover:bg-[#1D232A] cursor-default">
          Cr
          <div className="badge bg-[#1D232A] text-white border-none">{credits || 0}</div>
        </div>
        {isloggedIn ? (
          <button className="btn bg-[#1D232A] text-white" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="btn bg-[#1D232A] text-white" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
