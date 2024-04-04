import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App';
import axios from 'axios';
import BASE_URL from '../api_url';
import bankaccountimg from '../images/galaxysone/bankaccountimg.png'
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { BiCoinStack } from 'react-icons/bi';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';

const BankCardAdd = () => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, getUserDetails, user, toaster, setLoading } = useContext(ContextApi);

    const [details, setDetails] = useState(
        {
            fullName: '',
            bankAccount: '',
            ifsc: '',
            bankName: '',
            phoneNo: ''
        }
    );
    const [pop, setpop] = useState(false);
    const [wpwd, setWpwd] = useState()
    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [token, setToken] = useState('')

    const handleChange = (e) => {

        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
        // console.log(details);
    }

    const handleSubmit = async () => {

        if (details.fullName.length === 0) {
            toaster('Name cannot be empty')
            return
        }

        if (details.bankAccount.length === 0) {
            toaster('Bank account number cannot be empty')
            return
        }

        if (details.ifsc.length === 0) {
            toaster('IFSC code cannot be empty')
            return
        }

        if (details.bankName.length === 0) {
            toaster('Bank name cannot be empty')
            return
        }

        // else if (otp !== otpfield) {
        //     toaster('OTP does not match');
        //     return;
        // }

        setLoading(true)
        await axios.post(`${BASE_URL}/bank_details`, { user_id: localStorage.getItem('uid'), bank_details: details, otp, token })
            .then(() => {
                setLoading(false)
                toaster('Account has been added');
                navigate('/bankcard')
            })
            .catch((error) => { setLoading(false); toaster(error.response.data.message) }
            );

    }

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

    const handleMessage = async () => {
        // if (mobno.length !== 10) {
        //     toaster('Invalid Mobile No, please enter a valid number');
        //     return;
        // }
        // fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=U1dPqEDiCO5WfZMAFwovrmz349tKBL0Hbh2eGlN8QXg7ujSRYVTSyRuW9H3LZ2Nafn5X6obgd47ACIt0&variables_values=${otpfield}&route=otp&numbers=${userDetails?.mobno}`)
        //     .then((response) => {
        //         console.log(response);
        //         setSeconds(59)
        //         toaster('OTP sent successfully');
        //     })
        //     .catch(error => toaster('Something went wrong'));
        // console.log(otpfield, "otpfield");

        await axios.post(`${BASE_URL}/get-otp`, { phoneNumber: userDetails?.mobno }).then(response => {
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



            <div className="after:bg-white after:contents-[' '] after:fixed p-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Edit bank account</h2>

                        </div>
                    </header>

                    <div className="row mb-3">
                        <div className="w-full">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row">
                                            <div className="input-group mb-3">
                                                <input
                                                    onChange={handleChange}
                                                    type='text'
                                                    name='fullName'
                                                    id="AccountHolderName"
                                                    className="form-control p-3 colorinput"
                                                    placeholder="Name"

                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    onChange={handleChange}
                                                    type='text'
                                                    name='phoneNo'
                                                    id="AccountHolderName"
                                                    className="form-control p-3 colorinput"
                                                    placeholder="Mobile Number"

                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control p-3 colorinput"
                                                    placeholder="Bank Name"
                                                    id="BankName"
                                                    name="bankName"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control p-3 colorinput"
                                                    placeholder="IFSC" aria-label="Recipient's username"
                                                    id="BankCode"
                                                    name="ifsc"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control p-3 colorinput"
                                                    placeholder="Account" aria-label="Recipient's username"
                                                    id="AccountNumber"
                                                    name="bankAccount"
                                                    onChange={(e) => { handleChange(e); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }}

                                                />
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

                                            {/* <div className="input-group mb-3">

                                                <input onChange={(e) => setOtp(e.target.value)} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }} type="text" name="enterOpt" className="form-control p-3 colorinput" placeholder="Please input otp code" />
                                                <button style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0, marginLeft: '-1px ' }} className="btn btn-outline-primary text-black colorinput" type="button" id="getOtpButton">Get OTP</button>
                                            </div> */}
                                            <div className="mb-2 text-center">
                                                <button onClick={handleSubmit} style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} className="btn-primary btn-lg fw-bold mx-auto d-block btn-sm">Save bank account</button>
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

export default BankCardAdd