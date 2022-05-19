import React from 'react'
import HomeImage from "../image/ymwatermark.png"

const DashboardHome = () => {
  return (
    <div className='dashboardhome'>
        <div><img src={HomeImage} width="150px" height={"150px"} alt=""/></div>
        <div className='dashboardhometext'>The Young Minds</div>
    </div>
  )
}

export default DashboardHome