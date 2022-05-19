import React,{useEffect, useState} from 'react';
import Science from './science';
import Technology from './technology';
import Engineering from './engineering';
import Arts from './art';
import Math from './math';
import FinalIntro from "./finalIntro";
import {useHistory,useLocation} from "react-router-dom"
import axios from "axios"
import Loader from '../Signin/loader';

const StartYourJourney = () => {
    const history = useHistory();
    const location = useLocation();
    const [isloading, setisloading] = useState(false)
    const [journeyName, setjourneyName] = useState(1);
    const [myDataArr, setmyDataArr] = useState([]);
    const [userType, setuserType] = useState("Learner");
    const [userData, setuserData] = useState([]);
    const changeJourneyName=async()=>{
        if(journeyName===6){
            setisloading(true)
            const type = location.state
            const userCompleteData = {userType,homeLocation:location.state,subject:JSON.stringify(myDataArr)}
            try {
                console.log(userCompleteData)
                const config = { headers: { 'Content-Type': 'application/json' } }
                const resp = await axios.post('https://node-app-ym.herokuapp.com/user/userpath', userCompleteData, config)
                console.log(resp)
                if (resp) {
                    setisloading(false)
                    history.push({
                        pathname: '/signup',
                        state:userType
                    });
                }
            }
            catch (err) {
                console.log(err)
                setisloading(false)
            }
        }else{
            setjourneyName(journeyName+1)
        }
    }
    const userTypeSelection=(user)=>{
        setuserType(user)
    }
    const addUserChoice=(data)=>{
        setmyDataArr(oldArr=>[...oldArr,data])
        console.log(myDataArr)
    }
    const goToJourney=(journeynum)=>{
        setjourneyName(journeynum)
    }
    if(isloading==false){
        return <div>
        {
            journeyName===1 && <Science loc={location.state} handleChange={changeJourneyName} handleChange2={goToJourney} handleChange3={addUserChoice}/>
        }
        {
            journeyName===2 && <Technology loc={location.state} handleChange={changeJourneyName} handleChange2={goToJourney} handleChange3={addUserChoice}/>
        }
        {
            journeyName===3 && <Engineering loc={location.state} handleChange={changeJourneyName} handleChange2={goToJourney} handleChange3={addUserChoice}/>
        }
        {
            journeyName===4 && <Arts loc={location.state} handleChange={changeJourneyName} handleChange2={goToJourney} handleChange3={addUserChoice}/>
        }
        {
            journeyName===5 && <Math loc={location.state} handleChange={changeJourneyName} handleChange2={goToJourney} handleChange3={addUserChoice}/>
        }
        {
            journeyName===6 && <FinalIntro loc={location.state} handleChange={changeJourneyName} handleChange2={goToJourney} handleChange3={userTypeSelection}/>
        }
    </div>;
    }
    else{
        return(
            <div><Loader/></div>
        )
    }
};

export default StartYourJourney;
