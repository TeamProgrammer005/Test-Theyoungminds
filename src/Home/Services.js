import React from 'react'
import useGAEventsTracker from '../GaEvent/useGAEventsTracker'
import { useHistory } from "react-router-dom"
import { IoInformation } from "react-icons/io5"
import { Carousel } from 'react-bootstrap'
import {MdOutlineKeyboardArrowLeft} from "react-icons/md"
import "./home.css"

const Services = () => {
    const history = useHistory()
    const GAEventsTracker = useGAEventsTracker("Home Page Redirection")
    return (
        <div className='hometempservices'>
            <div className='workshoptop'>
                <div onClick={()=>{history.goBack()}}  className='arrow' style={{ marginLeft: "20px"}}><MdOutlineKeyboardArrowLeft size={"2rem"} /></div>
                <div className='topworkshop ourservicesheader'>OUR SERVICES</div>
            </div>
            <div className='container storecontainer'>
                <div className='storerow1'>
                    <a href="/order3d"><Carousel onClick={(e) => { GAEventsTracker("Product Viewed", `productName : "Additive Manufacturing"`); GAEventsTracker("Product Viewed", `productCategory:"YM Services"`) }} interval={null} className="ymservicecarousel" style={{ height: "173px" }}>
                        <Carousel.Item>
                            <div className='uppertextstore'>
                                <div className='storeproduct'>ADDITIVE MANUFACTURING</div>
                                <div className='iobtn'><IoInformation /></div>
                            </div>
                        </Carousel.Item>
                    </Carousel></a>
                </div>
                <div className='storerow1'>
                    <a href="/3d_design"><Carousel onClick={(e) => { GAEventsTracker("Product Viewed", `productName : "3D Modelling"`); GAEventsTracker("Product Viewed", `productCategory:"YM Services"`) }} className="ymservicecarousel" interval={null} style={{ height: "173px" }}>
                        <Carousel.Item>
                            <div className='uppertextstore'>
                                <div className='storeproduct'>3D MODELLING</div>
                                <div className='iobtn'><IoInformation /></div>
                            </div>
                        </Carousel.Item>
                    </Carousel></a>
                </div>
                <div className='storerow1 mb-5'>
                    <a href="/askforrepair"><Carousel onClick={(e) => { GAEventsTracker("Product Viewed", `productName : "Fix Your Printer"`); GAEventsTracker("Product Viewed", `productCategory:"YM Services"`) }} className="ymservicecarousel" interval={null} style={{ height: "173px" }}>
                        <Carousel.Item>
                            <div className='uppertextstore'>
                                <div className='storeproduct'>FIX YOUR PRINTER</div>
                                <div className='iobtn'><IoInformation /></div>
                            </div>
                        </Carousel.Item>
                    </Carousel></a>
                </div>
            </div>
        </div>
    )
}

export default Services