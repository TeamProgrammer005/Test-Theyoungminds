import React from 'react'
import ReactGA from "react-ga"

const useGAEventsTracker = (category="Event Category") => {
    const trackEvent = (action = "action",label)=>{
        ReactGA.event({category,action,label})
    }
  return trackEvent
}

export default useGAEventsTracker