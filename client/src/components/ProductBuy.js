import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ContextApi } from '../App';
import BASE_URL from '../api_url';
import axios from 'axios';

const ProductBuy = () => {

    const { userDetails, setUserDetails, setUser, getUserDetails, toaster, user, setLoading } = useContext(ContextApi);
    const navigate = useNavigate();

    const data = useLocation().state;
    const { quantity, plan_amount, product_type } = data
    const [wallet, setWallet] = useState('recharge');

    console.log(data);

    const handelInvest = async () => {

        // if (lvl1plan?.some(element => {
        //     if (element.plan_amount === plan_amount) {
        //         return true;
        //     }

        //     return false;
        // })) {
        //     toaster("you can buy this plan only once")
        //     return
        // }

        if (quantity <= 0) {
            toaster('Please a positive value!');
            return
        }

        if (wallet === 'recharge' && (Number(quantity) * Number(plan_amount)) > Number(userDetails.recharge_amount)) {
            toaster("The available rechange amount is insufficient, please recharge");
            return
        }

        if (wallet === 'balance' && (Number(quantity) * Number(plan_amount)) > Number(userDetails.balance)) {
            toaster("The available balance amount is insufficient");
            return
        }

        // if (product_type > userDetails.vipLevel) {
        //     toaster("Insufficient inventory of products availbale for purchase")
        //     return
        // }
        else {

            setLoading(true)

            await axios.post(`${BASE_URL}/purchase`, {
                ...data.data,
                wallet,
                balance: Number(userDetails.balance) - Number(Number(quantity) * Number(plan_amount)),
            }).then(() => {
                console.log('Product successfully purchased');
                setLoading(false)
                toaster('Plan purchased!');
                getUserDetails()
                navigate('/Workingdevice')
            }).catch((error) => {
                console.log('Some error occured', error);
                setLoading(false)
                toaster('Some error occured, try again after some time');
            })

        }


    }

    useEffect(() => {
        getUserDetails();
    }, [])


    return (
        <>

            <div className="  after:contents-[' '] h-screen mb-5 p-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/home'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Withdrawal</h2>

                        </div>
                    </header>

                    <div className="mb-3">
                        <img src={data.product_image} alt="" className='mt-5 rounded-lg' />
                    </div>

                    <div className="row mb-3">
                        <div className="w-full">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row ">

                                            <div className="flex items-center">
                                                <div className="w-1/2">
                                                    <h6 className="text-red-400" style={{ fontSize: '14px !important' }}>Price</h6>
                                                </div>
                                                <div className="">
                                                    <h6 className="text-red-400" style={{ fontSize: '14px !important' }}>{data.plan_amount.toFixed(2)}</h6>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row    ">

                                            <div className="flex items-center">
                                                <div className="w-1/2">
                                                    <h6 className="text-red-400" style={{ fontSize: '14px !important' }}>Profit</h6>
                                                </div>
                                                <div className="">
                                                    <h6 className="text-red-400" style={{ fontSize: '14px !important' }}>{(data.plan_cycle * data.plan_daily_earning) - data.plan_amount.toFixed(2)}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex    ">
                                            <div className="w-1/2">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>Revenue type</h6>
                                            </div>
                                            <div className="w-1/2  ">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>{data.product_type == 0 ? 'Daily income' : 'Fixed plan'}</h6>
                                            </div>
                                        </div>
                                        <div className="flex    ">
                                            <div className="w-1/2">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>Daily income</h6>
                                            </div>
                                            <div className="w-1/2  ">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>{data.plan_daily_earning.toFixed(2)}</h6>
                                            </div>
                                        </div>
                                        <div className="flex    ">
                                            <div className="w-1/2">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>Total income</h6>
                                            </div>
                                            <div className="w-1/2  ">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>{(data.plan_cycle * data.plan_daily_earning).toFixed(2)}</h6>
                                            </div>
                                        </div>
                                        <div className="flex    ">
                                            <div className="w-1/2">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>Period of validity</h6>
                                            </div>
                                            <div className="w-1/2  ">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>{data.plan_cycle}</h6>
                                            </div>
                                        </div>
                                        {/* <div className="flex    ">
                                            <div className="w-1/2">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>Purchase limit</h6>
                                            </div>
                                            <div className="w-1/2  ">
                                                <h6 className="text-black" style={{ fontSize: '14px !important' }}>3</h6>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="row mb-3">
                        <div className="w-full">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row">

                                            <div className="flex">
                                                <div className="w-1/2" id="rechargeWalletBalance" style={{ display: wallet === 'recharge' ? 'block' : 'none' }}>
                                                    <label>Recharge wallet</label>
                                                    <p className="text-red-400">{userDetails?.recharge_amount?.toFixed(2)}</p>
                                                </div>
                                                <div className="w-1/2" id="balanceWalletBalance" style={{ display: wallet === 'balance' ? 'block' : 'none' }}>
                                                    <label>Balance wallet</label>
                                                    <p className="text-red-400">{userDetails?.balance?.toFixed(2)}</p>
                                                </div>
                                                <div className="w-1/2">
                                                    <p className="text-black">Choose a wallet</p>
                                                </div>
                                            </div>
                                            <div className="input-group mb-3">
                                                <select onChange={e => setWallet(e.target.value)} className="form-select colorinput" name="wallet" id="inputGroupSelect01">
                                                    <option value="recharge">Recharge wallet</option>
                                                    <option value="balance">Balanace wallet</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className="text-center mb-3">
                                            <button onClick={handelInvest} style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} className="btn btn-primary w-fit" >Buy now</button>
                                        </div>


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

export default ProductBuy