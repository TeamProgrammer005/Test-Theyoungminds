import React from 'react'
import "./Mainpage.css"
import { useState} from 'react'
import { Link } from 'react-router-dom'

export default function Mainpage(props) {
    const toggleDisplay= props.toggleDisplay;
    const display = props.display;
    const _display= props._display;
    const homeDisplayBtn= props.homeDisplayBtn;
    const headingDisplay = props.headingDisplay;
    const buttonDisplay =props.buttonDisplay;
    const buttonDisplay_store= props.buttonDisplay_store
    const [linking, setlinking] = useState("services")
    const [disabled, setdisabled] = useState(true)
    const [disabled2, setdisabled2] = useState(false)
    const toggleLink = (event) => {
        setdisabled(event.target.value === "services" ? true : false)
       setlinking(`/${event.target.value}`)
    }
    const toggleSelection = (event) =>{
        setdisabled2(event.target.value === "select_cateogry" ? true : false)
    }
    return (
        <div>
            {/* Landing page content taken from props form each pages to change accordingly*/}
            <div className="sectionAbout">
                <div className="imgContainer">
                <img src={props.img} alt="loading" />
                </div>
                <div className="squareDOM"><div className="innerSquare"><div className="boxSquare"></div></div></div>
                <div className="contentAbout">
                    <h3 className='title'>{props.title}</h3>
                    <div className="midHeading">
                        <div className='square'></div>
                        <h4>{props.midHeading}</h4>
                        <h2 className="heading">{props.companyName}</h2>
                        <h2 style={{display: headingDisplay}} className="heading">{props.LibraryDetail}</h2>
                        <h2 style={{display: headingDisplay}}className="heading">{props.LibraryDetails}</h2>
                        <h2 className='heading shadowheading'>{props.purpose}</h2>
                        <h4>{props.community}</h4>
                        <p style={{display: toggleDisplay}}>Beyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazing design resources and how those at the top of the industry get things done through our podcast, interviews, articles, and live events.</p>
                        <div className="inputDOM" style={{display: display}}>
                        <select name="dropdownCat" id="dropdownCat" className='dropdownCat' onChange= {toggleSelection} >
                            <option value="select_cateogry">Select Category</option>
                            <option value="science" >3D Printer for Education</option>
                            <option value="technology">3D Printer for Industrial Use</option>
                            <option value="engineering">3D Printer for Jewelry Design</option>
                        </select>
                    
                    </div>
                        <div className="service-inputDOM inputDOM" style={{display: _display}}>
                        <select name="dropdownCat" id="dropdownCat" className='dropdownCat' onChange= {toggleLink}>
                            <option value="services">Select Category</option>
                            <option value="order3d">Addictive Manufacturing</option>
                            <option value="3d_design">3D Modelling</option>
                            <option value="askforrepair">Fix Your Printer</option>
                        </select>
                    
                    </div>
                        <a href= {props.btnLink} target="_blank" rel="noopener noreferrer"><button style={{display:buttonDisplay }} disabled={disabled2 === true}>{props.btnText}</button></a>

                        <Link to= "/homeblog"><button style={{display: homeDisplayBtn }}>Know More</button></Link>
                      
                        <a href= {linking} target="_blank" rel="noopener noreferrer" ><button style={{display:buttonDisplay_store }} disabled={disabled === true } >{props.btnText}</button></a>
                        
                    </div>
                </div>
                <div className="para">
                    <i className="fas fa-solid fa-quote-left"></i>
                    <p>We’re on a mission towards global sustainable development goal for making education Equitable & Accessible</p>
                    <i className="fas fa-solid fa-quote-right"></i>
                </div>
            </div>
            <div className="blank"></div>
        </div>
    )
}

