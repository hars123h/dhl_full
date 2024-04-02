import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../api_url';
import { ContextApi } from '../App';

const DepositRecords = () => {

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

    const [recharge_list, setRecharge_list] = useState([]);


    useEffect(() => {
        const getRecharges_list = async () => {

            const querySnapshot = await axios.post(`${BASE_URL}/get_user_recharges`, { user_id: localStorage.getItem('uid') })
                .then(res => res.data);
            // console.log(querySnapshot);
            setRecharge_list(querySnapshot);
        }
        getRecharges_list();
    }, []);

    return (
        <>
            <div className="  after:contents-[' '] after:fixed h-screen ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px] bg-black">
                        <div className="bg-black max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/home'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Deposit Records</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">
                        <div className="m-[5px]">
                            <ul className='px-5 text-white'>

                                {recharge_list.reverse()?.map((data, index) =>

                                    <li key={index} className='my-[5px] p-3 bg-[#212121] rounded-[7px] border-2 border-[#424242]'>

                                        <div className="flex items-center justify-between">

                                            <p>Deposit Amount</p>

                                            <p className='text-[#009fe9]'>₹{new Intl.NumberFormat().format(data.recharge_value)}</p>

                                        </div>

                                        <div className="border border-[#6b6f78] w-full h-0 my-5"></div>

                                        <div className="flex justify-between items-center">

                                            <div className="w-2/5 text-center">

                                                <p>{new Date(data.time).toLocaleString(undefined, { timeZone: 'Asia/Kolkata', hour12: false })}</p>

                                                <p className='text-[#c6ced9]'>Deposit time</p>

                                            </div>

                                            <div className=" border border-[#6b6f78] w-0 h-5 my-5"></div>

                                            <div className="w-2/5 text-center">

                                                <p className='text-[green] font-bold'>{nameMapper[String(data.status)]}</p>

                                                <p className='text-[#c6ced9]'>Deposit status</p>

                                            </div>

                                        </div>

                                    </li>

                                )
                                }

                            </ul>

                            <div className="h-[50px] relative overflow-hidden text-xs translate-z-0  ">
                                <div className="h-[50px] leading-[50px] text-center text-[#cfd0d9]">No more data</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

export default DepositRecords