import React, { useContext } from 'react'
import { useState } from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import { BsFillCreditCard2FrontFill, BsFillPersonFill, BsHeadphones, BsRecordBtn } from 'react-icons/bs'
import { FaAngleRight } from 'react-icons/fa'
import { GoShieldCheck } from 'react-icons/go'
import { RxCross2, RxExit } from 'react-icons/rx'
import { TbHelpSquare } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import navlogo from '../images/galaxysone/logo.jpg'
import indian from '../images/galaxysone/indianFlag.png'




const Sidebar = ({ setRight, right }) => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, setUser, getUserDetails, toaster, user, vipimg } = useContext(ContextApi);


    const handelSignOut = () => {
        localStorage.clear();
        setUser()
        navigate('/login');
    }


    return (

        <>

            <div className={`bg-[#003136] h-screen fixed w-[80vw] top-0 -right-[80vw] z-[10000] transition-all duration-500 ${right} text-black `}>

                <div className="flex justify-between items-start p-5 pr-0">

                    <LiaAngleLeftSolid size={25} onClick={() => setRight('')} />

                    <div className="flex flex-col items-center">

                        <img src={navlogo} alt="" className='w-14 h-14 border border-white rounded-md' />

                        <p className='font-bold'>Evergreen</p>

                        <div className='flex items-center space-x-1'>
                            <img src={indian} alt="" className='w-5' />
                            <p> {userDetails?.mobno}</p>
                        </div>

                    </div>

                    <div className=""></div>

                </div>

                <div className="px-5 flex items-center text-black ">

                    <div className="w-1/2">
                        <p>My Balance</p>
                        <p className='text-xl font-bold text-[#0098e7] '>₹{userDetails?.balance?.toFixed(2)}</p>
                    </div>

                    <div className="">
                        <p>Total Income</p>
                        <p className='text-xl font-bold text-[#0098e7] '>₹{userDetails?.earning?.toFixed(2)}</p>
                    </div>

                </div>

                <div className="p-5 relative">

                    <Link to={'/update'} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <BsFillCreditCard2FrontFill className='text-[#37668b] ' size={25} />

                        <p>My Account</p>

                    </Link>

                    <Link to={'/accountsecurity'} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <GoShieldCheck className='text-[#37668b] ' size={25} />

                        <p>Account Security</p>

                    </Link>

                    <Link to={'/bankCardAdd'} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <BsRecordBtn className='text-[#37668b] ' size={25} />

                        <p>Add Bank Account</p>

                    </Link>

                    {/* <Link to={''} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <TbHelpSquare className='text-[#37668b] ' size={25} />

                        <p>Help for newbies</p>

                    </Link> */}

                    <Link to={'/customer'} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <BsHeadphones className='text-[#37668b] ' size={25} />
                        <p>Customer Service</p>

                    </Link>

                    <Link to={'/aboutus'} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <BsFillPersonFill className='text-[#37668b] ' size={25} />
                        <p>About Us</p>

                    </Link>

                    <Link to={''} className="flex space-x-3 border-b-2 py-3 px-1 border-[#424242]">

                        <AiOutlineDownload className='text-[#37668b] ' size={25} />
                        <p>Download app</p>

                    </Link>

                </div>

                <div onClick={handelSignOut} className="flex items-center justify-between fixed w-[80vw] p-5 bottom-0">

                    <div className="flex space-x-2 items-center">
                        <RxExit className='text-[#37668b] ' size={25} />
                        <p>Sign Out</p>
                    </div>

                    <div className="">
                        <FaAngleRight size={25} />
                    </div>

                </div>

            </div>

        </>
    )
}

export default Sidebar