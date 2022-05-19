import React from 'react'
import "./Nav.css"
import { NavLink } from "react-router-dom"
function Nav() {

    return (
        <>
            <div className="mobile_nav">
                {/* Mobile view top nav */}
                <ul>
                    <li><img src="image/young minds watermark 1.png" alt="logo" /></li>
                    <li><h2>The Young Minds</h2></li>
                </ul>
            </div>
            {/* Mobile view bottom nav for navigatiom */}
            <div className="mobileRouting">
                <ul className="mobileNav">
                <li><NavLink to="/" activelassname='active' exact={true}><i className="fas fa-home "></i></NavLink></li>
                    <li><NavLink to="/community" activelassname='active'><i className="fas fa-users"></i></NavLink></li>
                    <li><NavLink to="/service" activeclassname='active'><i className="fas fa-business-time"></i></NavLink></li>
                    <li><NavLink to="/our_store" activeclassname='active'><i className="fas fa-shopping-bag"></i></NavLink></li>
                    <li><NavLink to="/about" activeclassname='active'><i className="fas fa-id-badge"></i></NavLink></li>
                </ul>
            </div>
            {/* Desktop view for navigation */}
            <div className="navigation">
                <ul className="topNav">
                    <li><img src="image/young minds watermark 1.png" alt="logo" /></li>
                    <li><h2>THE YOUNG MINDS</h2></li>
                    <li></li>
                </ul>
                <ul className='mainNav'>
                    <li><NavLink to="/" activelassname='active' exact={true} >Home</NavLink></li>
                    <li><NavLink to="/community" activelassname='active'>Our Community</NavLink></li>
                    <li><NavLink to="/service" activeclassname='active'>Services</NavLink></li>
                    <li><NavLink to="/our_store" activeclassname='active'>Our Store</NavLink></li>
                    <li><NavLink to="/about" activeclassname='active'>About Us</NavLink></li>
                </ul>
                <div className='navblank'></div>
            </div>
        </>
    )
}

export default Nav
