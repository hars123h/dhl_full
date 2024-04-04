import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import v0 from '../images/v0.png'
import v01 from '../images/v01.png'
import v1 from '../images/v1.png'
import v2 from '../images/v2.png'
import v3 from '../images/v3.png'
import v4 from '../images/v4.png'
import v5 from '../images/v5.png'
import v6 from '../images/v6.png'
import v7 from '../images/v7.png'
import v8 from '../images/v8.png'
import { ContextApi } from '../App'
import { HiMiniArrowLongLeft } from 'react-icons/hi2'
import BASE_URL from '../api_url'
import axios from 'axios'

const Vip = () => {

    const { vipimg, setVipimg } = useContext(ContextApi);

    const { userDetails, setUserDetails, setUser, getUserDetails, toaster, user } = useContext(ContextApi);

    const [level_1, setLevel_1] = useState(0)

    useEffect(() => {
        const level1 = async () => {
            await axios.post(`${BASE_URL}/lvl1`, { user_id: localStorage.getItem('uid') }).then(responce => {
                // console.log(responce);
                // toaster(responce.data.message)
                setLevel_1(responce.data.level1.filter(element => element.plans_purchased.length > 0).length)

            }).catch(error => {
                console.log(error);
                toaster("Something went wrong")
            })
        }
        level1()
    }, [])

    const activation = async (reward, mem) => {
        await axios.post(`${BASE_URL}/task_reward`, { _id: localStorage.getItem('uid'), count: mem, reward: reward }).then(responce => {
            // console.log(responce);
            toaster(responce.data.message)

        }).catch(error => {
            console.log(error);
            toaster("Something went wrong")
        })

    }


    useEffect(() => {
        getUserDetails()
    }, [toaster])


    return (
        <>
            <div className="mx-auto bgimg  px-5">
                <div className="w-full mx-auto max-w-[800px]" >

                    <div className='mb-5'>

                        <header className="h-[50px] leading-[50px] block mb-[10px]">
                            <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto z-[9999] flex flex-wrap items-center justify-between p-4 ">

                                <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                    <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                                </Link>

                                <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Vip Upgrade</h2>

                            </div>
                        </header>

                    </div>

                    <div className="row">

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 1</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 5 ? '5' : level_1}</td>
                                                                <td>5</td>
                                                                <td>200Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 5 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 5 && level_1 >= 5 ?
                                                        <button onClick={() => activation(200, 5)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 2</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 10 ? '10' : level_1}</td>
                                                                <td>10</td>
                                                                <td>500Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 10 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 10 && level_1 >= 10 ?
                                                        <button onClick={() => activation(500, 10)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 3</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 20 ? '20' : level_1}</td>
                                                                <td>20</td>
                                                                <td>1500Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 20 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 20 && level_1 >= 20 ?
                                                        <button onClick={() => activation(1500, 20)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 4</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 35 ? '35' : level_1}</td>
                                                                <td>35</td>
                                                                <td>3000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 35 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 35 && level_1 >= 35 ?
                                                        <button onClick={() => activation(3000, 35)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 5</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 50 ? '50' : level_1}</td>
                                                                <td>50</td>
                                                                <td>5000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 50 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 50 && level_1 >= 50 ?
                                                        <button onClick={() => activation(5000, 50)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 6</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 80 ? '80' : level_1}</td>
                                                                <td>80</td>
                                                                <td>8000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 80 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 80 && level_1 >= 80 ?
                                                        <button onClick={() => activation(8000, 80)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 7</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 150 ? '150' : level_1}</td>
                                                                <td>150</td>
                                                                <td>15000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 150 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 150 && level_1 >= 150 ?
                                                        <button onClick={() => activation(15000, 150)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 8</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 250 ? '250' : level_1}</td>
                                                                <td>250</td>
                                                                <td>35000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 250 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 250 && level_1 >= 250 ?
                                                        <button onClick={() => activation(35000, 250)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 9</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 500 ? '500' : level_1}</td>
                                                                <td>500</td>
                                                                <td>60000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 500 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 500 && level_1 >= 500 ?
                                                        <button onClick={() => activation(60000, 500)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full">
                            <div className="tab-content ">

                                <div className="tab-pane active " id="tab-1" role="tabpanel">

                                    <div className="row mb-3 pt-3">

                                        <div className="w-full">

                                            <div className="p-2 customborder">
                                                <div className=" mt-2">
                                                    <h6 className="text-black text-center">Level 10</h6>
                                                </div>
                                                <div className="row table-responsive text-black text-center mt-3" style={{ overflow: 'hidden', boxShadow: '2px 1px 15px -4px #000000', borderRadius: '100px' }}>
                                                    <table style={{ overflow: 'hidden' }}>
                                                        <tbody><tr>
                                                            <th>Active</th>
                                                            <th>Team</th>
                                                            <th>Rewards</th>
                                                        </tr>
                                                            <tr style={{ fontSize: '10px' }}>
                                                                <td>{level_1 > 800 ? '800' : level_1}</td>
                                                                <td>800</td>
                                                                <td>150000Rs</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>
                                                <div className=" mt-3">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-[red]" role="progressbar" style={{ width: `${level_1 / 800 * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    {userDetails?.vipMemcount < 800 && level_1 >= 800 ?
                                                        <button onClick={() => activation(150000)} className="btn btn-primary btn-sm w-full ">Go It</button>
                                                        :
                                                        <button disabled className="btn btn-primary btn-sm w-full " style={{ background: 'gray', border: 'gray' }}>Go It</button>
                                                    }
                                                </div>

                                            </div>
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

export default Vip