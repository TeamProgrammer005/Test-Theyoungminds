import React from 'react';
import {FiAlertTriangle} from "react-icons/fi"

const SignoutPopup = (props) => {
  return <div className='footerpopup'>
      <div className='signoutpopupinner'>
        <div><FiAlertTriangle size={"4rem"}/></div>
        <div className='suresignout'>Are you sure you want to sign out?</div>
        <div className='signoutoptions'>
            <div className='signout'>Sign out</div>
            <div onClick={props.handleclose} className='cancelbutton'>cancel</div>
        </div>
      </div>
  </div>;
};

export default SignoutPopup;
