import React from 'react'
import Mainpage from '../Mainpage/Mainpage'
import homeblog from "./homeblog.json"
import "./Homesite.css"
import "./homeblog.css"
export default function Homeblog() {
  return (
    <div className='homeBlogDOM'>
              <Mainpage title = "." midHeading ="Never Stop Learning___" companyName="TOGETHER WE CAN" purpose= "CREATE AN IMPACT" community="" display="none" img="image/homeblog.png" toggleDisplay="none" buttonDisplay= "none" headingDisplay="none" btnText="Know More" btnLink="/homeblog" _display="none" buttonDisplay_store="none" homeDisplayBtn="none"/>
              <div className="BlogDOM">
              {homeblog.map((data, index)=>{
                return (
                  <div key={index}>
                    <div className="blogsContainer" >
                        <h4>THE YOUNG MINDS FOR</h4>
                        <h2>{data.mainTitle}</h2>
                        <p>{data.mainDesc}</p>
                        <div className="blogBody" >
                          <div className= {`blogImg ${data.bgclass}`}>
                            <div className="comingSoon">
                              <div>Coming Soon</div>
                            </div>
                            <img src={data.img} alt="" />
                          </div>
                          <div className="blogContent">
                            <div className="blogOverview">
                              <div className="blogDesc">
                                <h4>{data.title1}</h4>
                                <p>{data.desc1}</p>
                              </div>
                            </div>
                            <div className="blogOverview">
                              <div className="blogDesc">
                              <h4>{data.title2}</h4>
                                <p>{data.desc2}</p>
                              </div>
                            </div>
                            <div className="blogOverview">
                              <div className="blogDesc">
                              <h4>{data.title3}</h4>
                                <p>{data.desc3}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div> 
                    
                    <a href= {data.link}target="_blank" rel="noopener noreferrer"><button>Register Now</button></a>
                  </div>
                )
              })}
              </div>
    </div>
  )
}
