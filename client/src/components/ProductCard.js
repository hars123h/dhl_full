import React, { useContext, useEffect, useState } from 'react'
import { RiVipLine } from 'react-icons/ri'
import { BiRightArrowAlt } from 'react-icons/bi'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { ContextApi } from '../App'
import axios from 'axios'
import BASE_URL from '../api_url'
import bgimmg from '../images/galaxysone/cardimg.jpg'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ active, pre_sale, long_plan_state, product_type, product_image, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle, handleClick }) => {

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    const navigate = useNavigate();

    const {
        userDetails, setUserDetails,
        loading, setLoading,
        text, setText,
        toasterShow, setToasterShow,
        toasterText, setToasterText,
        toaster, getUserDetails
    } = useContext(ContextApi);

    const [vipColor, setVipColor] = useState('text-[#b3bdc4]')
    const [pop, setpop] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const lvl1plan = userDetails?.plans_purchased?.filter(e => e.product_type === 1)

    // console.log(lvl1plan);

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
        } else {
            if ((Number(quantity) * Number(plan_amount)) > Number(userDetails.recharge_amount)) {
                toaster("The available balance is insufficient, please recharge");
                // setBalanceIndicator(true);
                // setTimeout(() => {
                //     setBalanceIndicator(false);
                // }, 3000);
            }

            else if (product_type > userDetails.vipLevel) {
                toaster("Insufficient inventory of products availbale for purchase")
            }
            else {

                setLoading(true)

                await axios.post(`${BASE_URL}/purchase`, {
                    recharge_amount: Number(userDetails.recharge_amount) - Number(Number(quantity) * Number(plan_amount)),
                    investAmount: Number(Number(quantity) * Number(plan_amount)),
                    boughtLong: (product_type === 'vip' ? 1 : 0),
                    boughtShort: (product_type === '' ? 1 : 0),
                    user_id: localStorage.getItem('uid'),
                    parent_id: userDetails.parent_id,
                    grand_parent_id: userDetails.grand_parent_id,
                    great_grand_parent_id: userDetails.great_grand_parent_id,
                    plan_price: plan_amount,
                    plans_purchased: {
                        product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle,
                        quantity: quantity,
                        date_purchased: new Date().toDateString(),
                        date_till_rewarded: new Date().toDateString(),
                        time: new Date().toDateString(),
                        ddmmyy: new Date().getMilliseconds(),
                        fullTime: new Date().addDays(plan_cycle).toDateString()
                    }
                }).then(() => {
                    console.log('Product successfully purchased');
                    setLoading(false)
                    toaster('Plan purchased!');
                    getUserDetails()
                    setpop(!pop)
                }).catch((error) => {
                    console.log('Some error occured', error);
                    setLoading(false)
                    toaster('Some error occured, try again after some time');
                })

            }

        }
    }

    const handelClick = () => {

        const plan = userDetails?.plans_purchased?.filter((e) => e.plan_amount === plan_amount)

        if (plan?.length !== 0 && product_type !== 0) {
            toaster('You can buy this plan only once')
            return
        }

        else if (userDetails?.plans_purchased.length === 0 && product_type !== 0){
            toaster('Buy ordinary plan first')
            return
        }

        else {

            const data = {
                recharge_amount: Number(userDetails.recharge_amount) - Number(Number(quantity) * Number(plan_amount)),
                investAmount: Number(Number(quantity) * Number(plan_amount)),
                boughtLong: (product_type === 'vip' ? 1 : 0),
                boughtShort: (product_type === '' ? 1 : 0),
                user_id: localStorage.getItem('uid'),
                parent_id: userDetails.parent_id,
                grand_parent_id: userDetails.grand_parent_id,
                great_grand_parent_id: userDetails.great_grand_parent_id,
                plan_price: plan_amount,
                plans_purchased: {
                    product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle,
                    quantity: quantity,
                    date_purchased: new Date(),
                    date_till_rewarded: new Date(),
                    time: new Date().toDateString(),
                    ddmmyy: new Date().getMilliseconds(),
                    fullTime: new Date().addDays(plan_cycle)
                }
            }

            navigate('/productdetail', { state: { data, product_image, pre_sale, product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle, quantity } })



        }

    }

    useEffect(() => {
        setQuantity(Math.max(quantity, 1))
    }, [quantity, setQuantity])



    useEffect(() => {
        if (product_type > 0) {
            setVipColor('text-[#ffa74f]')
        }
        getUserDetails();

    }, [product_type])




    return (
        <>

            <div className="row mb-2">
                <div className="col-12">


                    <div className="p-2 customborder">


                        <a className='' style={{ textDecoration: 'none' }} >
                            <div className="flex items-center">

                                <div className="text-center">
                                    <img src={product_image} className="rounded-md" width="50" />
                                </div>
                                <div className="p-2 text-white">
                                    <h6 className="text-white">{plan_name}</h6>
                                    <div className="flex  ">
                                        <div className="md:col-span-8 col-span-10 ">
                                            <span>Revenue Type</span>
                                        </div>
                                        <div className=" pl-3">
                                            <span className="text-red-400">Daily income</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ marginTop: '1rem' }} className="row table-responsive text-white text-center overflow-hidden rounded-[100px] shadow-[2px_1px_15px_-4px_#000000]" >
                                <table className='overflow-hidden' >
                                    <tbody><tr>
                                        <th>{(plan_daily_earning * plan_cycle).toFixed(2)}</th>
                                        <th>{plan_daily_earning.toFixed(2)}</th>
                                        <th>{plan_cycle}</th>
                                    </tr>
                                        <tr className='text-[10px]' >
                                            <td>Total Revenue</td>
                                            <td>Daily Income</td>
                                            <td>Work Days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </a>
                        <div className="flex mt-5 ">
                            <a >
                                <div className="">
                                    <span className="text-center text-red-400">{plan_amount.toFixed(2)}</span>
                                </div>
                            </a>
                            <div className=" mx-auto block ">
                                <a >
                                    <span></span>
                                </a>
                                {!pre_sale ?
                                    <button onClick={handelClick} className="btn btn-primary border border-solid border-[#3b7ddd] text-sm text-white px-3 py-1 rounded-lg" >Buy Now</button>
                                    :
                                    <button disabled className="btn btn-primary border border-solid border-[gray] text-sm text-white px-3 py-1 rounded-lg" style={{ background: 'gray', borderColor: 'gray' }} >Pre Sale</button>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}

export default ProductCard