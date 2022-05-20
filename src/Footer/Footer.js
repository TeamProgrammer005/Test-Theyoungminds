import React from 'react'
import "./Footr.css"
// import {a} from "react-router-dom"

export default function Footer() {
  return (
    <div>
          <div className="footer">
              {/* footer navigation */}
                    <ul className="navigate">
                        <h4>Navigate To</h4>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/service">Services</a></li>
                        <li><a href="/privacy_policy" className='toggleGrid'>Privacy Policy</a></li>
                        <li className='try'><a href="/conditions">Terms & Condition</a></li>
                        <li className='toggle'><a href="/conditions">T & C</a></li>
                    </ul>
                    {/* Footer intro */}
                    <div className="shortIntro">
                        <img src="image/young minds watermark 1.png" alt="" />
                        <h4>THE YOUNG MINDS</h4>
                        <p>Beyond the sense of community and opportunity that we strive to provide, XYZ is also the place .</p>
                    </div>
                    <div className='blankLine'></div>
                    {/* Social Media as */}
                    <div className="socialMedia">
                        <h4>Follow Us</h4>
                    <ul className='socialMediaIcons'>
                        <li><a href="https://www.facebook.com/theyoungminds.org/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f utility"></i></a></li>
                        <li><a href="https://www.instagram.com/youngminds.education/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram utility"></i></a></li>
                        <li><a href="https://twitter.com/theyoungminds_" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter utility"></i></a></li>
                    </ul>
                    </div>
                <span className='copyright'>&copy; 2022 Theyoungminds all rights reserved.</span>
                </div>
    </div>
  )
}
