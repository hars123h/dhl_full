import React, { useContext } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import inviteBg from '../images/invitebg.png'
import { Link } from 'react-router-dom'
import img02 from '../images/02.svg'
import ticket from '../images/ticket.png'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ContextApi } from '../App'
import LV1 from '../images/LV1.png'
import LV2 from '../images/LV2.png'
import LV3 from '../images/LV3.png'
import { HiMiniArrowLongLeft } from 'react-icons/hi2'

const Invite = () => {

    const { userDetails, setUserDetails, getUserDetails, user, toaster } = useContext(ContextApi);

    const origin = window.location.origin


    return (
        <>

            <div className="mx-auto bgimg overflow-hidden px-5 h-screen">
                <div className="w-full mx-auto max-w-[800px] " >

                    <div className='mb-12'>

                        <header className="h-[50px] leading-[50px] block mb-[10px]">
                            <div className=" max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto z-[9999] flex flex-wrap items-center justify-between p-4 ">

                                <Link to={'/account'} className="w-[60px] h-[50px] text-center text-black z-[2] flex justify-center items-center ">
                                    <HiMiniArrowLongLeft size={22} /> <span className='text-lg'>Back</span>
                                </Link>

                                <h2 className=' text-center text-lg font-medium z-[1] text-black ' >Invite Link</h2>

                            </div>
                        </header>

                    </div>

                    <div className="row justify-between">
                        <div className="w-full">
                            <div className="customborder p-3">
                                <div className="row pt-2">
                                    <div className="w-10/12">
                                        <strong className="text-black text-lg">Referral Link:</strong> &nbsp; &nbsp;
                                        <span id="referral-link">
                                            <a className="text-black" target="_blank" href="/Auth/Register?REF=130525665">{`${origin}/signup?REF=${userDetails?.user_invite}`}</a>
                                        </span>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="btn-group">
                                            <CopyToClipboard text={`${origin}/signup?REF=${userDetails?.user_invite}`} onCopy={() => toaster('Copy Success')}>

                                                <button type="button" className="btn mb-1 btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-share"></i> Share &amp; Copy
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row" style={{ margin: '24px 0' }}>
                        {/* <div className="w-full"> */}
                        <div className="p-2 customborder">
                            <div className="">
                                <div className="p-2 text-black text-[15px]">
                                    <div className="row p-3">
                                        <h6 className="text-black mb-4">Notice</h6>
                                        <ol className="text-black list-decimal">
                                            <li>Copy your exclusive invitation link or invitation code to invite your friends to join your team.</li>
                                            <li>Invite your friends to join your team and you will get team commission.</li>
                                            <li> After your members join your team, you can get the daily revenue share of all device of your team members:
                                                <br />
                                                If you invite A to get 10%
                                                <br />
                                                A invites B to get 3%.
                                                <br />
                                                B invites C to get 2%.
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                </div>
            </div>


        </>
    )
}

export default Invite