import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeSharp } from "react-icons/io5";
import { IoMdCube } from "react-icons/io";
import { FaRegSnowflake } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";


const Navbar = () => {

    return (
        <>

            <nav className="navbar shadow-lg fixed-bottom" >
                <div className="container-fluid">

                    <Link to={'/home'} className="nav-link active">
                        <div className="text-center flex flex-col items-center text-white">
                            <IoHomeSharp size={12} />
                            <p className="custom-font importantsize">Home</p>
                        </div>
                    </Link>

                    <Link to={'/aboutus'} className="nav-link active">
                        <div className="text-center flex flex-col items-center text-white">
                            <IoMdCube size={12} />
                            <p className="custom-font importantsize">About</p>
                        </div>
                    </Link>

                    <Link to={'/invite'} className="nav-link active">
                        <div className="text-center flex flex-col items-center text-white">
                            <FaRegSnowflake size={12} />
                            <p className="custom-font importantsize">Invite</p>
                        </div>
                    </Link>

                    <Link to={'/account'} className="nav-link active">
                        <div className="text-center flex flex-col items-center text-white">
                            <IoPerson size={12} />
                            <p className="custom-font importantsize">Account</p>
                        </div>
                    </Link>

                </div>

            </nav>
        </>
    )
}

export default Navbar