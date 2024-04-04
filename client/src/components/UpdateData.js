import React, { useContext, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App';
import BASE_URL from '../api_url';
import axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';

const UpdateData = () => {

    const navigate = useNavigate();


    const {
        setLoading,
        toaster,
        userDetails

    } = useContext(ContextApi);

    const [name, setName] = useState(userDetails?.name)
    const [email, setEmail] = useState(userDetails?.email)


    const handleRegister = async () => {

        if (name.length === 0) {
            toaster('name cannot be empty')
        }

        else {

            await axios.post(`${BASE_URL}/userdetailsUpdate`,
                { name, email, _id: localStorage.getItem('uid') }).then(() => {
                    toaster('Data successfully updated!');
                    setTimeout(() => {
                        navigate('/account')
                    }, 3000);
                })
                .catch(error => toaster('Some Error Occured'));
        }

    }


    return (
        <>
            <div className="after:contents-[' '] after:fixed h-screen text-black ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px] bg-black">
                        <div className="bg-black max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/home'} className="w-[60px] h-[50px] left-0 text-center text-black text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-black ' >Edit Profile</h2>

                        </div>
                    </header>

                    <div className="m-[10px] p-[10px] relative">

                        <div className="numberi" data-v-380ab766="">
                            {/* <img src={phone} alt="" data-v-380ab766="" /> */}
                            {/* <BsFillPersonFill /> */}
                            <p data-v-380ab766="">Name</p>
                        </div>

                        <div className="van-cell van-field input-box" data-v-380ab766="">

                            <div className="van-cell__value van-field__value flex-1 ">

                                <div className="van-field__body">

                                    <input onChange={e => { setName(e.target.value) }}
                                        type="tel"
                                        inputMode="numeric"
                                        id="van-field-1-input"
                                        className="van-field__control inline-block"
                                        placeholder="Please enter your name"

                                    />


                                </div>

                            </div>
                        </div>

                        <div className="numberi" data-v-380ab766="">
                            {/* <img src={password} alt="" data-v-380ab766="" /> */}
                            <p data-v-380ab766="">Email</p>
                        </div>

                        <div className="van-cell van-field input-box" data-v-380ab766="">
                            <div className="van-cell__value van-field__value">
                                <div className="van-field__body">
                                    <input onChange={e => setEmail(e.target.value)}
                                        type="password"
                                        id="van-field-3-input"
                                        className="van-field__control"
                                        placeholder="Please enter your email"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center space-x-3 text-[4vw]">
                            {/* <Link to={'/signup'} className='h-[13vw] w-full'>
                                <button className='btnbox h-[13vw] w-full bg-[#2b2b2b] rounded-sm text-[#6e6e6e] font-bold' >Register</button>
                            </Link> */}
                            <button onClick={handleRegister} className='btnbox h-[13vw] w-full bg-[#0098e7] rounded-lg text-[#074762] font-bold'>Confirm</button>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default UpdateData