import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AmountContext, ContextApi } from '../App.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import BASE_URL from '../api_url.js';
import img1 from '../images/asml/assets/asset 1.png';
import img2 from '../images/asml/assets/asset 2.png';
import img3 from '../images/asml/assets/asset 3.png';
import img4 from '../images/asml/assets/asset 4.png';
import img5 from '../images/asml/assets/asset 5.png';
import img6 from '../images/asml/assets/asset 6.png';
import qr from '../images/galaxysone/qr.jpeg';
import paymentlogo from '../images/paymentlogo.jpg';

const RechargeWindow = () => {

    const { recharge_value } = useParams();
    const [refno, setRefno] = useState('');
    const [amounts, setAmounsts] = useState({});
    // const amountDetails = useContext(amounts);
    const { userDetails, setUserDetails, getUserDetails, user, toaster, setLoading } = useContext(ContextApi);
    const navigate = useNavigate();



    const handleRecharge = async () => {
        //console.log({ refno, recharge_value, status: 'pending' });
        if (refno.length !== 12) {
            toaster('Enter a valid Ref No. of 12 digits');
            return;
        }

        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/place_recharge`, {
                refno,
                recharge_value,
                status: 'pending',
                user_id: localStorage.getItem('uid'),
                mobno: userDetails.mobno,
                time: new Date(),
                parent_id: userDetails.parent_id,
                grand_parent_id: userDetails.grand_parent_id ? userDetails.grand_parent_id : '',
                great_grand_parent_id: userDetails.great_grand_parent_id ? userDetails.great_grand_parent_id : ''
            }).then((response) => {
                console.log(response.data);
                if (response.data.message === 'refno already exists') {
                    setLoading(false)
                    toaster('RefNo already exists');
                    setRefno('');
                    console.log('RefNo already exists');
                } else {
                    setLoading(false)
                    toaster('Request Placed Successfully!');
                    setRefno('');
                    console.log('Recharge placed successfully!');
                    setTimeout(() => {

                        navigate('/deposit_records')

                    }, 3000);
                }
            })
            //console.log("Document written with ID: ", docRef1.id, docRef2.id);
        } catch (e) {
            setLoading(false)
            console.error("Error adding document: ", e);
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

    return (
        <div className='sm:h-[700px] md:h-[950px] flex flex-col   bg-white relative'>

            <div className="options items-start justify-center text-white flex flex-col pt-4 pb-4 mx-3 pl-2 bg-[#dd3b3b]  ">
                {/* <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/mine')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  storke-white  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg> */}
                <div className='text-xs p-[0.5px]'>Amount Payable</div>
                <div className='p-[0.5px] text-3xl font-semibold'>&#8377; {recharge_value}</div>
            </div>

            <div className="options items-start justify-center text-white flex flex-col pt-4 pb-4 mx-3 pl-2 bg-white border-gray-200 border-[1px] rounded-lg mt-4  ">
                <div className='font-semibold text-gray-500 py-2 text-center w-full'>Scan this QR to pay</div>
                <img src={qr} alt="" className='mx-auto' />
                <div className=' text-gray-400 font-semibold py-2 text-center w-full px-4'>
                    <img src={paymentlogo} alt="" />
                </div>
                <div className='font-semibold text-red-500 py-2 text-center w-full'>or directly transfer to under UPI</div>
                <div className="flex gap-2 items-center w-full justify-center px-4">
                    <div className='border-gray-400 border-[1px] rounded-lg bg-gray-100 py-3 px-2 w-3/4 text-gray-600'>
                        ${amounts.upi_id}
                    </div>
                    <CopyToClipboard text={`${amounts.upi_id}`} onCopy={() => toaster('copy succeded')}>
                        <div
                            className='w-1/4 text-sm px-2 text-center py-3 text-blue-800 cursor-pointer border border-blue-800 rounded-md'>
                            Copy</div>
                    </CopyToClipboard>

                </div>
                <div className='flex flex-col px-4 gap-1 border-b border-gray-100'>
                    {/* <div className='text-sm border-y-2 border-gray-50 py-3 tl'><span >Step 2: Submit Ref No/Reference No/UTR </span></div> */}
                    <input value={refno} onChange={e => setRefno(e.target.value)} type="text"
                        placeholder='Input 12-digit here' className=' tp pt-4 text-black' />
                    <div className='tt text-xs mb-3'>Generally, your transfer will be confirmed within 10 minutes.</div>
                </div>
            </div>

            {/* <div className='flex flex-col items-center gap-1 mt-4'>
                <CopyToClipboard text={`${recharge_value}`} onCopy={() => toaster('copy')}>
                    <div className='mb-1 text-xs text-gray-600 font-semibold'>click the amount to copy</div>
                </CopyToClipboard>
                <div className='text-6xl font-bold'>&#8377; {recharge_value}.00</div>
                <div className='text-md'><span className='text-gray-400 font-semibold mr-2 pt-4'>Serial No.</span> 1643489836485865684</div>
            </div> */}

            {/* <div className='flex flex-col p-2 gap-1 border-b border-gray-100'>
                <div className='text-sm border-y-2 border-gray-50 py-3 tl'><span >Step 1: Transfer</span><span className='text-[#d375de] ml-2'>&#8377; {recharge_value}.00 to the following upi</span></div>
                <div className="flex flex-col items-center w-full">
                    <div className='text-center bg-[#f5f8c2] py-3 mt-1 text-lg mb-4 w-full'>{amountDetails.upi_id}</div>
                    <CopyToClipboard text={`${amountDetails.upi_id}`} onCopy={() => toaster('copy')}>
                        <div className='text-sm px-3 py-1 text-red-800 cursor-pointer border border-red-800 rounded-md'>Copy Beneficiary UPI</div>
                    </CopyToClipboard>
                </div>
                <div className='tt mb-1 mt-3'>1. Open your UPI wallet and complete the transfer </div>
                <div className='tt'>2. Record your reference No.(Ref No.) after payment</div>
            </div> */}

            {/* <div className='flex flex-col px-2 gap-1 border-b border-gray-100'>
                <div className='text-sm border-y-2 border-gray-50 py-3 tl'><span >Step 2: Submit Ref No/Reference No/UTR </span></div>
                <input value={refno} onChange={e => setRefno(e.target.value)} type="text" placeholder='Input 12-digit here' className=' tp pt-4' />
                <div className='tt ml-2 mb-3'>Generally, your transfer will be confirmed within 10 minutes.</div>
            </div> */}

            <div className='flex flex-col px-4 gap-2 py-2 border-[1px] border-gray-200 mx-3 mt-2 rounded-lg bg-white pb-[100px]'>
                <div className='tt mb-1 mt-1'>Where to find Ref No.</div>
                <img src={img1} alt="img1" />
                <img src={img2} alt="img1" />
                <img src={img3} alt="img1" />
                <img src={img4} alt="img1" />
                <img src={img5} alt="img1" />
                <img src={img6} alt="img1" />
            </div>

            {/* <div className="fixed bottom-0 border-t border-confirm w-full bg-[#f7f7fa] ">
                <button onClick={handleRecharge} className='bg-confirm py-2 text-white text-lg w-full rounded-md my-5'>Submit Ref. Number</button>
            </div> */}

            <div className="fixed bottom-0 border-t border-confirm w-full bg-[#f7f7fa] px-5 z-50 ">
                <button onClick={handleRecharge} className='w-full flex-1 text-white bg-[#dd3b3b] border-0 border-[rgba(215,215,215,0.6)] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative '>
                    Submit Ref. Number
                </button>

            </div>
        </div>
    )
}

export default RechargeWindow;