import React from 'react';
import {MdOutlinePersonAddAlt} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"
import {ImCross} from "react-icons/im"

const FooterPopup = (props) => {
  return <div className='footerpopup'>
      <div className='footerpopupinner'>
        <div className='mb-3'><MdOutlinePersonAddAlt/><span className='footerpopupnames ml-3'>Invite Members</span></div>
        <div onClick={props.handleSignout} className='mb-3'><FiLogOut/><span className='footerpopupnames ml-3'>Sign Out</span></div>
        <div onClick={props.handleclose} className='mb-3'><ImCross size={"0.8rem"}/><span className='footerpopupnames ml-3'>Cancel</span></div>
      </div>
  </div>;
};

export default FooterPopup;
