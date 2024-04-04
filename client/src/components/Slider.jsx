import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import s1 from '../images/btc/s1.jpg';
import s2 from '../images/btc/s2.jpg';
import s3 from '../images/btc/s3.jpg';
import s4 from '../images/btc/s4.png';
import s5 from '../images/btc/s5.jpg';

const Slider = () => {
  return (
    <div className='sm:w-3/5 lg:w-3/5 mx-2 py-2'>
        {/* <div className='w-full'>
          <img src={boat_logo} className="h-[180px] w-full" alt="img_2" />
        </div> */}
        <Carousel showThumbs={false} autoPlay showArrows={true} infiniteLoop statusFormatter={()=>''}>
        <div>
          <img src={s1} className="h-[190px] rounded-md" alt="img_2" />
        </div>

        <div>
          <img src={s2} className="h-[190px] rounded-md" alt="img_1" />
        </div>

        <div>
          <img src={s3} className="h-[190px] rounded-md" alt="img_1" />
        </div>

        {/* <div>
          <img src={s4} className="h-[190px] rounded-md" alt="img_1" />
        </div>

        <div>
          <img src={s5} className="h-[190px] rounded-md" alt="img_1" />
        </div> */}

        {/* <div>
          <img src={s4} className="h-[190px] rounded-md" alt="img_1" />
        </div> */}

      </Carousel>
    </div>
  )
}

export default Slider;
