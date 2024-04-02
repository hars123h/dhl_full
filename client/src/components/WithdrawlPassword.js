import axios from 'axios';
import React, { useContext, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../api_url';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ContextApi } from '../App';

const WithdrawlPassword = () => {

    const navigate = useNavigate();


    const {
        setLoading,
        toaster,
        userDetails

    } = useContext(ContextApi);

    const [secret, setSecret] = useState('password')
    const [pwd, setPwd] = useState('')

    const secrethandel = () => {
        if (secret === 'password') {
            setSecret('text')
        }
        else {
            setSecret('password')
        }
    }

    const handleRegister = async () => {

        if (pwd.length === 0) {
            toaster('New Password can not be empty')
        }

        else {

            await axios.post(`${BASE_URL}/reset_withdrawal_password`,
                { new_wpwd: pwd, user_id: localStorage.getItem('uid') }).then(() => {
                    // setOtp('');
                    // setOTPfield('');
                    setPwd('');
                    toaster('Password successfully updated!');
                    setTimeout(() => {
                        navigate('/account')
                    }, 3000);
                })
                .catch(error => toaster('Some Error Occured'));
        }

    }

    return (
        <>

            <div className="bg-white  after:contents-[' '] after:fixed h-screen ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[rgb(1,77,173)] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Set Trade Password</h2>

                        </div>
                    </header>

                    <div className="m-[10px] p-[10px] relative">

                        <div className="mb-5 relative">

                            <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                <input onChange={e => { setPwd(e.target.value) }}
                                    type={secret}
                                    name="pwd"
                                    id="pwd"
                                    className='flex-1 fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                    placeholder=''

                                />
                                <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Setup Password</label>
                                <div className={` right-[10px] h-full text-center bg-no-repeat bg-[center_center]  bg-[length:30px] z-10 `} onClick={secrethandel}>
                                    {
                                        secret === 'password' ?
                                            <AiFillEyeInvisible size={22} />
                                            :
                                            <AiFillEye size={22} />
                                    }
                                </div>

                            </div>
                        </div>

                        {/* <div className="mb-5 relative">

                            <div className="px-[10px] relative border-0 border-solid border-[rgba(215,215,215,0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                <input onChange={e => setOtp(e.target.value)}
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    className='flex-1 fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                    placeholder=''

                                />
                                <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Verification code (OTP)</label>
                                <div className={` right-[10px] h-full text-center bg-no-repeat bg-[center_center]  bg-[length:30px] z-10 `} onClick={handleMessage}>
                                    <p className='text-sm text-[rgba(52,86,255,0.9)]'>Send</p>
                                </div>

                            </div>
                        </div> */}

                        <div className="flex flex-wrap items-center my-10 w-full justify-end ">

                            {/* <Link to={`/login`} className='text-[#1f3d70] bg-white border-[1px] border-[#1f3d70] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative '>SIGN IN</Link> */}

                            <button className=' flex-1 text-white bg-[#00aa75] border-0 border-[rgba(215,215,215,0.6)] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative ' onClick={handleRegister}>
                                Confirm
                            </button>
                        </div>

                    </div>

                    <div className="mx-[10px] px-5">

                        <h3 className='font-bold text-[#1d1d1f] text-lg mb-[5px]'>Tips</h3>

                        <p className='leading-6 text-sm text-[#666] mb-[10px]'>
                            <>
                                1. The trade password is the password you use when withdrawing and adding a bank card. This password is very important, so you must keep it safely
                            </>
                        </p>

                        <p className='leading-6 text-sm text-[#666] mb-[10px]'>
                            2. Please try not to match your trade password with your login password
                        </p>

                        <p className='leading-6 text-sm text-[#666] mb-[10px]'>
                            3. If you forget your trade password, please contact the customer service personnel
                        </p>

                    </div>

                </div>
            </div>

        </>
    )
}

export default WithdrawlPassword