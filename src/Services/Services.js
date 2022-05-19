import React from 'react'
import servicesIdeaData from "./servicesIdeaData.json"
import { useState } from 'react'
import additionalServiceData from "./additionalServiceData.json"
import "./Services.css"
import "./responsiveService.css"
import Mainpage from '../Mainpage/Mainpage'
import our_products from './our_products.json'


export default function Services() {
    const fieldExpertise = [{name: "Udit Sharma", img: "image/uditSharma.jpg"},{name: "Pradyuma Agarwal", img: "image/pradyuma.png"},{name: "Aanchal Gupta", img: "image/aanchal.jpg"},{name: "Vignesh Shukla", img: "image/young minds watermark 1.png"}]
    const [currentSlide, setCurrentSlide] = useState(1)

    // functions for slider
    const nextProductSlide = ()=>{
        setCurrentSlide(currentSlide === 2  ?  1 : currentSlide + 1)
      }
      const prevProductSlide = ()=>{
        setCurrentSlide(currentSlide === 1  ?  2 : currentSlide - 1)
      }
      const changeProductSlide = (index)=>{
        setCurrentSlide(index+1)
      }
    const client = [{ name: "Something", img: "image/client 1.jpg" }, { name: "Something", img: "image/client 2.jpg" }, { name: "Something", img: "image/client 3.jpg" }, { name: "Something", img: "image/client 4.jpg" }, { name: "Something", img: "image/client 5.jpg" }]
    return (
        <div>
            <div className="serviceDOM">
                <Mainpage title="." midHeading="Never Stop Learning___" companyName="TOGETHER WE CAN" purpose="CREATE AN IMPACT" community="" display="none" img="image/testservice.jpg" toggleDisplay="none" buttonDisplay="none" headingDisplay="none" btnText="Search" _display="block" buttonDisplay_store="block" homeDisplayBtn="none"/>
                {/* Section 1 ideas */}
                <div className="services_idea">
                    <h4 style={{marginLeft: "20px"}}>Turn your</h4>
                    <h2>ideas into life</h2>
                    {servicesIdeaData.map((data, index) => {
                        return (
                            <div className="serviceIdeaSection" key={index}>
                                <div className={data.outerClass}>

                                    <div className="outerBox">
                                        <div className={data.innerClass}>

                                            <div className="innerBox">
                                                <span>Step</span>
                                                <b>0{data.number}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ideas">
                                    <h4>{data.title}</h4>
                                    <p className='showNhide'>{data.desc}</p>
                                    <p className='hideNshowP'>{data.mobileDesc}</p>
                                    <a href={data.link} target= "_blank" rel="noopener noreferrer"><button>START</button></a>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* section 2 additional features */}
                <div className="additionalService">
                    <h4>Additional</h4>
                    <h2>Features</h2>
                    <p>A sneak peak of our fun and interactive sessions ...</p>
                    <div className="additional_feature">
                        {additionalServiceData.map((data, index) => {
                            return (              
                                    <div className='additional_feature_section' key={index}>
                                        <h4>{data.title}</h4>
                                        <img src={data.img} alt="logo" />
                                        <p>{data.desc}</p>
                                        <a href={data.link} target="_blank" className='btn_service' rel="noopener noreferrer"><button >Know More</button></a>
                                    </div>                         
                            )
                        })}
                    </div>
                </div>
                {/* section 3 store products */}
                <div className="store_featured">
                    <div className="featured_nav">
                        <div className="nav_heading">
                            <h2>OUR PRODUCT</h2>
                        </div>
                        <div className="viewAll">
                            {/* <Link to="./home/categories"><i className="fas fa-info-circle utility"></i></Link>
                            <Link to="./home/categories"><span>view all</span></Link>
                            <i className='fas fa-chevron-right'></i> */}
                        </div>
                    </div>
                    <div className="store_products store_productDis">
            {our_products.map((data, index) => {
              return (                       
                <div className={currentSlide === data.slider ? "store-product_details productSlide" : "store-product_details"} key={index} >
                  {currentSlide === data.slider && (
                    <>
                 <div className="productIMG">
                      <img src={data.img} alt="our_product" />
                    </div>
                  <div className="product_desc">
                    <h4>{data.title}</h4>        
                  </div>
                  <h6>{data.name}</h6> 
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <div className="Deskicons utility">
                            <i className="fas fa-chevron-left" onClick={prevProductSlide} ></i>
                            <i className="fas fa-chevron-right" onClick={nextProductSlide}></i>
                        </div>
                        <div className="testBtnDOM">
                            {Array.from({ length: 2 }).map((item, index) => {
                                return (
                                    <div className={currentSlide === index + 1 ? "btn active" : "btn"} key={index} onClick={() => changeProductSlide(index)} ></div>
                                )
                            })}
                        </div>
          <div className="store_products">
            {our_products.map((data, index) => {
              return (            
                <div className="store-product_details productFixChanges" key={index}>
                  <div className="productIMG">
                      <img src={data.img} alt="our_product" />
                    </div>
                  <div className="product_desc">
                    <h4>{data.title}</h4>        
                  </div>
                  <h6>{data.name}</h6> 
                </div>
              )
            })}
          </div>
                </div>
                {/* section 4 expertise */}
                <div className="field_expertise">
                    <h4>field</h4>
                    <h2>Expertise</h2>
                    <p>A sneak peak of our fun and interactive sessions ...</p>
                    <div className="fieldsBox">
                        {fieldExpertise.map((fields, index) => {
                            return (
                                <div className="fields" key={index}>
                                    <div className="empty fieldsImgbox">
                                        <img src={fields.img} alt="" />
                                    </div>
                                    {/* <h3>36000+</h3> */}
                                    <h4>{fields.name}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* section 5 clients */}
                <div className="our_clients">
                    <h2>Our clients</h2>
                    <p>A sneak peak of our fun and interactive sessions ...</p>
                    <div className="clientImg_container">
                        {client.map((image, index) => {
                            return (
                                <div className="clientImgBox" key={index}>
                                    <img src={image.img} alt="clients"/>
                                </div>
                            )
                        })}
                    </div>
                    <p className='clients_para'>Beyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazingBeyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazingBeyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazing</p>
                </div>
            </div>
        </div>
    )
}
