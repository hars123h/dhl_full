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

                                <h3 class="text-center text-black mt-4 mb-5 ">Intel</h3>

                                <p className='text-black'>
                                    Intel <br /><br />
                                    Intel is best known for developing the microprocessors found in most of the world’s personal computers. The multinational technology company is also the world’s largest manufacturer by revenue of semiconductor chips, a product used in most of the world’s electronic devices. Intel’s microprocessors are supplied and used in computers at several large tech companies, including Dell, HP, and Lenovo. Intel also manufactures graphics chips, flash memory, motherboard chipsets, and other computing devices. In recent years, Intel has invested heavily in the world of artificial intelligence, including the December 2019 acquisition of A.I. chipmaker Habana Labs for $2 billion. Recently, Intel made headlines when it introduced an artificial intelligence assistant at Lee’s Famous Recipe Chicken Restaurants in Ohio, which uses voice recognition technology to quickly and efficiently take customers’ orders.
                                    <br /><br />

                                    We create world-changing technology that improves the life of every person on the planet.
                                    <br /><br />
                                    Intel put the silicon in Silicon Valley. For more than 50 years, Intel and our people have had a profound influence on the world, driving business and society forward by creating radical innovation that revolutionizes the way we live.
                                    <br /><br />
                                    Today we are applying our reach, scale, and resources to enable our customers to capitalize more fully on the power of digital technology. Inspired by Moore’s Law, we continuously work to advance the design and manufacturing of semiconductors to help address our customers’ greatest challenges.
                                    <br /><br />
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AboutUs