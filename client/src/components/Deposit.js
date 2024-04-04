import React, { useContext, useEffect, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App'
import QuickAmountCard from './QuickAmountCard'
import BASE_URL, { upiurl, upiurl2 } from '../api_url'
import axios from 'axios'
import floatings from '../images/galaxysone/g2.png'
import { BiSolidCoinStack } from 'react-icons/bi'
import { HiMiniArrowLongLeft } from 'react-icons/hi2'
import { PiArrowCircleUpRightLight } from "react-icons/pi";

const Deposit = () => {

    const navigate = useNavigate();

    const { userDetails, setUserDetails, getUserDetails, user, toaster } = useContext(ContextApi);

    const [Deposit, setDeposit] = useState('')
    const [selected, setSelected] = useState()
    const [amounts, setAmounsts] = useState({});
    const [upichannel, setUpichannel] = useState('1')

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


    const amount = [500, 1800, 5400, 18500, 50000, 95000]

    const handleRecharge = () => {
        if (parseInt(Deposit)) {
            if (Number(250) > Number(Deposit)) {
                toaster(`Amount should be greater than ₹${250}`);
                return;
            }
            // navigate(`/recharge_window/${Deposit}`);
            else if (upichannel === '1') {
                window.location.href = `${upiurl}/${localStorage.getItem('uid')}/${Deposit}/`
                return
            }
            else if (upichannel === '2') {
                window.location.href = `${upiurl2}/${localStorage.getItem('uid')}/${Deposit}/`
                return
            }
            else {
                toaster('Server busy. Please try again later.')
                return
            }

        } else {
            toaster('Enter a valid recharge amount');
        }
    }

    useEffect(() => {
        const getData = async () => {

            //console.log('hello');
            const dataRes = await axios.get(`${BASE_URL}/amounts`).then(({ data }) => data);
            //console.log(dataRes);
            if (dataRes) {
                // console.log(dataRes);
                setAmounsts(dataRes);
            }

        }

        getData()

    }, [])


    return (

        <>

            <div className=" after:contents-[' '] after:fixed p-5">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Recharge</h2>

                        </div>
                    </header>

                    <div className="row mb-3">
                        <div className="w-full">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row">
                                            <div className="input-group mb-3">
                                                <button style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} className="btn btn-outline-primary text-black colorinput">₹</button>
                                                <input autoComplete='off'
                                                    onChange={e => { setDeposit(e.target.value); setSelected() }}
                                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                    name="amount"
                                                    id="amount"
                                                    className="form-control p-3 colorinput"
                                                    placeholder="Input recharge amount"
                                                    type="number"
                                                    value={Deposit}
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4" style={{ margin: '20px 0' }}>

                                                {amount.map((data, index) =>
                                                    <QuickAmountCard key={index} id={index} selected={selected} setSelected={setSelected} amount={data} setDeposit={setDeposit} />
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '16px' }}>
                        <div className="w-full">
                            <div className="customborder p-2">
                                <div className="p-2 mb-2">
                                    <div className="flex justify-between items-center mb-2" style={{ borderBottom: '1px solid #fcfc78' }}>
                                        <label className="text-black text-[15px] flex items-center">
                                            <PiArrowCircleUpRightLight size={15} className='mx-2' />UPI Channel-1
                                        </label>
                                        <span><input autoComplete='off' type="radio" defaultChecked className="bankOption" name="bankOption" value="1" onChange={(e) => setUpichannel(e.target.value)} /></span>

                                    </div>
                                    <div className="flex justify-between items-center mb-2" style={{ borderBottom: '1px solid #fcfc78' }}>
                                        <label className="text-black text-[15px] flex items-center">
                                            <PiArrowCircleUpRightLight size={15} className='mx-2' />UPI Channel-2
                                        </label>
                                        <span><input autoComplete='off' type="radio" className="bankOption" name="bankOption" value="2" onChange={(e) => setUpichannel(e.target.value)} /></span>
                                    </div>

                                    {/* <div className="flex justify-between items-center mb-2" style={{ borderBottom: '1px solid #fcfc78' }}>
                                        <label className="text-black text-[15px] flex items-center">
                                            <PiArrowCircleUpRightLight size={15} className='mx-2' />Pay Using our Crypto Channel-3
                                        </label>
                                        <span><input autoComplete='off' type="radio" className="bankOption1" name="bankOption" value="3" onChange={(e) => setUpichannel(e.target.value)} /></span>

                                    </div> */}
                                </div>
                                {/* <div id="crypto-details" className="mb-1" style="display: none;">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4 text-center customborder p-3 mb-3 mx-2">
                                            <h4 className="text-black">paytm upi id </h4>

                                            <div className="mb-2">
                                                <img src="/uploads/05aca3e6-f859-487d-908f-e13e49b44893.png" width="200" className="img-fluid">
                                            </div>
                                            <span className="fs-4 text-black mb-2">Payment Address</span>
                                            <div className="input-group mb-2">
                                                <input autoComplete='off' type="text" className="form-control" value="paytmqrg9p0bdgrr7@paytm" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" id="wallet-address-input">
                                                    <button className="btn btn-outline-secondary text-black" type="button" id="button-addon2" onclick="copyToClipboard('wallet-address-input')"><i className="bi bi-copy"></i></button>
                                            </div>

                                            <div className="mb-2">
                                                <label className="fs-4 text-black">Pay Amount</label>
                                                <h4 className="text-black">600.00</h4>
                                            </div>
                                            <span className="text-danger">Note<b>*</b>: Please Pay only paytm  token</span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <p className="text-black text-center mt-3 mb-4"><small>The minimum recharge amount is  350Rs</small></p>

                    <div className="text-center mb-5">
                        <button onClick={handleRecharge} className="btn btn-primary">Recharge</button>
                    </div>

                </div>
            </div>


        </>
    )
}

export default Deposit