import React, { useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import axios from 'axios'
import BASE_URL from '../api_url';


const Comissions = () => {

    const [comissionList, setComissionList] = useState([])

    useEffect(() => {
        const getComissions = async () => {
            const querySnapshot = await axios.post(`${BASE_URL}/comissions`, { _id: localStorage.getItem('uid') })
                .then(res => res.data);
            setComissionList(querySnapshot.comissionData);
        }
        getComissions();
    }, []);

    // console.log(comissionList);

    return (
        <>

            <div className="bg-[#e0f2f1]  after:contents-[' '] after:fixed h-screen ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[rgb(1,77,173)] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Commission Records</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">
                        <div className="m-[5px]">
                            <ul>

                                {comissionList?.map((data, index) =>

                                    <li key={index} className='my-[5px] p-[10px] bg-[rgba(255,255,255,0.6)] rounded-[7px] flex flex-wrap items-stretch'>

                                        <div className="flex-1">
                                            <p className='text-[#666]'>Buy Commission ({data?.commissionLevel})</p>
                                            <span className='text-sm text-[#999]'>{new Date(data.time).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</span>
                                        </div>

                                        <div className="">
                                            <p>
                                                <em className=' p-0 px-[2px] border-0 text-base font-light not-italic leading-none '>₹</em>
                                                {new Intl.NumberFormat().format(data.comissionAmount)}
                                            </p>
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

export default Comissions