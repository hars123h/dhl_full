import React, { useContext, useEffect, useState } from 'react'
import taskBG from '../images/04.png'
import { Link } from 'react-router-dom'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { TbTicket } from 'react-icons/tb'
import { BiCopy, BiSolidGift } from 'react-icons/bi'
import axios from 'axios'
import BASE_URL from '../api_url'
import { ContextApi } from '../App'
import Navbar from './Navbar'
import { BsFillEnvelopePaperHeartFill, BsFlagFill } from 'react-icons/bs'
import CopyToClipboard from 'react-copy-to-clipboard'
import { PiCopyBold } from 'react-icons/pi'
import giftimg from '../images/galaxysone/giftimg.png'
import planateglob from '../images/galaxysone/planateglob.png'
import { HiMiniArrowLongLeft } from 'react-icons/hi2'


const Task = () => {

    const date = new Date();

    const { userDetails, setUserDetails, getUserDetails, user, toaster, vipimg } = useContext(ContextApi);

    const [level_1, setLevel_1] = useState(0)
    const [signinrewardactive, setSigninrewardactive] = useState(new Date(userDetails?.last_signin_reward) < date)

    const handelSignin = async () => {
        await axios.post(`${BASE_URL}/signinReward`, { _id: localStorage.getItem('uid') }).then(responce => {
            // console.log(responce);
            toaster(responce.data.message)
            setSigninrewardactive(new Date(responce.data.last_signin_reward) < date)
        }).catch(error => {
            toaster("Something went wrong")
        })
    }

    useEffect(() => {
        const level1 = async () => {
            await axios.post(`${BASE_URL}/lvl1`, { user_id: localStorage.getItem('uid') }).then(responce => {
                // console.log(responce);
                // toaster(responce.data.message)
                setLevel_1(responce.data.level1.filter(element => element.vipLevel > 0).length)

            }).catch(error => {
                console.log(error);
                toaster("Something went wrong")
            })
        }
        level1()
    }, [])

    // const directMemberVip = level_1.filter(element => element.vipLevel > 0)

    // console.log(directMemberVip.length);
    // console.log(level_1);

    // useEffect(() => {

    const activation = async () => {
        await axios.post(`${BASE_URL}/task_reward`, { _id: localStorage.getItem('uid'), count: level_1 }).then(responce => {
            // console.log(responce);
            toaster(responce.data.message)

        }).catch(error => {
            console.log(error);
            toaster("Something went wrong")
        })

    }

    //     activation()

    // }, [level_1, setLevel_1])

    // console.log(userDetails);



    // console.log(new Date(userDetails?.last_signin_reward) < date);


    const origin = window.location.origin

    console.log(origin);




    return (
        <>

            <div className="  after:contents-[' '] h-screen mb-5 px-5">
                <div className="w-full mx-auto max-w-[800px] mb-5">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto z-[9999] flex flex-wrap items-center justify-between p-4 ">

                            <Link to={'/account'} className="w-[60px] h-[50px] text-center text-white z-[2] flex justify-center items-center ">
                                <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                            </Link>

                            <h2 className=' text-center text-lg font-medium z-[1] text-white ' >Gift</h2>

                        </div>
                    </header>
                </div>

                <div className="row">
                    <div className="w-full">
                        <div className="p-2 customborder">
                            <div className="">
                                <div className="p-2 text-white">
                                    <div className="row">
                                        <div className="input-group mb-3">
                                            <a className="btn btn-outline-primary text-white colorinput" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} >Code</a>
                                            <input
                                                type="text"
                                                name="GiftCode"
                                                className="form-control p-3 colorinput"
                                                placeholder="Please input gift code"
                                                aria-label="Recipient's username"
                                                aria-describedby="button-addon2"
                                                required=""
                                                data-val="true"
                                                data-val-required="The GiftCode field is required."
                                                id="GiftCode"
                                                value=""
                                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                            />
                                        </div>
                                        {/* <div className="mb-2">
                                            <button id="login-submit" type="submit" style="border-radius:5px;" className="btn-primary btn-lg fw-bold mx-auto d-block btn-sm">Get Gift</button>
                                            <p className="text-center mt-2" style="font-size:10px">The gift amount also can be withdrawal or buy device.</p>
                                        </div> */}
                                        <div className="text-center mb-3">
                                            <button style={{ fontSize: '.75rem', padding: '0.15rem 0.5rem', borderRadius: '5px' }} className="btn btn-primary w-fit" >Get Gift</button>
                                            <p className="text-center mt-2 text-[10px]">The gift amount also can be withdrawal or buy device.</p>
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

export default Task