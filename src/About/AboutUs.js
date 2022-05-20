import React from 'react'
import { useState, useEffect } from 'react'
import reviewsData from "./reviewsData.json"
import "./AboutUs.css"
import qualityEducation from "./qualityEducation.json"
import "./responsiveAbout.css"
import Mainpage from '../Mainpage/Mainpage'

export default function AboutUs() {
    const YMData = [
        {
            name: "Udit Sharma",
            para: "Beyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazing design resources and how those at the top of the industry get things done through our podcast, interviews, articles, and live events.",
            post: "president",
            image: "image/uditSharma.jpg",
            id: 1
        },
        {
            name: "Pradyuma Agarwal",
            para: "Beyond the sense of community and opportunity that we strive to provide, XYZ is also the place to find out about amazing design resources and how those at the top of the industry get things done through our podcast, interviews, articles, and live events.",
            post: "leader",
            image: "image/pradyuma.png",
            id: 2
        }
    ]
    const Careers = [{img: "image/uditSharma.jpg"},{img: "image/pradyuma.png"},{img: "image/dilshad.jpg"},{img: "image/aanchal.jpg"},{img: "image/sayan.jpg"},{img: "image/gulafsan.jpg"},{img: "image/inish.jpg"},{img: "image/harsh.jpg"},{img: "image/young minds watermark 1.png"},{img: "image/young minds watermark 1.png"}]

    const [currentSlide, setCurrentSlide] = useState(0)
    const [testReview, settestReview] = useState(1)
    const [currentList, setCurrentList] = useState(0)
    const [currentName, setCurrentName] = useState("Minds")
    const [currentReview, setCurrentReview] = useState(0)
    const YMDataLength = YMData.length;
    const currentListLength= qualityEducation.length;
    const reviewLength = reviewsData.length;
    const autoScroll = true;
    let slideInterval;
    let listInterval;
    let reviewInterval;

    
    const prevList = ()=>{
        setCurrentList(currentList === 0 ? currentListLength - 1 : currentList - 1) 
    }
    const prevSlide = ()=>{
        setCurrentSlide(currentSlide === 0? YMDataLength - 1 : currentSlide - 1)
    }
    const nextSlide = () => {
        setCurrentSlide(currentSlide === YMDataLength - 1 ? 0 : currentSlide + 1)
        setCurrentName(currentName === "Minds" ? "Leader" : "Minds")
    }
    const nextReview = () => {
        setCurrentReview(currentReview === reviewLength - 1 ? 0 : currentReview + 1)
    }
    const nextTestReview = () => {
        settestReview(testReview === 3  ?  1 : testReview + 1)
    }
    const nextList = () => {
        setCurrentList(currentList === currentListLength - 1 ? 0 : currentList + 1)
    }
    const prevReview = () => {
        setCurrentReview(currentReview === 0 ? reviewLength - 1 : currentReview - 1)
    }
    const prevTestReview = () => {
        settestReview(testReview === 1  ?  3 : testReview - 1)
    }
    useEffect(() => {
        setCurrentReview(0)
    }, [])

    function auto() {
        slideInterval = setInterval(nextSlide, 10000);
    }
    function autoList() {
        listInterval = setInterval(nextList, 10000);
    }

    function autoReview() {
        reviewInterval = setInterval(nextReview, 10000);
    }

    const togglePage = (index) => {
        setCurrentSlide(index);
        setCurrentName(currentName === "Minds" ? "Leader" : "Minds");
    }
    const toggleList = (index) => {
        setCurrentList(index);
    }

    const change = (index) => {
        setCurrentReview(index);
    }
    const changeTestReview = (index) => {
        settestReview(index + 1);
    }

    useEffect(() => {
        if (autoScroll) {
            autoReview();
        }
        return () => clearInterval(reviewInterval)
    }, [currentReview])
    useEffect(() => {
        if (autoScroll) {
           autoList();
        }
        return () => clearInterval(listInterval)
    }, [currentList])

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval)
    }, [currentSlide, currentName])

    return (
        <>
            <div className="aboutDOM">
                <div className="introductionAbout">
                    <Mainpage title = "About Us" midHeading ="Never Stop Learning___" companyName="Sustainable" purpose= "Development" community="" display="none" img="image/aboutWallpaper.png" toggleDisplay="block" buttonDisplay= "none" headingDisplay="none" _display="none" buttonDisplay_store="none" homeDisplayBtn="none"/>
                    <div className="qualityEducation">
                        {qualityEducation.map((data,index)=>{
                            return (                      
                                    <div className={currentList === index ? "educationListDOM psuedoBg" : "educationListDOM"} key={index}>
                                        <div className={currentList === index ? "listUpperNav rotation" : "listUpperNav"}> 
                                            <img src={data.img} alt="" />
                                            <div className={currentList === index ? "listHeading rotateHead" : "listHeading"}>
                                                <h4>{data.heading1}</h4>
                                                <h3>{data.heading2}</h3>
                                            </div>
                                        </div>
                                        <ul className={index === currentList ? "toggleList changeDisplay" : "toggleList"}>
                                            <li>{data.list1}</li>
                                            <li>{data.list2}</li>
                                            <li>{data.list3}</li>
                                            <li>{data.list4}</li>
                                            <li>{data.list5}</li>
                                            <li>{data.list6}</li>
                                            <li>{data.list7}</li>
                                            <li>{data.list8}</li>
                                            <li>{data.list9}</li>
                                            <li>{data.list10}</li>
                                            <li>{data.list11}</li>
                                        </ul>
                                    </div>
                            )
                        })}
                    </div>
                    <div className="allIcons utility alliconextra">
                            <i className="fas fa-chevron-left" onClick={prevList} ></i>
                            <i className="fas fa-chevron-right" onClick={nextList}></i>
                        </div>
                            <div className="btnDOM">
                            {Array.from({ length: currentListLength}).map((item, index) => {
                                return (
                                    <div className={currentList === index ? "btn active" : "btn"} key={index} onClick={() => toggleList(index)}></div>
                                )
                            })}
                        </div>
                        <div className= "answer">
                            <div className="answerContainer">
                                <div className="headingOf">
                                    <h4>Why</h4>
                                <h2>The Young Minds</h2>
                                </div>
                                <img src="image/unnamed 1.png" alt="" />
                            </div>
                        <div className="ourStatement">
                            <div className="statement">
                                <p>Equal & Accessible Education.
                                    Strengthen the Science, Technology and Innovation Capacity
                                    Eliminate Discrimination in Education. 
                                    Universal Literacy and Numeracy.
                                    Universal Access to Information & Communication Technology
                                    Enhance SDG capacity and global partnership for sustainable development</p>
                            </div>
                        </div>
                        </div>   
                    <div className="wordFromYoungMinds">
                        <h4>Words From</h4>
                        <h2>The Young {currentName}</h2>
                        {YMData.map((slide, index) => {
                            return (
                                <div className={index === currentSlide ? "something current" : "something"} key={slide.id}>
                                    {index === currentSlide && (
                                        <>
                                            <div className="thoughts">
                                                <p>{slide.para}</p>
                                                <ul className='socialMediaIcons'>
                                                    <li><a href="https://www.facebook.com/theyoungminds.org/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f utility"></i></a></li>
                                                    <li><a href="https://www.instagram.com/youngminds.education/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram utility"></i></a></li>
                                                    <li><a href="https://twitter.com/theyoungminds_" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter utility"></i></a></li>
                                                </ul>
                                            </div>
                                            <div className="presidentDetails">
                                                <div className="imgBox">
                                                    <img src={slide.image} alt="" />
                                                </div>
                                                <h3>{slide.name}</h3>
                                                <span>{slide.post}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                          <div className="allIcons utility">
                            <i className="fas fa-chevron-left" onClick={prevSlide} ></i>
                            <i className="fas fa-chevron-right" onClick={nextSlide}></i>
                        </div>
                        <div className="btnDOM">
                            {Array.from({ length: YMDataLength }).map((item, index) => {
                                return (
                                    <div className={currentSlide === index ? "btn active" : "btn"} key={index} onClick={() => togglePage(index)}></div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                    <div className="testimonials">
                        <h2>Testimonials</h2>
                        <div className="newReviewsBox test_review">
                            {reviewsData.map((review, index) => {
                                return (
                                    <div className={testReview === review.slider ? "newReview newReviewTest" : "newReview"} key={index}>
                                        {testReview === review.slider && (
                                            <>
                                                <div className="empty profile" key={review.key}>
                                                <i className="fas fa-solid fa-user utility"></i>
                                                </div>
                                                <div className="detail">
                                                    <h4>{review.name}</h4>
                                                    <span>{review.designation}</span>
                                                    <div className="rating">
                                                        {Array.from({ length: review.star }).map((item,index) => {
                                                            return (
                                                                <i className="fas fa-star utility" key={index}></i>
                                                            )
                                                        })}

                                                    </div>
                                                </div>
                                                <p>{review.review}</p>
                                            </>
                                        )}
                                    </div>
                                )                     
                            })}
                        </div>
                        <div className="Deskicons utility">
                            <i className="fas fa-chevron-left" onClick={prevTestReview} ></i>
                            <i className="fas fa-chevron-right" onClick={nextTestReview}></i>
                        </div>
                        <div className="testBtnDOM">
                            {Array.from({ length: 3 }).map((item, index) => {
                                return (
                                    <div className={testReview === index + 1 ? "btn active" : "btn"} key={index} onClick={() => changeTestReview(index)} ></div>
                                )
                            })}
                        </div>
                        <div className="newReviewsBox ">
                            {reviewsData.map((review, index) => {
                                return (
                                    <div className="newReview fixChanges" key={index}>
                                                <div className="empty profile" >
                                                <i className="fas fa-solid fa-user utility"></i>
                                                </div>
                                                <div className="detail">
                                                    <h4>{review.name}</h4>
                                                    <span>{review.designation}</span>
                                                    <div className="rating">
                                                        {Array.from({ length: review.star }).map((item,index) => {
                                                            return (
                                                                <i className="fas fa-star utility" key={index}></i>
                                                            )
                                                        })}

                                                    </div>
                                                </div>
                                                <p>{review.review}</p>
                                    </div>
                                )                     
                            })}
                        </div>
                        <div className="reviewsBox">
                            {reviewsData.map((review, index) => {
                                return (
                                    <div className={index === currentReview ? "reviews present" : "reviews"} key={review.key}>
                                        {index === currentReview && (
                                            <>
                                                <div className="empty profile">
                                                <i className="fas fa-solid fa-user utility"></i>
                                                </div>
                                                <div className="detail">
                                                    <h4>{review.name}</h4>
                                                    <span>{review.designation}</span>
                                                    <div className="rating">
                                                        {Array.from({ length: review.star }).map((item,index) => {
                                                            return (
                                                                <i className="fas fa-star utility" key={index}></i>
                                                            )
                                                        })}

                                                    </div>
                                                </div>
                                                <p>{review.review}</p>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="icons">
                            <i className="fas fa-chevron-left" onClick={prevReview} ></i>
                            <i className="fas fa-chevron-right" onClick={nextReview}></i>
                        </div>
                        <div className="btnDOM">
                            {Array.from({ length: reviewLength }).map((item, index) => {
                                return (
                                    <div className={currentReview === index ? "btn active" : "btn"} key={index} onClick={() => change(index)} ></div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="knowUs">
                        <h2>GET TO KNOW US</h2>
                        <p>A sneak peak of our fun and interactive sessions ...</p>
                        <div className="join_us_setion">
                            {Careers.map((data, index)=>{
                                return (
                                    <div className="getToKnowUs" key={index}>
                                        <img src={data.img} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="join_our_community">

                        <a href='https://theyoungminds.zohorecruit.in/jobs/Careers/' target="_blank" rel="noopener noreferrer"><button>Careers</button></a>
                        </div>
                    </div>
                </div>
        </>
        
    )
}