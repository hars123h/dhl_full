import React from "react";
import TeamImg from "../images/galaxysone/teamimg.png";
import WpImg from "../images/whatsapp.svg";
import TeleImg from "../images/telegram.svg";

import { IoIosArrowForward } from "react-icons/io";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

const CustomerCare = () => {
    return (
        <>

            <div className=" after:contents-[' '] after:fixed p-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Customer Care</h2>

                        </div>
                    </header>

                    <div>

                        <a href='https://telegram.me/Johny_Thomas' className="flex items-center border-black	border p-4 rounded-lg my-3 ">
                            <img className="w-[45px] pr-[10px] border-r border-black" src={TeleImg} alt="" />
                            <div className="pl-[10px] pr-[10px] ">
                                <div className="text-black">Telegram</div>
                                <p className="text-[grey] text-[15px]">
                                    Click to contact customer service
                                </p>
                            </div>
                            <IoIosArrowForward className="text-[#6fd0f0]" />
                        </a>

                        <a href='https://telegram.me/DNexOfficial91' className="flex items-center border-black	border p-4 rounded-lg my-3 ">
                            <img className="w-[45px] pr-[10px] border-r border-black" src={TeleImg} alt="" />
                            <div className="pl-[10px] pr-[10px] ">
                                <div className="text-black">Telegram</div>
                                <p className="text-[grey] text-[15px]">
                                    Click to join official telegram channel
                                </p>
                            </div>
                            <IoIosArrowForward className="text-[#6fd0f0]" />
                        </a>

                        {/* <a href="https://wa.me/447578046579" className="flex items-center border-black	border p-4 rounded-lg my-3 ">
                            <img className="w-[45px] pr-[10px] border-r border-black" src={WpImg} alt="" />
                            <div className="pl-[10px] pr-[10px] ">
                                <div className="text-black">Whatsapp</div>
                                <p className="text-[grey] text-[15px]">
                                    Click to contact customer service
                                </p>
                            </div>
                            <IoIosArrowForward className="text-[#6fd0f0]" />
                        </a> */}

                    </div>

                    <section className="mb-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="customborder p-5">

                                    <p className="text-black">If you have any questions or need help, please do not hesitate to contact us.</p>
                                    <br /><br />
                                    <p className="text-black">Thank you for trusting us, we will always be here to provide you with the best customer service and help you earn more income.</p>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
};

export default CustomerCare;