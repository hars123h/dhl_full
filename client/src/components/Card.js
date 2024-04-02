import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ link, img, title, content, timestamp }) => {
    // console.log(img);
    return (

        <>

            <Link to={link} className='px-[5px] pb-[10px] block'>

                <div className="p-[10px]  bg-white rounded-[7px]">
                    <div className="w-full min-h-[60px] overflow-hidden bg-center bg-no-repeat bg-[length:90%_90%] cardBg bg-[#f8f8f8]">
                        {img && <img src={img} alt="img" className={`w-full `} />}
                    </div>
                    <div className="leading-none">
                        <p className='my-[5px] text-base font-bold text-[#4b4d5e] leading-tight '>{title}</p>
                        <span className='text-sm text-[#cfd0d9] leading-none line-clamp-2'>{content}</span>
                    </div>
                    <div className="leading-none"><span className='text-sm text-[#cfd0d9] leading-normal'>{timestamp}</span></div>
                </div>

            </Link>

        </>
    )
}

export default Card