import React, { useContext } from 'react'
import "./navbar.css"
import Logo from "../../assets/img/logo.png"
import { BiHomeSmile } from 'react-icons/bi';
import { TbMessageChatbot } from 'react-icons/tb';
import { IoIosLogOut } from 'react-icons/io';
import { MdMiscellaneousServices } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import RocketImg from '../../assets/img/rocket.png'
import { MyContext } from '../../App';
import { deleteCookie } from '../../utils/cookie';
export default function Navbar() {
  const {setIsLoggedIn} = useContext(MyContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    deleteCookie('user')
     navigate('/')
  }
  return (
    <div className="mynav">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="tabs ">
            <Link to="/" className='link'>
            <div className='tab'>
                <div className="icon">
                  <BiHomeSmile />
                </div>
                <div className="text">
                  Home
                </div>
            </div>
            </Link>

            <Link to="/projects" className='link'>
            <div className='tab'>
              <div className="icon">
                <MdMiscellaneousServices />
              </div>
              <div className="text">
                Project
              </div>
            </div>
            </Link>
            
            <Link to="/chatbot" className='link'>
              <div className='tab'>
                <div className="icon">
                  <TbMessageChatbot />
                </div>
                <div className="text">
                  Chatbot
                </div>
              </div>
            </Link>
            <div className="underline"></div>
            <Link to="/" className='link'>
            <div className='tab'>
              <div className="icon">
                <MdMiscellaneousServices />
              </div>
              <div className="text">
                Settings
              </div>
            </div>
            </Link>
            <div className='tab'>
              <div className="icon">
                <IoIosLogOut />
              </div>
              <div className="text" style={{cursor:'pointer'}} onClick={handleLogout}>
                Logout
              </div>
            </div>
           
           <div className="upgrade">
                <div className="inner">
                  <h6>Upgrade to PRO</h6>
                  <small>Unlock premium features for free</small>
                  <div>
                    <button>TRY NOW</button>
                  </div>
                    <img src={RocketImg} alt="" />
                </div>
           </div>
            
           
        </div>
    </div>
  )
}
