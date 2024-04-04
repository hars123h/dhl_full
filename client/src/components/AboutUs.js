import React, { useEffect, useRef, useState } from 'react'
import aboutusimg from "../images/galaxysone/aboutusimg.jpg";
import { Link } from 'react-router-dom';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import Navbar from './Navbar';
import YouTube from 'react-youtube';
import aboutimg from '../images/btc/aboutimg.jpg'
import aboutimg2 from '../images/btc/aboutimg2.jpg'

const AboutUs = () => {

    const ref = useRef('');

    const [dim, setdim] = useState([])

    useEffect(() => {
        window.onresize = () => {
            if (ref.current === null)
                return;
            var newDim = [ref.current?.offsetWidth, ref.current?.innerHeight]
            setdim(newDim)
        }
        var newDim = [ref.current?.offsetWidth, ref.current?.innerHeight]
        setdim(newDim)
    }, [])


    return (
        <>

            <Navbar />


            <div className="px-3 mt-1 flex-col mb-20" style={{ width: '100vw' }}>
                <div className="mb-5 mt-3">

                    <h4 class="text-center text-black mb-5">About</h4>

                    <div className="row ">
                        <div className="col-span-12">
                            <div className="p-3 customborder  rounded-sm ">
{/* 
                                <div ref={ref} className="">
                                    <iframe width={dim[0]} height={dim[1]} src="https://www.youtube.com/embed/MpcMXUtmV8I?si=ZiVZjJAB68CFLr4t&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div> */}

                                <h3 class="text-center text-black mt-4 mb-5 ">DHL</h3>

                                <p className='text-black'>
                                    <br />
                                    Today, DHL is the world's leading logistics company. Our 600,000 people in over 220 countries and territories work every day to help you cross borders, reach new markets and grow your business. Or simply send a letter to your loved ones.                                       <br /><br />

                                    <img src={aboutimg2} className='mb-5' alt="" />

                                    DHL Group is the world's leading logistic company. The Group connects people and markets and is an enabler of global trade. It aspires to be the first choice for customers, employees and investors worldwide.                                    <br /><br />


                                    <img src={aboutimg} className='mb-5' alt="" />

                                    In summary, I am drawn to DHL because of its strong reputation, innovative approach, global exposure, opportunities for career growth, and positive work culture. I am confident that working at DHL will not only be a fulfilling professional experience but also a great opportunity to contribute to the company's success.                                    <br /><br />



                                    Deutsche Post began to acquire shares in DHL in 1998, acquiring a controlling interest in 2001. By the end of 2002, Deutsche Post had acquired all of DHL's remaining stock, and absorbed the operation into its Express division. The DHL brand was expanded to other Deutsche Post divisions, business units and subsidiaries.                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AboutUs