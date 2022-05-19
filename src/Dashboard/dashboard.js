import React, { useState,useRef } from 'react';
import "./dashboard.css"
import { ImCross } from "react-icons/im"
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai"
import { IoIosArrowDropdown,IoIosArrowDropup } from "react-icons/io"
import { BiHelpCircle } from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import {GrAddCircle} from "react-icons/gr"
import SignoutPopup from './SignoutPopup';
import FooterPopup from './footerPopup';

const Dashboard = () => {
  const [showlearningcontent, setshowlearningcontent] = useState("hidelearningcontent");
  const [showworkshopcontent, setshowworkshopcontent] = useState("hideworkshopcontent");
  const [downArrowlearning, setdownArrowlearning] = useState(true);
  const [downArrowworkshop, setdownArrowworkshop] = useState(true);
  const [showFooterPopup, setshowFooterPopup] = useState(false);
  const [isSignout, setisSignout] = useState(false);
  const togglepopup =()=>{
    setshowFooterPopup(!showFooterPopup)
  }
  const toggleSignoutpopup=()=>{
    setisSignout(!isSignout)
  }
  function changeLearningDisplay(){
    if(showlearningcontent==="hidelearningcontent"){
      setshowlearningcontent("showlearningcontent")
    }else{
      setshowlearningcontent("hidelearningcontent")
    }
    setdownArrowlearning(!downArrowlearning)
  }
  function changeworkshopdisplay(){
    if(showworkshopcontent==="hideworkshopcontent"){
      setshowworkshopcontent("showworkshopcontent")
    }else{
      setshowworkshopcontent("hideworkshopcontent")
    }
    setdownArrowworkshop(!downArrowworkshop)
  }
  return <div className='dashboard'>
    <div className='dashboardinner'>
      <div><ImCross size={"0.8rem"} /><span className='dashboardhead'>Your Spaces</span></div>
      <div className='inputtext mt-4'>
        <AiOutlineSearch color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
        <input
          placeholder='Search goes here'
          type="text"
        />
      </div>
      <div className='dashboardspaces'>
        <div className='dashboardspacetitle'>LEARNING SPACE</div>
        {
          downArrowlearning ? <div onClick={changeLearningDisplay}><IoIosArrowDropdown /></div>
          :
          <div onClick={changeLearningDisplay}><IoIosArrowDropup /></div>
        }
      </div>
      <div className={showlearningcontent}>
        <div className='dashboardspacecontent'>
          <div className='dashboardspacecontentinner'>
            <div className='dashboardcircle'></div>
            <div className='ml-4'>
              <div className='dashboardname'>Learning spaces</div>
              <div className='dashboardcontent'>Content goes here</div>
            </div>
          </div>
          <div><BsThreeDotsVertical onClick={togglepopup}/></div>
        </div>
        <div className='dashboardspacecontent'>
          <div className='dashboardspacecontentinner'>
            <div className='dashboardcircle'></div>
            <div className='ml-4'>
              <div className='dashboardname'>Learning spaces</div>
              <div className='dashboardcontent'>Content goes here</div>
            </div>
          </div>
          <div><BsThreeDotsVertical onClick={togglepopup}/></div>
        </div>
        <div className='dashboardspacecontent'>
          <div className='dashboardspacecontentinner'>
            <div className='dashboardcircle'></div>
            <div className='ml-4'>
              <div className='dashboardname'>Learning spaces</div>
              <div className='dashboardcontent'>Content goes here</div>
            </div>
          </div>
          <div><BsThreeDotsVertical onClick={togglepopup}/></div>
        </div>
      </div>
      <div className='dashboardspaces'>
        <div className='dashboardspacetitle'>WORKSPACE</div>
        {
          downArrowworkshop ? <div onClick={changeworkshopdisplay}><IoIosArrowDropdown /></div>
          :
          <div onClick={changeworkshopdisplay}><IoIosArrowDropup /></div>
        }
      </div>
      <div className={showworkshopcontent}>
        <div className='dashboardspacecontent'>
          <div className='dashboardspacecontentinner'>
            <div className='dashboardcircle'></div>
            <div className='ml-4'>
              <div className='dashboardname'>Learning spaces</div>
              <div className='dashboardcontent'>Content goes here</div>
            </div>
          </div>
          <div><BsThreeDotsVertical onClick={togglepopup}/></div>
        </div>
        <div className='dashboardspacecontent'>
          <div className='dashboardspacecontentinner'>
            <div className='dashboardcircle'></div>
            <div className='ml-4'>
              <div className='dashboardname'>Learning spaces</div>
              <div className='dashboardcontent'>Content goes here</div>
            </div>
          </div>
          <div><BsThreeDotsVertical onClick={togglepopup}/></div>
        </div>
        <div className='dashboardspacecontent'>
          <div className='dashboardspacecontentinner'>
            <div className='dashboardcircle'></div>
            <div className='ml-4'>
              <div className='dashboardname'>Learning spaces</div>
              <div className='dashboardcontent'>Content goes here</div>
            </div>
          </div>
          <div><BsThreeDotsVertical onClick={togglepopup}/></div>
        </div>
      </div>
      <div className='dashboardfooter'>
        <hr />
        <div className='dashboardrefer'><GrAddCircle /><span className='ml-2'>Add a space</span></div>
        <div className='dashboardrefer'><AiOutlineShoppingCart /><span className='ml-2'>Go to store</span></div>
        <div className='dashboardrefer'><AiOutlineSetting /><span className='ml-2'>Preferences</span></div>
        <div className='dashboardrefer'><BiHelpCircle /><span className='ml-2'>Help</span></div>
      </div>
    </div>
    {
      showFooterPopup && <FooterPopup handleSignout={toggleSignoutpopup} handleclose={togglepopup}/>
    }
    {
      isSignout && <SignoutPopup handleclose={toggleSignoutpopup}/>
    }
  </div>;
};

export default Dashboard;
