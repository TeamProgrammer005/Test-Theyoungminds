import React from 'react'
import Mainpage from '../Mainpage/Mainpage'
import "./Community.css"
import { Link } from "react-router-dom"
import { useState} from 'react'
export default function Community() {
    const [libraryLink, setlibraryLink] = useState("")
    const [libraryBtn, setlibraryBtn] = useState(true)
    const toggleLibraryLinks = (event)=>{
        setlibraryBtn(event.target.value === "select_cateogry" ? true : false);
        setlibraryLink(`http://library.theyoungminds.org/${event.target.value}`)
    }
  return (
    <div>
        <div className="communityDOM">
            {/* Adding main landing page */}
        <Mainpage title = "" midHeading ="Never Stop Learning___" companyName="Discover scientific" LibraryDetail="Knowledge and stay"  LibraryDetails= "connect to the world" purpose= "of STEAM" community="" display="none" img="image/community.jpg" toggleDisplay="none" buttonDisplay= "block" headingDisplay="block" btnText="Go To Our Library" btnLink="http://library.theyoungminds.org/blogs/" _display="none" buttonDisplay_store="none" homeDisplayBtn="none"/>
        {/* section 1 for discover steam */}
        <div className="discoverSteam">
            <h4>DISCOVER</h4>
            <h2>STEAM</h2>
                    <p>A sneak peak into our fun and interactive sessions.</p>
            <div className="steamDesc">
                <div className='steamDesc-align'>
                    <div className="dropdownCategory">
                        <select name="dropdownCat" id="dropdownCat" onChange={toggleLibraryLinks}>
                            <option value="select_cateogry">Select Category</option>
                            <option value="science">Science</option>
                            <option value="technology">Technology</option>
                            <option value="engineering">Engineering</option>
                            <option value="arts">Arts</option>
                            <option value="mathematics">Mathematics</option>
                        </select>
                        <a href= {libraryLink} target= "_blank" rel="noopener noreferrer"><button disabled={libraryBtn === true}>Search</button></a>
                    </div>
                </div>
                <div className="blankedLine"></div>
                <img src="image/unnamed 1.png" alt="" />
            </div>
        </div>
        {/* section 2 for steam community */}
        <div className="steamCommunity">
        <h4>connect with your</h4>
            <h2>STEAM community</h2>
            <div className="steamCategoryDOM">
                <p>Beyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazing design resources and how those at the top of the industry get things done through our podcast, interviews, articles, and live events..</p>
                <div className='steamCategories12'>
                    <ul>
                        <li>3D Printing</li>
                        <li>Artificial Intelligence</li>
                        <li>Blockchain</li>
                        <li>Biotechnology</li>
                        <li>Geometry</li>
                        <li>History</li>
                        <li>Much More</li>
                    </ul>
                </div>
            </div>
        </div>
        </div>

    </div>
  )
}
