import React from "react";
import {Link} from "react-router-dom"
import "./workshop.css"

const Workshop = () => {
    return (
        <div className="container">
            <div className="Profile">
                <div className="row">

                 
                       
                            <h1 className="un"> <br />Workshop</h1>
                            <br />

                            <div className="mt-5 readmoreform">
                                <Link className="formbtn" to="/enroll"> <button className="p-2 morebutton">Enroll Now</button></Link>
                                <a href="https://store.theyoungminds.org/"> <button className="p-2 morebutton" >Shop Now</button></a>
                            </div>
     
                   
            
                </div>
            </div>
        </div>
    )
}

export default Workshop
