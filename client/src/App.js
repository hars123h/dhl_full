import React, { createContext, useCallback, useEffect, useState } from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Fallback from './components/Fallback';
import Invest from './components/Invest';
import Account from './components/Account';
import axios from 'axios';
import BASE_URL from './api_url';
import customHistory from './myHistory.js'
import Deposit from './components/Deposit';
import RechargeWindow from './components/RechargeWindow';
import DepositRecords from './components/DepositRecords';
import BankCard from './components/BankCard';
import BankCardAdd from './components/BankCardAdd';
import Widthdrawl from './components/Widthdrawl';
import WidthdrawlRecords from './components/WidthdrawlRecords';
import WpasswordChange from './components/WpasswordChange';
import WithdrawlPassword from './components/WithdrawlPassword';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import Invite from './components/Invite';
import Comissions from './components/Comissions';
import { getuserearn } from './utils/apis';
import Order from './components/Order';
import UpdateData from './components/UpdateData';
import Task from './components/Task';
import Vip from './components/Vip';
import v0 from './images/v0.png'
import v01 from './images/v01.png'
import v1 from './images/v1.png'
import v2 from './images/v2.png'
import v3 from './images/v3.png'
import v4 from './images/v4.png'
import v5 from './images/v5.png'
import v6 from './images/v6.png'
import v7 from './images/v7.png'
import v8 from './images/v8.png'
import Message from './components/Message';
import Article from './components/Article';
import Myteams from './components/Myteams.js';
import AccountSecurity from './components/AccountSecurity.js';
import AboutUs from './components/AboutUs.js';
import CustomerCare from './components/Customer.js';
import customer from './images/btc/customer.png';
import ProductBuy from './components/ProductBuy.js';
import Records from './components/Records.js';

export const ContextApi = createContext();

