import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App';
import chip from '../images/Chip.svg'
import { AiOutlinePlus } from 'react-icons/ai';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';

const BankCard = () => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, setUser, getUserDetails, toaster, user } = useContext(ContextApi);




    useEffect(() => {
        if (user) {
            getUserDetails()
        }
        else {
            toaster('Please login')
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    }, [])

    console.log(userDetails?.bank_details);

    return (
        <>
            <div className="after:bg-white after:contents-[' '] after:fixed p-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-white z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-white ' >Bank</h2>

                        </div>
                    </header>

                    <p className="text-white mb-5">My Bank Account</p>

                    {userDetails?.bank_details ?
                        <div className="row mb-3">
                            <div className="w-full">
                                <div className="p-2 customborder">
                                    <div className="">
                                        <div className="p-2 text-white">
                                            <div className="row">
                                                <div className="mb-3">

                                                    <p className="text-lg mb-4">Name: &nbsp;  {userDetails?.bank_details?.fullName}</p>
                                                    <p className="text-lg mb-4">Mobile Number: &nbsp; {userDetails?.bank_details?.phoneNo}</p>
                                                    <p className="text-lg mb-4">Bank Name: &nbsp; {userDetails?.bank_details?.bankName}</p>
                                                    <p className="text-lg mb-4">IfSC:&nbsp; {userDetails?.bank_details?.ifsc} </p>
                                                    <p className="text-lg mb-4">Account: &nbsp; {userDetails?.bank_details?.bankAccount}</p>

                                                    <div className="text-center mb-3">
                                                        <Link style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} to={'/bankCardAdd'} className="btn btn-primary w-fit" >Edit bank account</Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="row mb-3 mt-5">
                            <div className="w-full">
                                <div className="p-2 customborder">
                                    <div className="">
                                        <div className="p-2 text-white">
                                            <div className="row">
                                                <p className="text-center p-3">No bank information available.</p>
                                                <div className="mb-2  block">
                                                    <div className="text-center mb-3">
                                                        <Link style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} to={'/bankCardAdd'} className="btn btn-primary w-fit" >Save bank account</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}


                </div>
            </div>

        </>
    )
}

export default BankCard