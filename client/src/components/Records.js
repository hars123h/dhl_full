import React, { useContext, useEffect, useState } from 'react'
import { HiMiniArrowLongLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import BASE_URL from '../api_url'
import axios from 'axios'
import { ContextApi } from '../App'

const Records = () => {

    const [toggle, setToggle] = useState(true)

    const { userDetails, setUserDetails, setUser, getUserDetails, toaster, user } = useContext(ContextApi);

    useEffect(() => {
        getUserDetails()
    }, [])



    const [datalist, setDatalist] = useState([])
    const [widthdrawl, setWidthdrawl] = useState([])
    const [deposit, setDeposit] = useState([])
    const [rewards, setRewards] = useState([])
    const [commission, setCommission] = useState([])






    useEffect(() => {



        const getRecharges_list = async () => {

            var datad = [];

            const querySnapshot = await axios.post(`${BASE_URL}/get_user_recharges`, { user_id: localStorage.getItem('uid') })
                .then(res => res.data);
            querySnapshot?.map(data => {
                // setDatalist([...datalist, { type: 'Deposit', amount: data.recharge_value, date: data.time, status: data.status }])
                // console.log('deposit', datalist);
                datad.push({ type: 'Deposit', amount: data.recharge_value, date: data.time, status: data.status })

            })
            // console.log(datad);
            setDeposit([...datad])
        }
        getRecharges_list();

        const getWithdrawals_list = async () => {
            var dataw = [];
            const querySnapshot = await axios.post(`${BASE_URL}/get_user_withdrawals`, { user_id: localStorage.getItem('uid') })
                .then(res => res.data);
            querySnapshot?.map(data => {
                // setDatalist([...datalist, { type: 'Withdraw', amount: data.afterDeduction, date: data.time, status: data.status }])
                // console.log('withdraw', datalist);
                dataw.push({ type: 'Withdraw', amount: data.withdrawalAmount, date: data.time, status: data.status })
            })
            setWidthdrawl([...dataw])
        }
        getWithdrawals_list();

        var datac = [];

        userDetails?.comissionData?.forEach(data => {
            datac.push({ type: 'commission', amount: data.comissionAmount, date: data.date, status: 'confirmed' })

        })

        setCommission(datac)

        var datar = [];

        userDetails?.rewardData?.forEach(data => {
            datar.push({ type: 'rewards', amount: data.reward, date: data.date, status: 'confirmed' })

        })

        setRewards(datar)

    }, [getUserDetails])

    const nameMapper = {
        confirmed: 'success',
        declined: 'declined',
        pending: 'pending'
    }

    useEffect(() => {

        if (toggle) {
            setDatalist([...deposit, ...commission, ...rewards])
        }
        else {
            setDatalist([...widthdrawl])
        }

    }, [toggle, setToggle, userDetails, deposit, commission, widthdrawl, rewards, setDeposit, setCommission, setWidthdrawl, setRewards])

    const compareDates = (a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
    };

    useEffect(() => {
        datalist.sort(compareDates)
    }, [setDatalist])


    return (
        <>
            <div className=" after min-h-screen px-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[20px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-white z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-white ' >Device</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1] ">

                        <div className="text-white flex mb-5">

                            <div onClick={() => setToggle(true)} className={`IN Miner border-0 border-solid border-white bg-transparent text-white px-4 py-3 ${toggle && 'border-b-2'} `}> Rs Income</div>

                            <div onClick={() => setToggle(false)} className={`IN Miner border-0 border-solid border-white bg-transparent text-white px-4 py-3 ${!toggle && 'border-b-2'} `}>Rs Expenditure</div>

                        </div>
                    </div>

                    <div className="row mb-3 mt-3 px-5">
                        <div className="col-md-12 col-12">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-white">
                                        {/* <div className="row">
                                            <h6 className="text-white">Withdrawal record</h6>
                                            <hr />
                                        </div> */}
                                        {datalist.length === 0 ?

                                            <p className="text-center text-white p-3">No record found</p>
                                            :
                                            <ul className=' text-white'>

                                                {datalist.sort(compareDates)?.map((data, index) =>

                                                    <li key={index} className='my-5 p-3 rounded-[7px] border border-[blue]'>

                                                        <div className="flex items-center justify-between">

                                                            Time: {new Date(data.date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata', hour12: false })}

                                                        </div>

                                                        <div className="border border-[#6b6f78] w-full h-0 my-3"></div>

                                                        <div className="flex justify-between items-center">

                                                            <p>{new Intl.NumberFormat().format(data.amount)} ₹</p>

                                                            <p className=' font-bold'>{nameMapper[String(data.status)]}</p>

                                                        </div>

                                                    </li>

                                                )
                                                }

                                            </ul>
                                        }

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

export default Records