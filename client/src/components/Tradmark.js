import React from 'react'
import tradelogo from '../images/logo_g.svg'

const Tradmark = () => {
    return (
        <>
            <div className="p-5 text-center opacity-30">
                <div className="">
                    <img src={tradelogo} alt="trade logo" className='h-8 mx-auto hidden ' />
                </div>
                <div className="">
                    <p className='text-sm text-[#4b4d5e]'>Copyright © 2023 Kraft</p>
                </div>
            </div>

        </>
    )
}

export default Tradmark