import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import applogo from '../images/appLogo.png'
import telegram from '../images/telegram.svg'
import { toast } from 'react-toastify'
import kraft from '../images/app-release.apk'
import navlogo from '../images/btc/login.png'
import calender from '../images/galaxysone/calender.png'
import { FaGift } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

const Popup = () => {

    const [popOpen, setPopOpen] = useState('block')
    // const [download, setDownload] = useState(true)


    return (
        <>
            <div className={`top-0 right-0 bottom-0 left-0 p-5 fixed z-[999] justify-center items-center h-screen max-h-screen flex ${popOpen} `}>
                {/* <div className="before:content-[''] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(46,46,46,0.1)] z-[1] backdrop-blur-[3px]"></div> */}

                <div className="p-5 max-w-[600px] w-full -top-5 relative mx-auto bg-[#6fd0f0] text-black border-[10px] border-[#6fd0f0] backdrop-blur-sm shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] z-[2] rounded-[15px]">

                    {/* <div  className="w-[45px] h-[45px] top-0 right-0 font-bold absolute bg-[rgba(255,87,40,0.9)] z-50 rounded-bl-[30px] flex justify-center items-center ">
                        <RxCross1 size={16} className='font-bold text-black' />
                    </div> */}

                    <div className="flex space-x-3 items-center">

                        <img src={navlogo} alt="" className='w-20 mx-auto' />
                        {/* <h1 className='text-xl text-black font-bold'>DHL</h1> */}

                    </div>

                    <hr className='my-1' />

                    <h1 className='text-lg text-black font-bold mb-3 capitalize text-center'>WELCOME</h1>

                    <div className=" text-black border border-[#6fd0f0] shadow-[2px_1px_15px_-4px_#000000] px-2 py-5 rounded-lg text-sm">

                        {/* <h2 className='text-black font-bold'><span className='inline-block'><FaGift /></span> Most Profitable Long Term App Name in India. </h2>

                            <p className='text-[#787b8a] py-5'><img src={calender} alt="" className='w-5 inline-block' /> Launch date: November 19, 2023</p> */}

                        <div className="text-[black]">
                            ✅Dear DHL Users Daily New Update Join Our Official Telegram Channel. <br />
                            🎁EveryDay Free Lifafa 3₹<br />
                            ✅invite 3 Level Commission 10% 7% 3% Invite friends Get Commission . <br />
                            ✅Buy Any Ordinary Product Get 5% Extra Bonus (Contact Customer Service ) <br />
                            ✅Withdrawal time 7Am to 4Pm Minimum withdrawal Amount 250rs <br />
                            👑Vaild Members Vip upgrade Extra Reward 200₹ to 150000₹ 🏆 <br />
                        </div>


                    </div>

                    {/* <a href='https://telegram.me/Evergreenofficial656' className='text-black mt-5 bg-[#13d2e4] text-sm flex items-center justify-center w-full py-2 rounded-md'><FaTelegramPlane className='inline-block mr-1' />Service</a> */}

                    {/* <div onClick={() => setPopOpen('hidden')} className="absolute -bottom-10 flex justify-center items-center w-full ">
                        <div className="bg-[#848484] w-7 h-7 flex justify-center items-center rounded-full mx-auto text-black">X</div>
                    </div> */}

                    <div className="text-center px-auto my-2 ">
                        <Link to={'https://t.me/dhl_officials'} className='text-center mx-auto'>
                            <p className='text-ellipsis break-words break-all'>https://telegram.me/DHLtransport123</p>
                        </Link>
                    </div>

                    <p className=" text-center">

                        <button onClick={() => setPopOpen('hidden')} className='inline-block w-11/12 leading-3 rounded-full h-10 text-black text-center align-middle font-bold px-5 btn btn-primary' style={{ borderRadius: '100px' }} >Cancel</button>

                    </p>

                </div>

            </div>
        </>
    )
}

export default Popup