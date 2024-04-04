import React from 'react'
import Card from './Card'
import img201 from '../images/201.png'
import img301 from '../images/301.png'
import { Link } from 'react-router-dom'
import { LiaAngleLeftSolid } from 'react-icons/lia'

const Article = () => {
    return (
        <>
            <div className="after:bg-white after:contents-[' '] after:fixed ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[rgb(1,77,173)] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/home'} className="w-[60px] h-[50px] left-0 text-center text-black text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-black ' >Article</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">
                        <div className="my-[10px] mx-[5px]">

                            <div className="flex">

                                <div className="flex-1 ">

                                    <Card
                                        img={img201}
                                        title={'gift'}
                                        content={'A small gift for all VIP usersCycle: one day Income: 300 quick pick up Stop time: 21:30'}
                                        timestamp={'2023-08-24 20:22:04'}
                                    />

                                    <Card
                                        img={img201}
                                        title={'Link change'}
                                        content={'dear user Our promotion link will be changed frequently, it is recommended that you use the APP to log in If you need the latest link, please click to copy the latest link in the sharing interface'}
                                        timestamp={'2023-08-22 13:07:04'}
                                    />

                                    <Card
                                        img={img301}
                                        title={'A small gift for all VIP users'}
                                        content={'Cycle: one day Income: 300 quick pick up Stop time: 14:00'}
                                        timestamp={'2023-08-20 13:18:04'}
                                    />
                                </div>

                                <div className="flex-1 ">

                                    <Card
                                        img={img301}
                                        title={'Welfare release'}
                                        content={'Today&#39s system has been updated, it will be more stable and secure, so 2 super event products will be sent to users again'}
                                        timestamp={'2023-08-22 20:08:42'}
                                    />

                                    <Card
                                        img={img201}
                                        title={'Quickly join'}
                                        content={'Quickly join Infosys and become a VIP🤑🤑🤑 We will send a lot of gifts to our trusted and loyal users in the days to come.'}
                                        timestamp={'2023-08-24 20:22:04'}
                                    />

                                    <Card
                                        img={img301}
                                        title={'Call for prizes'}
                                        content={'announcement We need more withdrawal screenshots for display Let more users see that there will be no problem with withdrawing money in Infosys Please send the screenshot of your withdrawal to the bank card today to our customer service, if your screenshot is true and qualified, then we will reward you 50Rs The activity ends at 18:00'}
                                        timestamp={'2023-08-24 20:22:04'}
                                    />
                                </div>

                            </div>

                            {/* <Link to={`/article`} className="m-5 flex flex-wrap justify-center items-center w-full">

                    <div className="font-bold text-[rgba(52,86,255,0.9)] text-base flex items-center">
                        MORE <HiOutlineChevronDoubleRight size={18} />
                    </div>

                </Link> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article