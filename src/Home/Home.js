import React, { useState, useEffect } from 'react'
import "./home.css"
import { Form, Button } from "react-bootstrap"
import homelogo from "../image/homeymlogo2.png"
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { GrChatOption } from "react-icons/gr"
import { ImCross } from "react-icons/im"
import { IoInformation } from "react-icons/io5"
import ymimage from "../image/homeymlogo2.png"
import Carousel from 'react-bootstrap/Carousel'
import classroomcollection from "../image/classroomcollection.jpg"
import printer from "../image/3dprintersandrobotics.jpg"
import educational from "../image/educationaltoys.jpg"
import school from "../image/school.jpg"
import { useHistory, useLocation, Link } from "react-router-dom"
import ReadMore from './ReadMore'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import useGAEventsTracker from '../GaEvent/useGAEventsTracker'

const Home = () => {
    const history = useHistory();
    const location = useLocation();
    const [readmore, setreadmore] = useState("readmorehide")
    const [messageform, setmessageform] = useState("readmorehide")
    const [index, setIndex] = useState(0);
    const [hometype, sethometype] = useState("home")
    const { register, handleSubmit, errors } = useForm();

    const gotosyj = (type) => {
        history.push({
            pathname: '/syj',
            state: type
        })
    }
    useEffect(() => {
        console.log(location.state)
        setIndex(location.state)
    }, [location])

    const GAEventsTracker = useGAEventsTracker("Home Page Redirection")

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    function settypename() {
        if (index == 1) {
            sethometype("workshop")
        }
    }
    const hidereadmore = () => {
        setreadmore("readmorehide")
    }
    const querySubmit = async (data, e) => {
        e.preventDefault();
        console.log(data)
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }
            const resp = await axios.post('http://localhost:4000/query', data, config)
            if (resp.data) {
                alert("We will contact you soon")
                setmessageform("messageformhide")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div style={{ overrideX: "hidden" }}>
            {
                index == 1 ? <div className='workshoptop'>
                    <div onClick={() => setIndex(0)} className='arrow' style={{ marginLeft: "20px", paddingLeft: "2px" }}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                    <div className='topworkshop'>WORKSHOP</div>
                    <div className='arrow' onClick={() => setIndex(2)} style={{ paddingLeft: "3px", marginRight: "20px" }}><MdOutlineKeyboardArrowRight size={"2rem"} /></div>
                </div> : ""
            }
            {
                index == 2 ? <div className='workshoptop'>
                    <div onClick={() => setIndex(1)} className='arrow' style={{ marginLeft: "20px", paddingLeft: "2px" }}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                    <div className='topworkshop'>EVENT</div>
                    <div onClick={() => setIndex(3)} className='arrow' style={{ paddingLeft: "3px", marginRight: "20px" }}><MdOutlineKeyboardArrowRight size={"2rem"} /></div>
                </div> : ""
            }
            {
                index == 3 ? <div className='workshoptop'>
                    <div onClick={() => setIndex(2)} className='arrow' style={{ marginLeft: "20px", paddingLeft: "2px" }}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                    <div className='topworkshop'>YM PROGRAM</div>
                    <div onClick={() => setIndex(4)} className='arrow' style={{ paddingLeft: "3px", marginRight: "20px" }}><MdOutlineKeyboardArrowRight size={"2rem"} /></div>
                </div> : ""
            }
            {
                index == 4 ? <div className='workshoptop'>
                    <div onClick={() => setIndex(3)} className='arrow' style={{ marginLeft: "20px", paddingLeft: "2px" }}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                    <div className='topworkshop'>YOUNG LEADERS</div>
                    <div onClick={() => setIndex(5)} className='arrow' style={{ paddingLeft: "3px", marginRight: "20px" }}><MdOutlineKeyboardArrowRight size={"2rem"} /></div>
                </div> : ""
            }
            {
                index == 5 ? <div className='workshoptop'>
                    <div onClick={() => setIndex(4)} className='arrow' style={{ marginLeft: "20px", paddingLeft: "2px" }}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                    <div className='topworkshop'>OUR STORE</div>
                    <div onClick={() => setIndex(6)} className='arrow' style={{ paddingLeft: "3px", marginRight: "20px" }}><MdOutlineKeyboardArrowRight size={"2rem"} /></div>
                </div> : ""
            }
            {
                index == 6 ? <div className='workshoptop'>
                    <div onClick={() => setIndex(5)} className='arrow' style={{ marginLeft: "20px", paddingLeft: "2px" }}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                    <div className='topworkshop'>YM SERVICES</div>
                    <div onClick={() => setIndex(0)} className='arrow' style={{ paddingLeft: "3px", marginRight: "20px" }}><MdOutlineKeyboardArrowRight size={"2rem"} /></div>
                </div> : ""
            }
            <div className={readmore}>
                <div className='readmorebody'>
                    <ReadMore sendmessage={() => setmessageform("messagetext")} startjourney={() => gotosyj("workshop")} redmorehide={hidereadmore} />
                </div>
            </div>
            <div className={messageform}>
                <div onClick={() => setmessageform("messageformhide")} className='cross mt-2 pr-4' style={{ color: "#193566" }}><ImCross /></div>
                <form onSubmit={handleSubmit(querySubmit)}>
                    <div className='messagetextformgroup'>
                        <div className=''>
                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                name='name'
                                ref={register({
                                    required: 'Name is required.'
                                })}
                                className={`messagetextinput ${errors.name ? 'input-error' : ''}`} /><br />
                        </div>
                        {errors.name && (
                            <p className="errorMsg">{errors.name.message}</p>
                        )}
                    </div>
                    <div className='messagetextformgroup'>
                        <div className=''>
                            <input
                                type="number"
                                name="phoneNumber"
                                placeholder='Enter Your Phone Number'
                                autoComplete="off"
                                ref={register({
                                    required: 'Phone Number is required.',
                                    minLength: {
                                        value: 10,
                                        message: 'Phone Number should be at-least 10 digits.'
                                    },
                                    valueAsNumber: true
                                })}
                                className={`messagetextinput ${errors.phoneNumber ? 'input-error' : ''}`} />
                        </div>
                        {errors.phoneNumber && (
                            <p className="errorMsg">{errors.phoneNumber.message}</p>
                        )}
                    </div>
                    <div className='messagetextformgroup'>
                        <div className=''>
                            <textarea
                                type="textArea"
                                name="query"
                                rows={3}
                                placeholder='Ask your query'
                                autoComplete="off"
                                ref={register({
                                    required: 'Please Enter your query.'
                                })}
                                className={`messagetextinputArea ${errors.query ? 'input-error' : ''}`} />
                        </div>
                        {errors.query && (
                            <p className="errorMsg">{errors.query.message}</p>
                        )}
                    </div>
                    <div className='homebuttons'>
                        <div onClick={() => window.location = 'mailto:connect.theyoungminds@gmail.com'} className='homedashboardbutton'>Mail your query</div>
                        <button type='submit' className='homesignupbutton'>Submit</button>
                    </div>
                </form>
            </div>
            <Carousel id="maincarousel" interval={null} activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item style={{ height: "100%" }}>
                    <div classname="homevector">
                        <img className='homevecimg' src={homelogo} />
                    </div>
                    <div className='ymslogan'>
                        Let's Make education equitable & accessible
                    </div>
                    <button className='homestartedbutton' onClick={() => { history.push("/syj") }}>
                        Let's Get Started
                    </button>
                    <div className='homebuttons'>
                        <button className='homedashboardbutton2'>My Dashboard</button>
                        <button onClick={() => { history.push("/signup") }} className='homesignupbutton2 ml-3'>Sign up</button>
                    </div>
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>

                    <div className='workshopvector'>
                        <img src={ymimage} className='mt-3' />
                    </div>
                    <div className='workshoptext'>
                        Nam tellus dui, faucibus a condimentum eget, facilisis sed ex. Maecenas tellus sapien, pellentesque sed sagittis nec, luctus ultricies nulla. Etiam vel quam nec orci interdum lacinia ut et nisi. Phasellus ut felis tincidunt, consequat turpis vitae, hendrerit tellus. Suspendisse eleifend blandit quam. Suspendisse libero quam, gravida non metus eget, efficitur cursus dolor. In eget posuere augue. Curabitur
                    </div>
                    <div className='workshopmore'><span onClick={() => setreadmore("readmoretext")}>Read More</span></div>
                    <div className='startjourneydiv'><button onClick={() => { gotosyj("workshop") }} className='workshopstart'>Start your journey</button></div>
                    <div onClick={() => setmessageform("messagetext")} className='workshopicon'>
                        <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                    </div>
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <div className='workshopvector'>
                        <img src={ymimage} className='mt-3' />
                    </div>
                    <div className='workshoptext'>
                        Nam tellus dui, faucibus a condimentum eget, facilisis sed ex. Maecenas tellus sapien, pellentesque sed sagittis nec, luctus ultricies nulla. Etiam vel quam nec orci interdum lacinia ut et nisi. Phasellus ut felis tincidunt, consequat turpis vitae, hendrerit tellus. Suspendisse eleifend blandit quam. Suspendisse libero quam, gravida non metus eget, efficitur cursus dolor. In eget posuere augue. Curabitur
                    </div>
                    <div className='workshopmore'>
                        <span onClick={() => setreadmore("readmoretext")}>Read More</span>
                    </div>
                    <div className='startjourneydiv'><button onClick={() => { gotosyj("event") }} className='workshopstart'>Start your journey</button></div>
                    <div onClick={() => setmessageform("messagetext")} className='workshopicon'>
                        <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                    </div>
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <div className='workshopvector'>
                        <img src={ymimage} className='mt-3' />
                    </div>
                    <div className='workshoptext'>
                        Nam tellus dui, faucibus a condimentum eget, facilisis sed ex. Maecenas tellus sapien, pellentesque sed sagittis nec, luctus ultricies nulla. Etiam vel quam nec orci interdum lacinia ut et nisi. Phasellus ut felis tincidunt, consequat turpis vitae, hendrerit tellus. Suspendisse eleifend blandit quam. Suspendisse libero quam, gravida non metus eget, efficitur cursus dolor. In eget posuere augue. Curabitur
                    </div>
                    <div className='workshopmore'>
                        <span onClick={() => setreadmore("readmoretext")}>Read More</span>
                    </div>
                    <div className='startjourneydiv'><button onClick={() => { gotosyj("ym program") }} className='workshopstart'>Start your journey</button></div>
                    <div onClick={() => setmessageform("messagetext")} className='workshopicon'>
                        <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                    </div>
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <div className='workshopvector'>
                        <img src={ymimage} className='mt-3' />
                    </div>
                    <div className='workshoptext'>
                        Nam tellus dui, faucibus a condimentum eget, facilisis sed ex. Maecenas tellus sapien, pellentesque sed sagittis nec, luctus ultricies nulla. Etiam vel quam nec orci interdum lacinia ut et nisi. Phasellus ut felis tincidunt, consequat turpis vitae, hendrerit tellus. Suspendisse eleifend blandit quam. Suspendisse libero quam, gravida non metus eget, efficitur cursus dolor. In eget posuere augue. Curabitur
                    </div>
                    <div className='workshopmore'>
                        <span onClick={() => setreadmore("readmoretext")}>Read More</span>
                    </div>
                    <div className='startjourneydiv'><button onClick={() => { gotosyj("young leaders") }} className='workshopstart'>Start your journey</button></div>
                    <div onClick={() => setmessageform("messagetext")} className='workshopicon'>
                        <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                    </div>
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <div className='container storecontainer'>
                        <div className='storerow2 storecarousel'>
                            <Carousel interval={null} style={{ height: "234px" }}>
                                <Carousel.Item style={{ height: "234px" }}>
                                    <a target="_blank" href='https://store.theyoungminds.org/collections/classroom-collection'>
                                        <img
                                            className="storeimage"
                                            src={classroomcollection}
                                            alt="First slide"
                                        />
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a target="_blank" href='https://store.theyoungminds.org/collections/3d-printers-robotics'>
                                        <img
                                            className="storeimage"
                                            src={printer}
                                            alt="First slide"
                                        />
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a target="_blank" href='https://store.theyoungminds.org/collections/educational-toy'>
                                        <img
                                            className="storeimage"
                                            src={educational}
                                            alt="First slide"
                                        />
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a target="_blank" href='https://store.theyoungminds.org/collections/collection-4'>
                                        <img
                                            className="storeimage"
                                            src={school}
                                            alt="First slide"
                                        />
                                    </a>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className='storerow2'>
                            <div className='uppertextstore'>
                                <div className='storeproduct'>EXPLORE<br /> MORE</div>
                                <div className='iobtn'><IoInformation /></div>
                            </div>
                            <div className='storeline'>
                                <div className='storeinnerline'></div>
                            </div>
                            <div>
                                <button className='storebutton'><a target="_blank" href='https://store.theyoungminds.org/collections/collection-4'>HOME SCHOOL</a></button>
                                <button style={{ marginLeft: "15px" }} className='storebutton'><a target='_blank' href='https://store.theyoungminds.org/collections/3d-printers-robotics'>3D PRINTERS</a></button>
                            </div>
                            <div>
                                <button className='storebutton'><a target="_blank" href='https://store.theyoungminds.org/collections/classroom-collection'>CLASSROOM</a></button>
                                <button style={{ marginLeft: "15px" }} className='storebutton'><a target='_blank' href='https://store.theyoungminds.org/collections/educational-toy'>EDUCATIONAL TOYS</a></button>
                            </div>
                        </div>
                        <div onClick={() => setmessageform("messagetext")} className='icondivwrap' style={{ paddingTop: "20px" }}><div className='workshopicon'>
                            <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                        </div></div>
                        <div>
                            <a target="_blank" href="https://store.theyoungminds.org/"><button className='ourstorebutton mb-5'>OUR STORE</button></a>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <div className='container storecontainer'>
                        <div className='storerow1'>
                            <Link to="/order3d"><Carousel onClick={(e) => { GAEventsTracker("Product Viewed", `productName : "Additive Manufacturing"`); GAEventsTracker("Product Viewed", `productCategory:"YM Services"`) }} interval={null} className="ymservicecarousel" style={{ height: "173px" }}>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>ADDITIVE MANUFACTURING</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>ADDITIVE MANUFACTURING</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>ADDITIVE MANUFACTURING</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                            </Carousel></Link>
                        </div>
                        <div className='storerow1'>
                            {/*<div className='uppertextstore'>
                                <div className='storeproduct'>3D MODELLING</div>
                                <div className='iobtn'><IoInformation /></div>
                </div>*/}
                            <Link to="/3d_design"><Carousel onClick={(e) => { GAEventsTracker("Product Viewed", `productName : "3D Modelling"`); GAEventsTracker("Product Viewed", `productCategory:"YM Services"`) }} className="ymservicecarousel" interval={null} style={{ height: "173px" }}>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>3D MODELLING</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>3D MODELLING</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>3D MODELLING</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                            </Carousel></Link>
                        </div>
                        <div className='storerow1 mb-5'>
                            <Link to="/askforrepair"><Carousel onClick={(e) => { GAEventsTracker("Product Viewed", `productName : "Fix Your Printer"`); GAEventsTracker("Product Viewed", `productCategory:"YM Services"`) }} className="ymservicecarousel" interval={null} style={{ height: "173px" }}>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>FIX YOUR PRINTER</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>FIX YOUR PRINTER</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className='uppertextstore'>
                                        <div className='storeproduct'>FIX YOUR PRINTER</div>
                                        <div className='iobtn'><IoInformation /></div>
                                    </div>
                                </Carousel.Item>
                            </Carousel></Link>
                        </div>
                        <div onClick={() => setmessageform("messagetext")} className='workshopicon'>
                            <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
export default Home