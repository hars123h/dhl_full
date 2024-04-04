import React from "react";
import TeamImg from "../images/galaxysone/teamimg.png";
import WpImg from "../images/whatsapp.svg";
import TeleImg from "../images/telegram.svg";

import { IoIosArrowForward } from "react-icons/io";

const CustomerCare = () => {
  return (
    <>
      <div className="p-5 text-black ">
        <div className="w-full flex items-center justify-center mb-[60px]">
          <img className=" w-[150px]" src={TeamImg} alt="" />
        </div>

        <div className="flex items-center">
          <img className="w-[50px] mr-[10px]" src={TeamImg} alt="" />
          <p>Hi- do you need any help</p>
        </div>

        <div className="flex items-center mt-[20px]">
          <img className="w-[30px] mr-[10px]" src={TeamImg} alt="" />
          <p>9:30 - 18:30</p>
        </div>
        <p>
          If you have question about me you can ask me in the following ways
        </p>

        <div>
          <div className="flex items-center border-gray-400	border-2 p-4 rounded-lg my-3 ">
            <img className="w-[45px] pr-[10px] border-r-2" src={WpImg} alt="" />
            <div className="pl-[10px] pr-[10px] ">
              <div>Whatsapp</div>
              <p className="text-[grey] text-[15px]">
                Click to contact customer service
              </p>
            </div>
            <IoIosArrowForward />
          </div>

          <div className="flex items-center border-gray-400	border-2 p-4 rounded-lg my-3 ">
            <img className="w-[45px] pr-[10px] border-r-2" src={TeleImg} alt="" />
            <div className="pl-[10px] pr-[10px] ">
              <div>Telegram</div>
              <p className="text-[grey] text-[15px]">
                Click to contact customer service
              </p>
            </div>
            <IoIosArrowForward />
          </div>

        

         
        </div>

       
      </div>
    </>
  );
};

export default CustomerCare;