function App() {

  const [user, setUser] = useState(localStorage.getItem('uid'))
  const [loading, setLoading] = useState(false);
  const [toasterShow, setToasterShow] = useState(false);
  const [toasterText, setToasterText] = useState('');
  const [userDetails, setUserDetails] = useState();
  const [amounts, setAmounsts] = useState({});
  const [earning, setEarning] = useState()
  const [vipimg, setVipimg] = useState()

  const toaster = useCallback((text) => {
    setToasterText(text);
    setToasterShow(true);
    setTimeout(() => {
      setToasterShow(false);
      //navigate('/mine');
    }, 3000);

  }, [])


  const getUserDetails = async () => {
    await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => {
      if (data) {
        setUserDetails(data);
        // setOriginalwpwd(data.wpwd);
        // setOriginalpwd(data.pwd);
        localStorage.setItem('user_invite', data.user_invite);
        localStorage.setItem('wpwd', data.wpwd);

        return data
      } else {
        //console.log('Data not found');
        // toaster('Please login')
      }
    }).catch(error => console.log('Some error occured', error));

    // getuserearn();
  }

  const getData = async () => {

    //console.log('hello');
    const dataRes = await axios.get(`${BASE_URL}/amounts`).then(({ data }) => data);
    //console.log(dataRes);
    if (dataRes) {
      // console.log(dataRes);
      setAmounsts(dataRes);
    }

  }


  useEffect(() => {
    getData();
    // getUserDetails();
    // getuserearn();
  }, [])

  useEffect(() => {

    if (userDetails?.vipLevel === 0) {
      setVipimg(v0)
    }
    else if (userDetails?.vipLevel === 1) {
      setVipimg(v1)
    }
    else if (userDetails?.vipLevel === 2) {
      setVipimg(v2)
    }
    else if (userDetails?.vipLevel === 3) {
      setVipimg(v3)
    }
    else if (userDetails?.vipLevel === 4) {
      setVipimg(v4)
    }
    else if (userDetails?.vipLevel === 5) {
      setVipimg(v5)
    }
    else if (userDetails?.vipLevel === 6) {
      setVipimg(v6)
    }
    else if (userDetails?.vipLevel === 7) {
      setVipimg(v7)
    }
    else if (userDetails?.vipLevel === 7) {
      setVipimg(v8)
    }

  }, [getUserDetails])

  useEffect(() => {

    // setInterval(() => {
    getuserearn();
    // }, 86400000);

  }, [])



  return (
    <>
      <ContextApi.Provider value={
        {
          user, setUser,
          userDetails, setUserDetails,
          loading, setLoading,
          toasterShow, setToasterShow,
          toasterText, setToasterText,
          toaster, getUserDetails,
          amounts, setAmounsts,
          earning, setEarning,
          vipimg, setVipimg,getData
        }
      }>
        <BrowserRouter>
          {toasterShow &&
            <div className='top-0 left-0 right-0 bottom-0 p-5 z-[9999999] fixed flex items-center'>
              {/* <div className="before:content-[''] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(46,46,46,0.1)] z-[1] backdrop-blur-[3px]"></div> */}
              <div className="flex items-start bg-[#0000006a] max-w-[250px] px-5 -top-5 relative w-fit mx-auto shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] z-[2] rounded-[7px] ">
                <div className="flex-1 px-[5px] py-2">
                  <p className='text-base text-white text-center'>{toasterText}</p>
                </div>
              </div>
            </div>
          }

          {/* {loading &&
            <div className='top-0 left-0 right-0 bottom-0 p-5 z-[9999] fixed flex items-center'>
              <div className="before:content-[''] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(46,46,46,0.1)] z-[1] backdrop-blur-[3px]"></div>
              <div className="bg-transparent backdrop-filter-[initial] backdrop-blur-[initial] max-w-[250px] p-5 -top-5 relative mx-auto ">
                <div className="w-[60px] mx-auto relative flex flex-wrap justify-center items-center cp-spinner cp-balls"></div>
              </div>
            </div>
          } */}

          {user &&
            <span  className="btnfix ">
              <Link to={'/customer'} className="btnfix px-6 py-1 space-x-2 flex z-[99999]" href="">
                <img width="25" src={customer} className='align-middle' alt="" />
                contact
              </Link>
            </span>
          }
          <Routes>

            <Route path="/" element={<Fallback />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='/equipment' element={<Invest />} /> */}
            <Route path='/account' element={<Account />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path="/recharge_window/:recharge_value" element={<RechargeWindow />} />
            {/* <Route path='/deposit_records' element={<DepositRecords />} /> */}
            <Route path='/invite' element={<Invite />} />
            <Route path='/vip' element={<Vip />} />
            <Route path='/Workingdevice' element={<Order />} />
            <Route path='/bankCard' element={<BankCard />} />
            <Route path='/bankCardAdd' element={<BankCardAdd />} />
            <Route path='/widthdrawl' element={<Widthdrawl />} />
            <Route path='/widthdrawlrecords' element={<WidthdrawlRecords />} />
            {/* <Route path='/changewidthdrawlpassword' element={<WpasswordChange />} /> */}
            {/* <Route path='/widthdrawlpassword' element={<WithdrawlPassword />} /> */}
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            {/* <Route path='/comissions' element={<Comissions />} /> */}
            {/* <Route path='/update' element={<UpdateData />} /> */}
            <Route path='/gift' element={<Task />} />
            <Route path='/FAQ' element={<Message />} />
            {/* <Route path='/article' element={<Article />} /> */}
            <Route path='/team' element={<Myteams />} />
            {/* <Route path='/accountsecurity' element={<AccountSecurity />} /> */}
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/productdetail' element={<ProductBuy />} />
            <Route path='/customer' element={<CustomerCare />} />
            <Route path='/records' element={<Records />} />

          </Routes>

        </BrowserRouter>

        <ToastContainer />
      </ContextApi.Provider>

    </>
  );
}

export default App;
