import React, { useState } from 'react'
import noMessage from "../images/noMessage.svg";
import { Link } from 'react-router-dom';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';

const Message = () => {

    const [yourObject, setYourObject] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });

    const setKeyToOne = (key) => {
        setYourObject(prevState => {
            const newState = { ...prevState };
            Object.keys(newState).forEach(k => {
                newState[k] = (k === key) ? (newState[k] === 1 ? 0 : 1) : 0;
            });
            return newState;
        });

    };

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

                                <h2 className=' text-center text-lg font-medium z-[1] text-black ' >FAQ</h2>

                            </div>
                        </header>

                    </div>

                    <div className="row mb-3">
                        <div className="w-full">
                            <div className="p-2 customborder">
                                <div className="">
                                    <div className="p-2 text-black">
                                        <div className="row">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header bg-primary" id="headingOne ">
                                                        <button onClick={() => setKeyToOne('0')} className="accordion-button bg-primary text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                            1. Introduction of BIT Mining
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className={`accordion-collapse bg-primary `} style={{ display: yourObject[0] === 1 ? 'block' : 'none' }} aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                                                        <div className="accordion-body">
                                                            Set up in 1970, DNeX is a global technology company operating in three business segments namely, Technology, Energy, and Information Technology (“IT”).                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button onClick={() => setKeyToOne('1')} className="accordion-button bg-primary text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            2. What are the advantages of the company?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTwo" className={`accordion-collapse bg-primary  `} style={{ display: yourObject[1] === 1 ? 'block' : 'none' }} aria-labelledby="headingTwo" data-bs-parent="#accordionExample" >
                                                        <div className="accordion-body">
                                                            Dagang NeXchange Berhad (“DNeX”) has announced its financial results for the fifth quarter ended 30 September 2023 (“5Q FY2023”), delivering another profitable quarter amidst challenging business landscape.                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button onClick={() => setKeyToOne('2')} className="accordion-button bg-primary text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            3. How to mine Bitcoin?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className={`accordion-collapse bg-primary  `} style={{ display: yourObject[2] === 1 ? 'block' : 'none' }} aria-labelledby="headingThree" data-bs-parent="#accordionExample" >
                                                        <div className="accordion-body">
                                                            Our mission is to continue to expand and secure the Bitcoin network. We use the latest hardware and innovative infrastructure technologies to deliver industry-leading operational and energy efficiency. We specialize in self-discovery, whether on a website we own and operate, or through third-party hosting.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button onClick={() => setKeyToOne('3')} className="accordion-button collapsed bg-primary text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                            4. How about mining performance?
                                                        </button>
                                                    </h2>
                                                    <div id="collapse4" className={`accordion-collapse  bg-primary `} style={{ display: yourObject[3] === 1 ? 'block' : 'none' }} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            We are ushering in a new era of data center environments, delivering optimized performance, efficiency and availability to data-intensive organizations in the most sustainable manner.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button onClick={() => setKeyToOne('4')} className="accordion-button collapsed bg-primary text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                            5. Where are your mines divided into?
                                                        </button>
                                                    </h2>
                                                    <div id="collapse5" className={`accordion-collapse  bg-primary `} style={{ display: yourObject[4] === 1 ? 'block' : 'none' }} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            Our mines are distributed in Georgia, North Dakota, New York, Quebec, California, Boden, Sweden, and Levdal, Norway. By July 2023, we have deployed many mines in Europe, the United States, and Asia. Power bills and cooling are extremely important, and we utilize state-of-the-art infrastructure to ensure the environmental footprint of our computationally intensive processes is as small as possible. From the remote locations of our data centers, to the renewable energy and waste reduction solutions they use, we're taking sustainability to the next level.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button onClick={() => setKeyToOne('5')} className="accordion-button collapsed bg-primary text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                                            6. What does the cost of mining machine operation include?
                                                        </button>
                                                    </h2>
                                                    <div id="collapse6" className={`accordion-collapse  bg-primary `} style={{ display: yourObject[5] === 1 ? 'block' : 'none' }} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            Electricity expenses,Refrigeration,Maintenance work and baby sitting program.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button onClick={() => setKeyToOne('6')} className="accordion-button collapsed bg-primary text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                                            7. When will I receive my proceeds??
                                                        </button>
                                                    </h2>
                                                    <div id="collapse7" className={`accordion-collapse  bg-primary `} style={{ display: yourObject[6] === 1 ? 'block' : 'none' }} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            Daily mining usually starts at 00:00 UTC and ends at 23:59:59 UTC. Therefore, the time between outputs can sometimes be greater than 24 hours or less than 24 hours. In any case, you will definitely receive daily mining output.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item bg-primary">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button onClick={() => setKeyToOne('7')} className="accordion-button collapsed bg-primary text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                                            8. The vision of the company
                                                        </button>
                                                    </h2>
                                                    <div id="collapse8" className={`accordion-collapse  bg-primary `} style={{ display: yourObject[7] === 1 ? 'block' : 'none' }} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            To be a leading multinational corporation that is trusted for its world-class services and expertise.                                                        </div>
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
            </div>

        </>
    )
}

export default Message