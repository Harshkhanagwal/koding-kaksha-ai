import React from "react";
import "./sidebar.css";
import { MdLogout, MdDashboard, MdMenuBook } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { AiTwotoneCode } from "react-icons/ai";
import logoWhite from "../../assets/Logo-white.png";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiCodeBlock } from "react-icons/bi";
import { logout } from "../../features/auth/authSlice";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-top">
                <img src={logoWhite} alt="Logo" className="logo" />

                <nav className="sidebar-nav">

                    {/* <NavLink to="/dashboard" className="nav-item">
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink> */}

                    <NavLink to="/dashboard/notes" className="nav-item">
                        <MdMenuBook />
                        <span>Notes</span>
                    </NavLink>

                    <NavLink to="/dashboard/questions" className="nav-item">
                        <FaList />
                        <span>Coding Problems</span>
                    </NavLink>


                    {(role === "admin" || role === "lecturer") && (
                        <NavLink to="/dashboard/create-notes" className="nav-item">
                            <LiaNotesMedicalSolid />
                            <span>Create Notes</span>
                        </NavLink>
                    )}


                    <NavLink to="/dashboard/practice" className="nav-item">
                        <BiCodeBlock />
                        <span>online IDE</span>
                    </NavLink>

                </nav>
            </div>

            <button
                className="button-secondary aside-button"
                onClick={handleLogout}
            >
                Logout <MdLogout />
            </button>

        </aside>
    );
};

export default Sidebar;
