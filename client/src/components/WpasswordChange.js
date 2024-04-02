import React, { useContext, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App'
import axios from 'axios'
import BASE_URL from '../api_url'
import password from '../images/galaxysone/password.png'

const WpasswordChange = () => {

    const navigate = useNavigate();


    const {
        setLoading,
        toaster,
        userDetails

    } = useContext(ContextApi);

    const [secret, setSecret] = useState('password')
    const [pwd, setPwd] = useState('')
    const [pwd2, setPwd2] = useState('')
    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');

    const secrethandel = () => {
        if (secret === 'password') {
            setSecret('text')
        }
        else {
            setSecret('password')
        }
    }

    const handleMessage = () => {
        // if (mobno.length !== 10) {
        //     toaster('Invalid Mobile No, please enter a valid number');
        //     return;
        // }
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=U1dPqEDiCO5WfZMAFwovrmz349tKBL0Hbh2eGlN8QXg7ujSRYVTSyRuW9H3LZ2Nafn5X6obgd47ACIt0&variables_values=${otpfield}&route=otp&numbers=${userDetails.mobno}`)
            .then((response) => {
                console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }

    // console.log("otp", otpfield,userDetails.mobno);

    const handleRegister = async () => {

        if (pwd.length === 0) {
            toaster('New Password can not be empty')
        }

        else if (pwd !== pwd2) {
            toaster('PIN does not match')
        }

        else {

            await axios.post(`${BASE_URL}/reset_withdrawal_password`,
                { new_wpwd: pwd, user_id: localStorage.getItem('uid') }).then(() => {
                    setOtp('');
                    setOTPfield('');
                    setPwd('');
                    toaster('Password successfully updated!');
                    setTimeout(() => {
                        navigate('/home')
                    }, 3000);
                })
                .catch(error => toaster('Some Error Occured'));
        }

    }


    return (
        <div className='mt-5'>

            <div className="numberi" data-v-380ab766="">
                <img src={password} alt="" data-v-380ab766="" />
                <p data-v-380ab766="">New PIN password</p>
            </div>

            <div className="van-cell van-field input-box" data-v-380ab766="">
                <div className="van-cell__value van-field__value">
                    <div className="van-field__body">
                        <input onChange={e => setPwd(e.target.value)}
                            type='password'
                            id="van-field-3-input"
                            className="van-field__control"
                            placeholder="Enter new PIN password"
                        />

                    </div>
                </div>
            </div>

            <div className="numberi" data-v-380ab766="">
                <img src={password} alt="" data-v-380ab766="" />
                <p data-v-380ab766="">Confirm PIN password</p>
            </div>

            <div className="van-cell van-field input-box" data-v-380ab766="">
                <div className="van-cell__value van-field__value">
                    <div className="van-field__body">
                        <input onChange={e => setPwd2(e.target.value)}
                            type='password'
                            id="van-field-3-input"
                            className="van-field__control"
                            placeholder="Enter the PIN password again"
                        />

                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center space-x-3 text-[4vw]">
                {/* <Link to={'/signup'} className='h-[13vw] w-full'>
                                <button className='btnbox h-[13vw] w-full bg-[#2b2b2b] rounded-sm text-[#6e6e6e] font-bold' >Register</button>
                            </Link> */}
                <button onClick={handleRegister} className='btnbox h-[13vw] w-full bg-[#0098e7] rounded-lg text-[#074762] font-bold'>Confirm</button>
            </div>

        </div>
    )
}

export default WpasswordChange