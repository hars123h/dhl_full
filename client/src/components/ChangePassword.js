import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { ContextApi } from '../App';
import axios from 'axios';
import BASE_URL from '../api_url';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import password from '../images/galaxysone/password.png'
import { HiMiniArrowLongLeft } from 'react-icons/hi2';

const ChangePassword = () => {

    const navigate = useNavigate();


    const {
        setLoading,
        toaster,
        userDetails

    } = useContext(ContextApi);

    const [secret, setSecret] = useState('password')
    const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [newPwd2, setNewPwd2] = useState('')
    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const secrethandel = () => {
        if (secret === 'password') {
            setSecret('text')
        }
        else {
            setSecret('password')
        }
    }

    const validatePassword = password => /[a-zA-Z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleRegister = async () => {

        if (pwd !== userDetails?.pwd) {
            toaster('Old password doees not match')
            return;
        }

        else if (newPwd !== newPwd2) {
            toaster('New password does not match characters!');
            return;
        }

        else if (newPwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        else if (validatePassword(newPwd) === false) {
            toaster('Password must contain letters and numbers or special symbols');
            return;
        }

        else if (otp !== otpfield) {
            toaster('OTP does not match');
            return;
        }

        else {

            await axios.post(`${BASE_URL}/reset_login_password`,
                { new_pwd: newPwd, user_id: localStorage.getItem('uid') }).then(() => {
                    // setOtp('');
                    // setOTPfield('');
                    setPwd('');
                    setNewPwd('')
                    toaster('Password successfully updated!');
                    setTimeout(() => {
                        navigate('/home')
                    }, 3000);
                })
                .catch(error => toaster('Some Error Occured'));
        }

    }

    const handleMessage = () => {
        // if (mobno.length !== 10) {
        //     toaster('Invalid Mobile No, please enter a valid number');
        //     return;
        // }
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=U1dPqEDiCO5WfZMAFwovrmz349tKBL0Hbh2eGlN8QXg7ujSRYVTSyRuW9H3LZ2Nafn5X6obgd47ACIt0&variables_values=${otpfield}&route=otp&numbers=${userDetails?.mobno}`)
            .then((response) => {
                console.log(response);
                setSeconds(59)
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
        // console.log(otpfield, "otpfield");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <>
            <div className=" after:contents-[' '] after:fixed p-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Change Password</h2>

                        </div>
                    </header>

                    <div className="row mb-3 justify-center">
                        <div className="w-10/12 ">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row">
                                            <div className="input-group mb-3">
                                                <input autoComplete='off'
                                                    onChange={e => { setPwd(e.target.value); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }}
                                                    type="password"
                                                    className="form-control p-1 colorinput"
                                                    placeholder="Old Password"
                                                    id="OldPassword"
                                                    name="OldPassword"
                                                />
                                                <span className="text-danger field-validation-valid" data-valmsg-for="OldPassword" data-valmsg-replace="true"></span>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input autoComplete='off'
                                                    onChange={e => setNewPwd(e.target.value)}
                                                    type="password"
                                                    className="form-control p-1 colorinput"
                                                    placeholder="New Password"
                                                    id="NewPassword"
                                                    maxLength="100"
                                                    name="NewPassword"
                                                />
                                                <span className="text-danger field-validation-valid" data-valmsg-for="NewPassword" data-valmsg-replace="true"></span>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input autoComplete='off'
                                                    onChange={e => setNewPwd2(e.target.value)}
                                                    type="password"
                                                    className="form-control p-1 colorinput"
                                                    placeholder="Confirm New Password"
                                                    id="ConfirmPassword" name="ConfirmPassword"
                                                />
                                                <span className="text-danger field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true"></span>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input autoComplete='off'
                                                    onChange={e => setOtp(e.target.value)}
                                                    type="text"
                                                    className="form-control p-1 colorinput"
                                                    placeholder="SMS verfication code"
                                                    id="OtpCode"
                                                    name="OtpCode"
                                                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                                />
                                                <button disabled={seconds > 0 || minutes > 0} onClick={handleMessage} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} className="btn btn-outline-primary text-black colorinput" id="getOtpButton">
                                                    {seconds > 0 || minutes > 0 ?
                                                        <>
                                                            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                                        </>
                                                        :
                                                        'Get Code'}
                                                </button>
                                            </div>
                                            <div className="text-center mb-3 mt-3">
                                                <button onClick={handleRegister} style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} className="btn btn-primary w-fit" >Change Password</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ChangePassword