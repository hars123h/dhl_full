import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BASE_URL from '../api_url';
import { ContextApi } from '../App';
// import logo from '../images/logo (1).svg'
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
// import applogo from '../images/appLogo.png'
// import tradelogo from '../images/logo_g.svg'
// import Tradmark from './Tradmark';
import logo from '../images/galaxysone/logo.jpg'
import imgriti from '../images/galaxysone/imgriti.png'
import phone from '../images/galaxysone/phone.png'
import sms from '../images/btc/verify.png'
import indian from '../images/galaxysone/indianFlag.png'
import password from '../images/btc/lock.png'
import eyeclosed from '../images/btc/eyeclosed.png'
import eyeopened from '../images/btc/eyeopend.png'
// import ReCAPTCHA from "react-google-recaptcha";
import RCG from 'react-captcha-generator';
import loginimg from '../images/btc/login.png'
import phoneimg from '../images/btc/phone.png'
import { MdPhoneIphone } from 'react-icons/md';
import { IoLockClosed, IoShieldCheckmark } from 'react-icons/io5';

const ForgotPassword = () => {

    const navigate = useNavigate();


    const {
        setLoading,
        toaster,
        userDetails

    } = useContext(ContextApi);

    const [secret, setSecret] = useState('password')
    const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');
    const [mobno, setMobno] = useState('')
    const [loginpwd, setLoginpwd] = useState('password')
    const [loginpwd2, setLoginpwd2] = useState('password')
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [token, setToken] = useState('')

    const secrethandel = type => {

        console.log(type);

        if (type === 'loginpwd') {
            if (loginpwd === 'password') {
                setLoginpwd('text')
            }
            else {
                setLoginpwd('password')
            }
        }
        else if (type === 'loginpwd2') {
            if (loginpwd2 === 'password') {
                setLoginpwd2('text')
            }
            else {
                setLoginpwd2('password')
            }
        }
    }

    const handleMessage = async () => {
        if (mobno.length !== 10) {
            toaster('Invalid Mobile No, please enter a valid number');
            return;
        }
        // fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=U1dPqEDiCO5WfZMAFwovrmz349tKBL0Hbh2eGlN8QXg7ujSRYVTSyRuW9H3LZ2Nafn5X6obgd47ACIt0&variables_values=${otpfield}&route=otp&numbers=${mobno}`)
        //     .then((response) => {
        //         console.log(response);
        //         setSeconds(59)
        //         toaster('OTP sent successfully');
        //     })
        //     .catch(error => toaster('Something went wrong'));
        // console.log(otpfield, "otpfield");
        await axios.post(`${BASE_URL}/get-otp`, { phoneNumber: mobno }).then(response => {
            if (response.status === 201) {
                setToken(response.data.activationToken)
                toaster("OTP sent successfully")
            }
            else {
                toaster('Something went wrong')
                console.log(response);
            }
        }).catch(error => {
            console.log(error);
            toaster('Something went wrong')
        });
    }

    const validatePassword = password => /[a-zA-Z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleRegister = async () => {

        // if (otp !== otpfield) {
        //     toaster('Otp does not match')
        // }

        if (pwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        if (pwd !== newPwd) {
            toaster('password does not match')
            return;
        }

        else if (validatePassword(newPwd) === false) {
            toaster('Password must contain letters and numbers or special symbols');
            return;
        }

        else {

            await axios.post(`${BASE_URL}/forgot_password`,
                { new_pwd: newPwd, mobno, token, otp }).then(() => {
                    // setOtp('');
                    // setOTPfield('');
                    setMobno('');
                    setOTPfield('')
                    setOtp('')
                    setNewPwd('')
                    toaster('Password successfully updated!');
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                })
                .catch(error => toaster(error.response.data.message));
        }

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

            <div className="text-base en h-screen w-screen bg-[linear-gradient(to left bottom, #6fd0f0, #021140, #031345, #051549, #08174e)] px-5">

                <div className="isPc h-full flex flex-col w-full text-[#2c3e50] ">

                    <div className="van_nav_pd hidden"></div>

                    <div className="login">

                        <div className="login-head flex items-center justify-between my-10">

                            <div className="l-left">

                                <div className="l-title font-bold text-[white] text-3xl">Hello!</div>

                                <div className="l-desc text-[10px] font-semibold whitespace-nowrap text-[#666]">Welcome to the Intel!</div>

                            </div>

                            <div className="l-right">

                                <img className='h-24 relative -z-10 rounded-lg' src={loginimg} alt="" />
                                {/* <img className='h-full max-h-72 relative -top-14' src={loginimg} alt="" /> */}

                            </div>

                        </div>

                        <div className="content relative z-[1] ">

                            <div className="lg-t text-lg font-bold text-black ">Find the password</div>

                            <div className="sign_login sign_login2 relative z-[2] mt-4">

                                <div className="uilist bg-transparent rounded-lg ">

                                    <div className="uilist_div account h-8 px-3 py-5  flex items-center bg-[#f6f6f6] mb-4 backdrop-blur-sm hello rounded-full">

                                        {/* <img className='w-[19px]' src={phoneimg} alt="" /> */}
                                        <MdPhoneIphone className='text-black' size={19} />


                                        <span className="pre  ml-1 font-medium ">+91</span>

                                        <input autoComplete='off'
                                            onChange={e => { setMobno(e.target.value); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }}
                                            type="tel"
                                            placeholder="Phone Number"
                                            name="pattern"
                                            maxlength="10"
                                            className='bg-transparent border-transparent outline-none  text-black pl-[10px] flex-grow'

                                        />

                                    </div>

                                    <div className="uilist_div account h-8 px-3 py-5 flex items-center bg-[#f6f6f6] mb-4 backdrop-blur-sm hello rounded-full">

                                        <IoShieldCheckmark className='text-black' size={19} />
                                        {/* <img className='w-[19px]' src={sms} alt="" /> */}

                                        <input autoComplete='off'
                                            onChange={(e) => setOtp(e.target.value)}
                                            type={'text'}
                                            placeholder="Verification"
                                            name="pattern"
                                            maxlength="10"
                                            className='bg-transparent border-transparent outline-none  text-black pl-[10px] flex-grow'

                                        />


                                        <button disabled={seconds > 0 || minutes > 0} onClick={handleMessage} type="button" className="verfy_title">

                                            {seconds > 0 || minutes > 0 ?
                                                <>
                                                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                                </>
                                                :
                                                'Get Code'}
                                        </button>

                                    </div>

                                    <div className="uilist_div account h-8 px-3 py-5 flex items-center bg-[#f6f6f6] mb-4 backdrop-blur-sm hello rounded-full">

                                        <IoLockClosed className='text-black' size={19} />

                                        {/* <img className='w-[19px]' src={password} alt="" /> */}

                                        <input autoComplete='off'
                                            onChange={e => setPwd(e.target.value)}
                                            type={loginpwd}
                                            placeholder="Password"
                                            name="pattern"
                                            maxlength="10"
                                            className='bg-transparent border-transparent outline-none  text-black pl-[10px] flex-grow'

                                        />

                                        <div onClick={() => secrethandel('loginpwd')} className="">
                                            {loginpwd === 'password' ?
                                                <img className="eyeimg w-3" src={eyeclosed} alt="" data-v-380ab766="" />
                                                :
                                                <img className="eyeimg w-3" src={eyeopened} alt="" data-v-380ab766="" />
                                            }
                                        </div>

                                    </div>

                                    <div className="uilist_div account h-8 px-3 py-5 flex items-center bg-[#f6f6f6] mb-4 backdrop-blur-sm hello rounded-full">

                                        {/* <img className='w-[19px]' src={password} alt="" /> */}
                                        <IoLockClosed className='text-black' size={19} />


                                        <input autoComplete='off'
                                            onChange={e => setNewPwd(e.target.value)}
                                            type={loginpwd2}
                                            placeholder="Confirm New Password"
                                            name="pattern"
                                            maxlength="10"
                                            className='bg-transparent border-transparent outline-none  text-black pl-[10px] flex-grow'

                                        />

                                        <div onClick={() => secrethandel('loginpwd2')} className="">
                                            {loginpwd2 === 'password' ?
                                                <img className="eyeimg w-3" src={eyeclosed} alt="" data-v-380ab766="" />
                                                :
                                                <img className="eyeimg w-3" src={eyeopened} alt="" data-v-380ab766="" />
                                            }
                                        </div>

                                    </div>

                                </div>

                                <p className=" text-center mt-[14px]">

                                    <button onClick={handleRegister} className='inline-block w-11/12 leading-3 rounded-full h-9 text-black text-center font-bold px-5 btn btn-primary' >Submit</button>

                                </p>

                            </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                        </div>

                        <p className="footer2">
                            <span >Already have an account ? </span>
                            <Link to={'/login'} >logn in</Link>
                        </p>

                        <div style={{ height: "200px" }}>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgotPassword