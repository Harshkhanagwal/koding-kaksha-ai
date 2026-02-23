import React from 'react'
import Sidebar from '../Components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { BiCodeAlt } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";


const DashboardLayout = () => {
    return (
        <>
            <div className="dashboard-wrapper">
                <Sidebar/> 
                
                <div className="dashboard-main">
{/* 
                    <div className="top-bar">
                        <h3>
                            Hello, Admin
                        </h3>
                        <button className='button-primary'>
                            Online IDE + AI <BiCodeAlt />
                        </button>
                    </div> */}
                <div className="dashboard-content">
                    <Outlet />
                </div>

                </div>

            </div>
        </>
    )
}

export default DashboardLayout