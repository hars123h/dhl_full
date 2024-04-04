import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ContextApi } from '../App';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';

const DateDifference = (date1, date2) => {

    date1.setHours(0, 0, 0, 0)
    date2.setHours(0, 0, 0, 0)
    //console.log(date1, date2);    
    var Difference_In_Time = date2.getTime() - date1.getTime();
    //console.log(Difference_In_Time);
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

    //console.log(Difference_In_Days);

    return Difference_In_Days;
}

const Order = () => {

    const navigate = useNavigate();

    const today = new Date()
    today.setHours(0,0,0,0)


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

    const [toggle, setToggle] = useState(true)
    const [completed, setCompleted] = useState('text-black')
    const [processing, setProcessing] = useState('text-red-500')

    const toggleser = () => {
        if (toggle) {
            setCompleted('text-red-500')
            setProcessing('text-black')
        }
        else {
            setProcessing('text-red-500')
            setCompleted('text-black')
        }
    }

    useEffect(() => {
        toggleser();
    }, [toggle, setToggle])





    return (
        <>

            <div className=" after min-h-screen px-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[20px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Device</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1] ">

                        <div className="text-black flex mb-5">

                            <div onClick={() => setToggle(true)} className={`IN Miner border-0 border-solid border-white bg-transparent text-black px-4 py-3 ${toggle && 'border-b-2'} `}> Working Device</div>

                            <div onClick={() => setToggle(false)} className={`IN Miner border-0 border-solid border-white bg-transparent text-black px-4 py-3 ${!toggle && 'border-b-2'} `}>Expired Device</div>

                        </div>

                        <div className="p-[5px] -z-10">

                            {!toggle ?

                                <>
                                    {userDetails?.plans_purchased?.map((element, index) => {
                                        if (element.plan_daily_earning * element.plan_cycle <= DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
                                            return (
                                                <>
                                                    <div className="row mb-3">
                                                        <div className="w-full">
                                                            <div className="p-2 customborder">
                                                                <div className="">
                                                                    <div className="p-2 text-black">
                                                                        <div className="row">
                                                                            <div className="mb-3 capitalize">
                                                                                <p className="text-base mb-1">plan amount: &#8377;{element.plan_amount}</p>
                                                                                <p className="text-base mb-1">earn: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</p>
                                                                                <p className="text-base mb-1">total revenue: {element.plan_daily_earning * element.plan_cycle}</p>
                                                                                <p className="text-base mb-1">time: {new Date(element.date_purchased).toDateString()}</p>
                                                                                <p className="text-base mb-1">Plan Cycle: {element.plan_cycle}</p>
                                                                                <p className="text-base mb-1">Plan Daily Earning: &#8377;{element.plan_daily_earning}</p>
                                                                                {/* <p className="text-base mb-1">Plan Cycle: {element.plan_cycle}</p> */}
                                                                                <p className="text-base mb-1">full time: {new Date(element.fullTime).toDateString()}</p>
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
                                    })}
                                </>

                                :
                                <>
                                    {userDetails?.plans_purchased?.map((element, index) => {
                                        if (element.plan_daily_earning * element.plan_cycle > DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
                                            return (
                                                <>
                                                    {/* <div className="my-[5px] border-x-2 bg-white border-white border-b-2  rounded-[7px]" key={index}>

                                                    <div className="p-3 text-base font-semibold bg-confirm rounded-t-lg bg-[rgb(1,77,173)] text-black">Plan Details</div>
                                                    <div className='p-3'>
                                                        <div className='mb-1'>earn: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</div>
                                                        <div className='mb-1'>total revenue: {element.plan_daily_earning * element.plan_cycle}</div>
                                                        <div className='mb-1'>time: {element.date_purchased}</div>
                                                        <div className='mb-1'>Plan Cycle: {element.plan_cycle}</div>
                                                        <div className='mb-1'>Plan Daily Earning: &#8377;{element.plan_daily_earning}</div>
                                                        <div className='mb-1'>Quantity: {element.quantity}</div>
                                                        <div className='mb-1'>full time: {element.fullTime}</div>

                                                    </div>

                                                </div> */}
                                                    <div className="row mb-3">
                                                        <div className="w-full">
                                                            <div className="p-2 customborder">
                                                                <div className="">
                                                                    <div className="px-2 text-black">
                                                                        <div className="row">
                                                                            <div className="mb-2 capitalize">
                                                                                <p className="text-base mb-1">plan amount: &#8377;{element.plan_amount}</p>
                                                                                <p className="text-base mb-1">earn: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</p>
                                                                                <p className="text-base mb-1">total revenue: {element.plan_daily_earning * element.plan_cycle}</p>
                                                                                <p className="text-base mb-1">time: {new Date(element.date_purchased).toDateString()}</p>
                                                                                <p className="text-base mb-1">Plan Cycle: {element.plan_cycle}</p>
                                                                                <p className="text-base mb-1">Plan Daily Earning: &#8377;{element.plan_daily_earning}</p>
                                                                                {/* <p className="text-base mb-1">Plan Cycle: {element.plan_cycle}</p> */}
                                                                                <p className="text-base mb-1">full time: {new Date(element.fullTime).toDateString()}</p>
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
                                    })}
                                </>

                            }

                        </div>

                    </div>

                </div>
            </div >

        </>
    )
}

export default Order