import React from 'react'
import "./footer.css"
import {AiOutlineTwitter} from 'react-icons/ai'
import {FaFacebookF} from 'react-icons/fa'
import {FaLinkedinIn} from 'react-icons/fa'
import Logo from '../../assets/img/logo.png'
export default function Footer() {
  return (
    <div className='footer'>
        <div className="top">
            <div className='top-left'>
                <div>
                    <p className='text-bold'>Company</p>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Contact Us</p>
                    <p>Lift Media</p>
                    <p></p>
                </div>
                <div>
                    <p className='text-bold'>Information</p>
                    <p>FAQ</p>
                    <p>Blog</p>
                    <p>Support</p>
                </div>
            </div>
            <div className='top-right'>
                <p className='text-bold'>Subscribe</p>
                <div>
                    <input type="text" placeholder='Email Address' />
                </div>
                <small>
                Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.
                </small>
            </div>
        </div>
        <div className="bottom">
            <div>
                <img style={{width: '50px'}} src={Logo} alt="logo" />
            </div>
            <div className='terms'>
               <p>Terms</p>
               <p>Privacy</p>
               <p>Cookies</p>
            </div>
            <div className='logos'>
                <div>
                    <FaLinkedinIn />
                </div>
                <div>
                    <FaFacebookF/>
                </div>
                <div>
                    <AiOutlineTwitter/>
                </div>
            </div>
        </div>
    </div>
  )
}
