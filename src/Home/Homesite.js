import React from 'react'
import { useState} from 'react'
// import { Link } from 'react-router-dom'
import "./Homesite.css"
import "./homeblog.css"
import "./resposiveHome.css"
import homeData from "./homeData.json"
import homeEvent from "./homeEvent.json"
import Update from "./updates.json"
import Mainpage from '../Mainpage/Mainpage'

export default function Home() {
    const categoryData =[{title: "Learner", img:"image/Learner 1.png", id : 0, link: "learner"},{title: "Teacher", img:"/image/teacher.png", id: 1, link: "teacher"},{title: "Parent",img:"image/parent 1.png", id: 2, link: "parent"},{title: "Institute", img:"image/institute.png", id: 3, link: "institute"}]
    const categoryNameData=[{title: "Science", link: "science", class: "fab fa-react"},{title: "Technology", link: "technology", class: "fas fa-code"},{title: "Engineering",link: "engineering", class:"fas fa-cog"},{title: "Arts", link: "arts", class:"fas fa-paint-brush", className: "align"},{title: "Mathematics", link: "mathematics", class:"fas fa-calculator"}]
    const [color, setcolor] = useState("#97A7C3")
    const [firstColor, setfirstColor] = useState("#97A7C3")
    const [secondColor, setsecondColor] = useState("linear-gradient(228.72deg, #FFE601 26.63%, #FF4D00 108.3%)");
    const [thirdColor, setthirdColor] = useState("#97A7C3");
    // const [toggleClass, settoggleClass] = useState("basic_journey");
    const [currentClass, setcurrentClass] = useState(0);
    const [currentEvent, setcurrentEvent] = useState(1);
    const [currentUpdates, setcurrentUpdates] = useState(1);
    const [currentCategory, setcurrentCategory] = useState(6);
    const [toggledisable, settoggledisable] = useState(true)
    // const [buttonLink, setbuttonLink] = useState("/")
    // const [step1Link, setstep1Link] = useState("learner")
    const [step2Link, setstep2Link] = useState("")
    const nextEventSlide = ()=>{
        setcurrentEvent(currentEvent === 2  ?  1 : currentEvent + 1)
      }
      const prevEventSlide = ()=>{
        setcurrentEvent(currentEvent === 1  ?  2 : currentEvent - 1)
      }
      const changeEventSlide = (index)=>{
        setcurrentEvent(index+1)
      }
    const nextUpdateSlide = ()=>{
        setcurrentUpdates(currentUpdates === 2  ?  1 : currentUpdates + 1)
      }
      const prevUpdateSlide = ()=>{
        setcurrentUpdates(currentUpdates === 1  ?  2 : currentUpdates - 1)
      }
      const changeUpdateSlide = (index)=>{
        setcurrentUpdates(index+1)
      }
    const changeColor = (index, title)=>{
        setcolor("#193566");
        setthirdColor("linear-gradient(228.72deg, #FFE601 26.63%, #FF4D00 108.3%)")
        setsecondColor("#97A7C3")
        // setbuttonLink("/home/learning")
        setfirstColor("#97A7C3")
        setcurrentCategory(index)
        settoggledisable(false)
        setstep2Link(title)
        // console.log(title)
    }
    const backgroundChange = (index)=>{
        setcolor("#97A7C3");
        setthirdColor("#97A7C3")
        // setbuttonLink("/")
        setfirstColor("#97A7C3")
        setsecondColor("linear-gradient(228.72deg, #FFE601 26.63%, #FF4D00 108.3%)")
        setcurrentClass(index)
        setcurrentCategory(6)
        // setstep1Link(title)
    }

  return (
        <div className="homeDOM">
        <Mainpage title = "." midHeading ="Never Stop Learning___" companyName="TOGETHER WE CAN" purpose= "CREATE AN IMPACT" community="" display="none" img="image/about.jpg" toggleDisplay="none" buttonDisplay= "none" headingDisplay="none" btnText="Know More" btnLink="/homeblog" _display="none" buttonDisplay_store="none" homeDisplayBtn="block"/>
        {/* section 1 with all 3 step for our journey */}
            <div className="startYourJourney">
            <div className="category_nav">
                        <div className="nav_heading">
                        <h4>Start Your</h4>
                        <h2 className='topHeading'>Journey</h2>
                        </div>
                        <div className="viewAll">
                        {/* <Link to="./home/categories"><i className="fas fa-info-circle utility"></i></Link> */}
                        {/* <Link to="./home/categories"><span>view all</span></Link> */}
                        {/* <i className='fas fa-chevron-right'></i> */}
                        </div>
                    </div>
                            <p>The Young Minds Education is dedicated to enhance <strong>Science, Technology, Engineering, Arts and Mathematics</strong> capacity of our future builders. Our engaging programs are focused around the three pillars - <strong>Ideate, Build and Innovate..</strong></p>
                            {/* step 1 who you are */}
                            <div className="stepForJourney">
                                <div className="cricleBlank" style={{background: firstColor}}>
                                    <div className="innerBlank"></div>
                                </div>
                                <div className="stepping">
                                    <h6>Step 1</h6>
                                    <h5>Who you are ?</h5>
                                </div>
                             </div>                  
                        <div className="basic_journeys_collection">
                           {categoryData.map((data, index) => {
                            return (
                            
                                   <div className={currentClass === index ? "basic_journey backgroundChange" : "basic_journey"}  key={index} value="something" onClick= {() => backgroundChange(index)}  >
                                       <h3 style={{display : "none"}}>Looking to boost your</h3>
                                       <h2>{data.title}</h2>
                                       {/* <p>Start my journey as learner</p> */}
                                       <img src={data.img} alt="" />
                                   </div>
                             
                            )
                        })}
                    </div>  
                    {/* step 2 select category */}
                    <div className="stepForJourney">
                                <div className="cricleBlank" style={{background: secondColor}}>
                                    <div className="innerBlank"></div>
                                </div>
                                <div className="stepping">
                                    <h6>Step 2</h6>
                                    <h5>select category</h5>
                                </div>
                             </div>
                             <div className="categoryDOM">
                                 {categoryNameData.map((data, index)=>{
                                     return (
                                         <div className="journeyCategories" key={index}>
                                             <div className={currentCategory === index ? "categoryIcon colorChange" : "categoryIcon"} onClick={() => changeColor(index, data.link)}>
                                             <i className={data.class}></i>
                                             </div>
                                             <p className={data.className}>{data.title}</p>
                                         </div>
                                     )
                                 })}
                             </div>
                            
                             <div className="stepForJourney">
                                <div className="cricleBlank" style={{background: thirdColor}}>
                                    <div className="innerBlank"></div>
                                </div>
                                <a href= {`http://library.theyoungminds.org/${step2Link}`} target="_blank" rel="noopener noreferrer" ><button style={{background: color}} disabled={toggledisable === true }>START LEARNING</button></a>
                             </div>
                      </div> 
             {/* section 2 join workshop */}
                      <div className="headingWorkshop">
                    <div className="category_nav">
                        <div className="nav_heading">
                            <h4>Join Our</h4>
                            <h2>Workshop</h2>
                            <p>Expert sessions for better learning, handcrafted for you.</p>
                        </div>
                        <div className="viewAll">
                            {/* <Link to="./home/categories"><i className="fas fa-info-circle utility"></i></Link> */}
                            {/* <Link to="./home/categories"><span></span></Link> */}
                            {/* <i className='fas fa-chevron-right'></i> */}
                        </div>
                    </div>       
                     <div className="workshopDOM">
                        {homeData.map((data, index)=>{
                            return(
                                <a href={data.link} target="_blank" rel="noopener noreferrer" className="workshop-details" key={index}>
                                    <img src={data.img} alt="" />
                                    {/* <span className="fas fa-bookmark utility"></span> */}
                                    <div className="workshop-time">
                                        <span>{data.Date} <br /> {data.month}</span>
                                    </div>
                                    <h5>{data.Title}</h5>
                                    <p>{data.desc}</p>
                                   <button>Know More</button>
                                </a>
                            )
                        })}
                    </div>
                </div>
                {/* section 3 events*/}
                <div className="upcomingEvents">
                  <div className="category_nav">
                        <div className="nav_heading">
                        <h4>Upcoming</h4>
                        <h2>Events</h2>
                        <p>Expert sessions for better learning, handcrafted for you.</p>
                        </div>
                        <div className="viewAll">
                            {/* <Link to="./home/categories"><i className="fas fa-info-circle utility"></i></Link>
                            <Link to="./home/categories"><span>view all</span></Link>
                            <i className='fas fa-chevron-right'></i> */}
                        </div>
                    </div> 
                    
                    <div className="eventDOM eventDOMDis">
                        {homeEvent.map((data, index)=>{
                            return(
                                <a className={currentEvent === data.slide ? "eventDetails eventSlide":"eventDetails"} key={index} href={data.link} target="_blank" rel="noopener noreferrer">
                                    {currentEvent === data.slide && (
                                        <>
                                    <div className="eventIMG">
                                         <img src={data.img} alt="Event" />
                                    </div>
                                    <div className='eventTiming'>
                                       <span> {data.date} <br /> {data.month}</span>
                                    </div>
                                    <div className="eventTitle">
                                    <h4>{data.Title}</h4>
                                        <span></span>
                                    </div>
                                    <p>{data.desc}</p>
                                    <div className="eventDuration">
                                        <p>
                                        <i className="far fa-clock utility" style={{cursor: "pointer", marginRight: "4px", fontWeight: "bold"}}></i>
                                            12:00 PM - Until Done
                                        </p>
                                    <span><i className="fas fa-map-marker-alt"></i> Online</span>
                                    </div>
                                    <p className='lowerPara'>Indian Standard Time (IST)</p>
                                        </>
                                    )}
                                </a>
                             
                            )
                        })}
                    </div>
                    <div className="Deskicons utility">
                            <i className="fas fa-chevron-left" onClick={prevEventSlide} ></i>
                            <i className="fas fa-chevron-right" onClick={nextEventSlide}></i>
                        </div>
                        <div className="testBtnDOM">
                            {Array.from({ length: 2 }).map((item, index) => {
                                return (
                                    <div className={currentEvent === index + 1 ? "btn active" : "btn"} key={index} onClick={() => changeEventSlide(index)} ></div>
                                )
                            })}
                        </div>
                    <div className="eventDOM">
                        {homeEvent.map((data, index)=>{
                            return(                      
                                <a className="eventDetails eventChanges" key={index} href={data.link} target="_blank" rel="noopener noreferrer">
                                    <div className="eventIMG">
                                         <img src={data.img} alt="Event" />
                                    </div>
                                    <div className='eventTiming'>
                                       <span> {data.date} <br /> {data.month}</span>
                                    </div>
                                    <div className="eventTitle">
                                    <h4>{data.Title}</h4>
                                        <span></span>
                                    </div>
                                    <p>{data.desc}</p>
                                    <div className="eventDuration">
                                        <p>
                                        <i className="far fa-clock utility" style={{cursor: "pointer", marginRight: "4px", fontWeight: "bold"}}></i>
                                            12:00 PM - Until Done
                                        </p>
                                    <span><i className="fas fa-map-marker-alt"></i> Online</span>
                                    </div>
                                    <p className='lowerPara'>Indian Standard Time (IST)</p>
                                </a>  
                            )
                        })}
                    </div>
                </div>
                        {/* section4 updates from community */}
                <div className="updateFromCommunity">
                    <a href="https://zfrmz.in/kmN4skluBTfkhgCo70Wj" target="_blank" rel="noopener noreferrer"><button>JOIN COMMUNITY</button></a>
                    <h4>Update From </h4>
                    <h2>Community</h2>
                    <p>Our believe is, <strong>“A Leader can create a company, but a community creates a movement.”</strong> So, to lead our global goal of sustainable development, we are building communities for the greater cause. Let’s look at few words from our Young Leaders.</p>
                    <div className="updatedDOM updatedDOMDis">
                        {Update.map((data, index)=>{
                            return(
                                <div className={currentUpdates === data.slide ?"updates changeUpdate":"updates"} key={index}>
                                    {currentUpdates === data.slide && (
                                        <>
                                    <div className="update_intro">
                                        <div className="blank">
                                            <img src={data.img} alt="" />
                                        </div>
                                        <div className="intro">
                                            <h6>{data.name}</h6>
                                            <span>{data.designation}</span>
                                            <ul className='socialMediaIcons'>
                                                    <li><a href="https://www.facebook.com/theyoungminds.org/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f utility"></i></a></li>
                                                    <li><a href="https://www.instagram.com/youngminds.education/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram utility"></i></a></li>
                                                    <li><a href="https://twitter.com/theyoungminds_" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter utility"></i></a></li>
                                                    {/* <li>  <i className="fas fa-share-alt utility"></i></li> */}
                                                </ul>
                                        </div>
                                    </div>
                                    <div className="updates_desc">
                                        <p>{data.desc}</p>
                                    </div>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="Deskicons utility">
                            <i className="fas fa-chevron-left" onClick={prevUpdateSlide} ></i>
                            <i className="fas fa-chevron-right" onClick={nextUpdateSlide}></i>
                        </div>
                        <div className="testBtnDOM">
                            {Array.from({ length: 2 }).map((item, index) => {
                                return (
                                    <div className={currentUpdates === index + 1 ? "btn active" : "btn"} key={index} onClick={() => changeUpdateSlide(index)} ></div>
                                )
                            })}
                        </div>
                    <div className="updatedDOM">
                        {Update.map((data, index)=>{
                            return(
                                <div className="updates fixUpdateUi" key={index}>
                                    <div className="update_intro">
                                        <div className="blank">
                                            <img src={data.img} alt="" />
                                        </div>
                                        <div className="intro">
                                            <h6>{data.name}</h6>
                                            <span>{data.designation}</span>
                                            <ul className='socialMediaIcons'>
                                                    <li><a href="https://www.facebook.com/theyoungminds.org/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f utility"></i></a></li>
                                                    <li><a href="https://www.instagram.com/youngminds.education/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram utility"></i></a></li>
                                                    <li><a href="https://twitter.com/theyoungminds_" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter utility"></i></a></li>
                                                    {/* <li>  <i className="fas fa-share-alt utility"></i></li> */}
                                                </ul>
                                        </div>
                                    </div>
                                    <div className="updates_desc">
                                        <p>{data.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
    </div>

  )
}