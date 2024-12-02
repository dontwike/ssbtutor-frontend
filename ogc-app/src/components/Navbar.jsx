import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IsLoggedIn } from "../atoms/LoggedInAtom";
import { CreditAtom } from "../atoms/CreditsAtom";
import axios from "axios";

const Navbar = () => {
    const [isloggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
    const [credits, setCredits] = useRecoilState(CreditAtom);
    const navigate = useNavigate();

    // Function to fetch credits
    const getCredits = async (token) => {
        try {
            const res = await axios.get("http://localhost:8080/getCredits", {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setCredits(res.data.credits); // Update credits state
        } catch (error) {
            console.error("Error fetching credits:", error);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            getCredits(token);
        } else {
            setIsLoggedIn(false);
        }
    }, [isloggedIn, credits]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setCredits(null);
        navigate("/login");
    };

    return (
        <div className="navbar bg-base-100 py-3">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><Link to="/ppdt">PP&DT</Link></li>
                        <li>
                            <span>PSYCH</span>
                            <ul className="p-2">
                                <li><Link to="/tat">TAT</Link></li>
                                <li><Link to="/wat">WAT</Link></li>
                                <li><Link to="/srt">SRT</Link></li>
                                <li><Link to="/sd">SD</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/gd">GD</Link></li>
                        <li><Link to="/interview">INTERVIEW</Link></li>
                        <li><Link to="/subscribe">SUBSCRIBE</Link></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl text-[#ffffffe7]" to="/">ssbtutor</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/ppdt">PP&DT</Link></li>
                    <li><Link to="/tat">TAT</Link></li>
                    <li><Link to="/wat">WAT</Link></li>
                    <li><Link to="/srt">SRT</Link></li>
                    <li><Link to="/sd">SD</Link></li>
                    <li><Link to="/gd">GD</Link></li>
                    <li><Link to="/interview">INTERVIEW</Link></li>
                    <li><Link to="/subscribe">SUBSCRIBE</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="btn mr-2 md:mr-5">
                    Cr
                    <div className="badge">{credits || 0}</div>
                </div>
                {isloggedIn ? (
                    <button className="btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link className="btn" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
