import React, { useContext, useEffect, useState } from 'react'
import Popup from './Popup'
import Navbar from './Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import inviteBg from '../images/invitebg.png'
import { RiVipLine } from 'react-icons/ri'
import splitNotchL from '../images/notch_L.svg'
import splitNotchR from '../images/notch_R.svg'
import { BiCoin } from 'react-icons/bi'
import vip from '../images/vip.svg'
import message from '../images/message.svg'
import telegram from '../images/telegram.svg'
import whatsapp from '../images/whatsapp.svg'
import task from '../images/05.svg'
import invite from '../images/06.svg'
import img201 from '../images/201.png'
import img301 from '../images/301.png'
import Card from './Card'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi'
import Tradmark from './Tradmark'
import { ContextApi } from '../App'
import { RxCross1 } from 'react-icons/rx'
import herobg from '../images/galaxysone/home bg.jpg'
import { AiFillWallet } from 'react-icons/ai'
import { IoWallet } from 'react-icons/io5'
import { FaListAlt } from 'react-icons/fa'
import ProductCard from './ProductCard'
import homeLogo from '../images/btc/login.png'
import b1 from '../images/btc/b1.jpg';
import b2 from '../images/btc/b2.jpg';
import b3 from '../images/btc/b3.jpg';
import b4 from '../images/btc/b4.jpg';
import b5 from '../images/btc/b5.jpg';
import Slider from './Slider'




const Home = () => {

    const navigate = useNavigate();
    const location = useLocation().state;


    const { userDetails, setUserDetails, getUserDetails, user, toaster, vipimg } = useContext(ContextApi);


    const [wpwd, setWpwd] = useState(localStorage.getItem('wpwd'))
    const [telegramopen, setTelegram] = useState(false)
    const [toogle, setToogle] = useState(true)
    const [message, setMessage] = useState(location?.message)
    const [amount, Setamount] = useState(location?.amount)
    const [show, setShow] = useState(location?.message ? true : false)
    const [envelope, setEnvelope] = useState('')
    const [letter, setLetter] = useState('')

    // console.log(userDetails);

    // useEffect(() => {
    //     // console.log(wpwd);
    //     if (wpwd === 'undefined') {
    //         toaster('Set Trade Password')
    //         setTimeout(() => {
    //             navigate('/widthdrawlpassword')
    //         }, 3000);
    //     }
    // }, [])

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



    useEffect(() => {
        setTimeout(() => {
            setEnvelope('rotateX(160deg)')
            setLetter('-translate-y-24 z-[2]')
        }, 1000);
        setTimeout(() => {
            setEnvelope('')
            setLetter('')
        }, 3000);
        setTimeout(() => {
            setShow(false)
        }, 4000);
    }, [])


    return (
        <>
            {show &&
                <div className={`wrapper ${show ? 'flex' : 'hidden'}`}>
                    <div className={`envelope `}>
                        <div className="back"></div>
                        <div className={`letter ${letter} `}>
                            <div className="text">
                                {/* reward recived {amount ? amount : '0'}
                                <br /> */}
                                {message === 'success' ?
                                    <>
                                        <p className='text-[#6fd0f0]'>Received</p>
                                        <p className=''>₹{amount}</p>
                                    </>
                                    :
                                    <>
                                        <p className=' text-[#6fd0f0]'>Expired</p>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="front"></div>
                        <div className={`top `} style={{ transform: envelope }}></div>
                        <div className="shadow"></div>
                    </div>
                </div>
            }
            <Navbar />

            {!show &&
                <Popup />
            }

            <div className="p-5 pb-20">

                <img src={homeLogo} className='w-20' alt="" />

                <div className="my-10">
                    <Slider />
                </div>

                <div className="text-black flex">

                    <div onClick={() => setToogle(true)} className={`IN Miner border-0 border-solid border-white bg-transparent text-black px-4 py-3 ${toogle && 'border-b-2'} `}>Ordinary</div>

                    <div onClick={() => setToogle(false)} className={`IN Miner border-0 border-solid border-white bg-transparent text-black px-4 py-3 ${!toogle && 'border-b-2'} `}>Exclusive </div>

                </div>

                <div className="flex flex-col mt-5">
                    {toogle ?
                        <>

                            <ProductCard
                                product_image={b2}
                                product_type={0}
                                plan_cycle={40}
                                plan_amount={499}
                                plan_daily_earning={110}
                                pre_sale={false}
                            />

                            <ProductCard
                                product_image={b3}
                                product_type={0}
                                plan_cycle={40}
                                plan_amount={1400}
                                plan_daily_earning={400}
                                pre_sale={false}
                            />

                            <ProductCard
                                product_image={b4}
                                product_type={0}
                                plan_cycle={40}
                                plan_amount={4000}
                                plan_daily_earning={900}
                                pre_sale={false}
                            />

                            <ProductCard
                                product_image={b1}
                                product_type={0}
                                plan_cycle={40}
                                plan_amount={12000}
                                plan_daily_earning={3500}
                                pre_sale={true}
                            />

                            {/* <ProductCard
                                product_image={b1}
                                product_type={0}
                                plan_cycle={35}
                                plan_amount={95000}
                                plan_daily_earning={5780}
                                pre_sale={true}
                            /> */}
                        </>

                        :
                        <>


                            <ProductCard
                                product_image={b1}
                                product_type={1}
                                plan_cycle={1}
                                plan_amount={250}
                                plan_daily_earning={350}
                                pre_sale={false}
                            />

                            {/* <div className="row mb-3">
                            <div className="col-span-12">
                                <div className="p-2 customborder">
                                    <div className="text-center">
                                        <h3 className=" text-black">No Device</h3>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                            {/* <ProductCard
                                product_image={b3}
                                product_type={1}
                                plan_cycle={10}
                                plan_amount={1100}
                                plan_daily_earning={160}
                                pre_sale={false}
                            />

                            <ProductCard
                                product_image={b1}
                                product_type={1}
                                plan_cycle={5}
                                plan_amount={350}
                                plan_daily_earning={95}
                                pre_sale={false}
                            /> */}

                        </>

                    }
                </div>

            </div>

        </>
    )
}

export default Home