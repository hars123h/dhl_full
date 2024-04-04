import React, { useContext, useEffect, useState } from 'react'
import BASE_URL from '../api_url';
import { Link, useNavigate } from 'react-router-dom';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import axios from 'axios'
import { ContextApi } from '../App';
import { HiMiniArrowLongLeft } from "react-icons/hi2";

const WidthdrawlRecords = () => {

    const navigate = useNavigate();


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

    const nameMapper = {
        confirmed: 'success',
        declined: 'declined',
        pending: 'pending'
    }

    const [withdrawal_list, setWithdrawal_list] = useState([]);


    useEffect(() => {
        const getWithdrawals_list = async () => {
            const querySnapshot = await axios.post(`${BASE_URL}/get_user_withdrawals`, { user_id: localStorage.getItem('uid') })
                .then(res => res.data);
            setWithdrawal_list(querySnapshot);
        }
        getWithdrawals_list();
    }, []);

    // console.log(withdrawal_list);

    return (
        <>
            <div className="  after:contents-[' '] h-screen mb-5 ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Withdrawal</h2>

                        </div>
                    </header>

                    <h6 className="text-center font-bold mt-3 text-red-400" >
                        ₹ {userDetails?.balance?.toFixed(2)}
                    </h6>

                    <p className="text-center text-black mb-4">Balance(Rs)</p>

                    <div className="text-center mb-3">
                        <Link style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} to={'/widthdrawl'} className="btn btn-primary w-fit" >Withdrawal</Link>
                    </div>



                    <div className="row mb-3 mt-3 px-5">
                        <div className="col-md-12 col-12">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row">
                                            <h6 className="text-black">Withdrawal record</h6>
                                            <hr />
                                        </div>
                                        {withdrawal_list.length === 0 ?

                                            <p className="text-center text-black p-3">No record found</p>
                                            :
                                            <ul className='px-5 text-black'>

                                                {withdrawal_list.reverse()?.map((data, index) =>

                                                    <li key={index} className='my-[5px] p-3 rounded-[7px] border border-black'>

                                                        <div className="flex items-center justify-between">

                                                            Time: {new Date(data.time).toLocaleString(undefined, { timeZone: 'Asia/Kolkata', hour12: false })}

                                                        </div>

                                                        <div className="border border-[#6b6f78] w-full h-0 my-5"></div>

                                                        <div className="flex justify-between items-center">

                                                            <p>{new Intl.NumberFormat().format(data.withdrawalAmount)} ₹</p>

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

export default WidthdrawlRecords