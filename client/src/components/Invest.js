import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Tradmark from './Tradmark'
import hot from '../images/hot.svg'
import ProductCard from './ProductCard'
import img202 from '../images/201.png'
import img302 from '../images/301.png'
import { ContextApi } from '../App'
import { FaListAlt } from 'react-icons/fa'
import g1 from '../images/galaxysone/g1.jpg'
import g2 from '../images/galaxysone/g2.jpg'
import g3 from '../images/galaxysone/g3.jpg'
import g4 from '../images/galaxysone/g4.jpg'
import g5 from '../images/galaxysone/g5.jpg'
import g6 from '../images/galaxysone/g6.png'
import g7 from '../images/galaxysone/g7.png'
import g8 from '../images/galaxysone/g8.png'
import g9 from '../images/galaxysone/g9.png'
import { BiSolidCoinStack } from 'react-icons/bi'
import floatings from '../images/galaxysone/g2.png'

const Invest = () => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, getUserDetails, user, toaster } = useContext(ContextApi);


    const [stable, setStable] = useState('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
    const [welfare, setWelfare] = useState('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
    const [activity, setActivity] = useState('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
    const [activelist, setActivelist] = useState('stable')
    const [totalEarn, setTotalEarn] = useState(0)


    const swiperHandel = name => {
        setActivelist(name)
        if (name === 'stable') {
            setStable('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
            setWelfare('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
            setActivity('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
        }
        else if (name === 'welfare') {
            setStable('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
            setWelfare('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
            setActivity('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
        }
        else {
            setStable('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
            setWelfare('bg-[rgba(255,255,255,0.3)] text-black text-lg ')
            setActivity('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
        }
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

    const DateDifference = (date1, date2) => {


        //console.log(date1, date2);    
        var Difference_In_Time = date2.getTime() - date1.getTime();
        //console.log(Difference_In_Time);
        var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

        //console.log(Difference_In_Days);

        return Difference_In_Days;
    }

    useEffect(() => {


        userDetails?.plans_purchased?.forEach(element => {
            setTotalEarn(
                totalEarn + (DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning)
            )

        });

    }, [])

    console.log(totalEarn);


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

    const [toggle, setToggle] = useState(false)
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

    const [toogle, setToogle] = useState('login')
    const [login, setLogin] = useState('')
    const [pin, setPin] = useState('')

    useEffect(() => {

        if (toogle === 'login') {
            setLogin('bg-[#0ef] text-black')
            setPin('bg-[#242424] text-black')
        }
        else {
            setLogin('bg-[#242424] text-black')
            setPin('bg-[#0ef] text-black')
        }

    }, [toogle, setToogle])







    return (
        <>
            <Navbar />

            <div className="mx-3 mt-5 mb-36 text-black bg-[#003136]">

                <div className="rounded-lg ">

                    <div className="bg-[#009fe9] flex relative space-x-5 p-5 rounded-lg ">

                        <div className="">
                            <div className="flex items-center space-x-1 mb-1" >
                                <BiSolidCoinStack className='text-[yellow]' size={25} /> <span>Total income</span>
                            </div>
                            <p className='text-black text-xl font-bold'>
                                <em className=' p-0 px-[2px] border-0 not-italic leading-none '>₹</em>
                                {userDetails?.earning.toFixed(2)}
                            </p>

                        </div>

                        {/* <div className="">
                            <div className="flex items-center space-x-1 mb-1" >
                                <BiSolidCoinStack className='text-[yellow]' size={25} /> <span>Daily income</span>
                            </div>
                            <p className='text-black text-xl font-bold'>
                                <em className=' p-0 px-[2px] border-0 not-italic leading-none '>₹</em>
                                {userDetails?.balance.toFixed(2)}
                            </p>
                            
                        </div> */}

                        {/* <img src={floatings} className='h-32 w-32 absolute right-0 -top-14' alt="" /> */}


                    </div>

                    {/* <div className="flex ">
                        <div className="flex-1 -z-10 bg-[#009fe9] rounded-xl rounded-t-none inverted_radius relative">

                        </div>
                        <Link to={'/widthdrawlrecords'} className="bg-[#009fe9] flex justify-center items-center rounded-lg border-2 mt-2 border-black px-5 py-2">
                            Withdraw record
                        </Link>
                    </div> */}
                </div>


                <div className="mx-auto relative z-[1] mt-5">

                    <div className="flex justify-between items-center space-x-3 text-[4vw] ">

                        <button onClick={() => setToogle('login')} className={`btnbox h-[13vw] w-full rounded-sm font-bold ${login}`}>Ongoing</button>

                        <button onClick={() => setToogle('pin')} className={`btnbox h-[13vw] w-full rounded-sm font-bold ${pin}`}>Finish</button>

                    </div>

                    <div className="p-[5px]">

                        {toogle === 'pin' ?

                            <>
                                {userDetails?.plans_purchased?.map((element, index) => {
                                    if (element.plan_daily_earning * element.plan_cycle === DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
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

                                                <div className=" border border-1 border-white p-5 rounded-lg my-3 ">

                                                    <div className="flex space-x-3">

                                                        <img src={g1} alt="" className='border border-white rounded-md w-20' />

                                                        <div className="flex-1">
                                                            {/* <h1>{plan_name}</h1> */}
                                                            <p>
                                                                My income:
                                                            </p>
                                                            <p className='text-[#00eefe] font-bold'>
                                                                <em className='mr-1 p-0 px-[2px] border-0 font-light not-italic leading-none '>₹</em>
                                                                {/* {plan_amount} */}
                                                                {DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}

                                                            </p>
                                                        </div>

                                                    </div>


                                                    <div className="flex items-center justify-between mt-2">

                                                        {/* <div className="text-center mt-2">
                                                            <p>
                                                                <em className='mr-1 p-0 px-[2px] border-0 font-light not-italic leading-none '>₹</em>
                                                                {(element.plan_daily_earning / 24).toFixed(2)}
                                                            </p>
                                                            <p className='text-[#c6ced9]'>Hourly income</p>
                                                        </div> */}

                                                        <div className="text-center">
                                                            <p>
                                                                {(element.plan_daily_earning).toFixed(2)} days
                                                            </p>
                                                            <p className='text-[#c6ced9]'>Daily income</p>
                                                        </div>

                                                        <div className="text-center">
                                                            <p>
                                                                <span className='text-[#00eefe]'>{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded))}</span>/{element.plan_cycle} days
                                                            </p>
                                                            <p className='text-[#c6ced9]'>Days of revenue</p>
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
                                    if (element.plan_daily_earning * element.plan_cycle !== DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
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

                                                <div className=" border border-1 border-white p-5 rounded-lg my-3 ">

                                                    <div className="flex space-x-3">

                                                        <img src={g1} alt="" className='border border-white rounded-md w-20' />

                                                        <div className="flex-1">
                                                            {/* <h1>{plan_name}</h1> */}
                                                            <p>
                                                                My income:
                                                            </p>
                                                            <p className='text-[#00eefe] font-bold'>
                                                                <em className='mr-1 p-0 px-[2px] border-0 font-light not-italic leading-none '>₹</em>
                                                                {/* {plan_amount} */}
                                                                {DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}

                                                            </p>
                                                        </div>

                                                    </div>


                                                    <div className="flex items-center justify-between mt-2">

                                                        {/* <div className="text-center mt-2">
                                                            <p>
                                                                <em className='mr-1 p-0 px-[2px] border-0 font-light not-italic leading-none '>₹</em>
                                                                {(element.plan_daily_earning / 24).toFixed(2)}
                                                            </p>
                                                            <p className='text-[#c6ced9]'>Hourly income</p>
                                                        </div> */}

                                                        <div className="text-center">
                                                            <p>
                                                                {(element.plan_daily_earning).toFixed(2)} days
                                                            </p>
                                                            <p className='text-[#c6ced9]'>Daily income</p>
                                                        </div>

                                                        <div className="text-center">
                                                            <p>
                                                                <span className='text-[#00eefe]'>{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded))}</span>/{element.plan_cycle} days
                                                            </p>
                                                            <p className='text-[#c6ced9]'>Days of revenue</p>
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

        </>
    )
}

export default Invest