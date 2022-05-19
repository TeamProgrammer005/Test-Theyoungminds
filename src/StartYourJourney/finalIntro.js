import React,{useState} from 'react';
import { BiHomeAlt } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { TiTick } from "react-icons/ti"
import boy from "../image/boy.png"
import boy2 from "../image/boyleft.png"
import {useHistory} from "react-router-dom"

const FinalIntro = (props) => {
  const history = useHistory()
  const [learnertypeSelectedtick, setlearnertypeSelectedtick] = useState("finalintrocardticklearner");
  const [learnertypeSelectedCard, setlearnertypeSelectedCard] = useState("finalintrocardlearner");
  const [educatortypeSelectedtick, seteducatortypeSelectedtick] = useState("finalintrocardtickeducator");
  const [educatortypeSelectedCard, seteducatortypeSelectedCard] = useState("finalintrocardeducator");
  const [parenttypeSelectedtick, setparenttypeSelectedtick] = useState("finalintrocardtickparent");
  const [parenttypeSelectedCard, setparenttypeSelectedCard] = useState("finalintrocardparent");
  const [institutetypeSelectedtick, setinstitutetypeSelectedtick] = useState("finalintrocardtickinstitute");
  const [institutetypeSelectedCard, setinstitutetypeSelectedCard] = useState("finalintrocardinstitute");
  const userSelect=(user)=>{
      if(user===1){
        setlearnertypeSelectedtick("finalintrocardticklearnerselect")
        setparenttypeSelectedtick("finalintrocardtickparent")
        seteducatortypeSelectedtick("finalintrocardtickeducator")
        setinstitutetypeSelectedtick("finalintrocardtickinstitute")
        props.handleChange3("Learner")
      }
      else if(user===2){
        seteducatortypeSelectedtick("finalintrocardtickeducatorselect")
        setlearnertypeSelectedtick("finalintrocardticklearner")
        setparenttypeSelectedtick("finalintrocardtickparent")
        setinstitutetypeSelectedtick("finalintrocardtickinstitute")
        props.handleChange3("Educator")
      }
      else if(user===3){
        setparenttypeSelectedtick("finalintrocardtickparentselect")
        setlearnertypeSelectedtick("finalintrocardticklearner")
        seteducatortypeSelectedtick("finalintrocardtickeducator")
        setinstitutetypeSelectedtick("finalintrocardtickinstitute")
        props.handleChange3("Parent")
      }
      else if(user===4){
        setinstitutetypeSelectedtick("finalintrocardtickinstituteselect")
        setlearnertypeSelectedtick("finalintrocardticklearner")
        seteducatortypeSelectedtick("finalintrocardtickeducator")
        setparenttypeSelectedtick("finalintrocardtickparent")
        props.handleChange3("Institute")
      }
  }
  const goBackFn=()=>{
    if(props.loc==="workshop"){
        history.push({
            pathname:"/home",
            state:1
        })
    }
    else if(props.loc==="event"){
            history.push({
                pathname:"/home",
                state:2
            })
    }
    else if(props.loc==="ym program"){
        history.push({
            pathname:"/home",
            state:3
        })
    }
    else{
        history.push({
            pathname:"/home",
            state:4
        })
    }
}
  return <div className='startjourney'>
    <div className='sjhome'>
      <div onClick={goBackFn}><BiHomeAlt size={"1.5rem"} color='rgba(194, 203, 219, 1)' /></div>
      <div className='sjtopitems'><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(1) }}><div className='sjhomenuminner'>1</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(2) }}><div className='sjhomenuminner'>2</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(3) }}><div className='sjhomenuminner'>3</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(4) }}><div className='sjhomenuminner'>4</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(5) }}><div className='sjhomenuminner'>5</div></div><div className='sjline'></div></div>
      <div style={{color:"rgba(25, 53, 102, 1)"}}><CgProfile color="rgba(25, 53, 102, 1) !important" size={"1.5rem"}/></div>
    </div>
    <div className='tellus'>Tell Us</div>
    <div className='whour'>who you are!</div>
    <div className='finalintrocards' style={{paddingBottom:"110px"}}>
      <div className={learnertypeSelectedCard}>
        <div className='finalintrocardimage'>
          <img src={boy} />
        </div>
        <div className='finalintrocardtype'>Learner</div>
        <div className={learnertypeSelectedtick}>
          <TiTick onClick={()=>{userSelect(1);}} color='rgba(151, 167, 195, 0.5)' size="1rem" />
        </div>
      </div>
      <div className={educatortypeSelectedCard}>
        <div className='finalintrocardimage' style={{left:"60%"}}>
          <img src={boy2} />
        </div>
        <div className='finalintrocardtype' style={{left:"35%"}}>Educator</div>
        <div className={educatortypeSelectedtick} style={{left:"10%"}}>
          <TiTick onClick={()=>{userSelect(2);}} color='rgba(151, 167, 195, 0.5)' size="1rem" />
        </div>
      </div>
      <div className={parenttypeSelectedCard}>
        <div className='finalintrocardimage'>
          <img src={boy} />
        </div>
        <div className='finalintrocardtype'>Parent</div>
        <div className={parenttypeSelectedtick}>
          <TiTick onClick={()=>{userSelect(3);}} color='rgba(151, 167, 195, 0.5)' size="1rem" />
        </div>
      </div>
      <div className={institutetypeSelectedCard}>
        <div className='finalintrocardimage' style={{left:"60%"}}>
          <img src={boy2} />
        </div>
        <div className='finalintrocardtype' style={{left:"35%"}}>Institute</div>
        <div className={institutetypeSelectedtick} style={{left:"10%"}}>
          <TiTick onClick={()=>{userSelect(4);}} color='rgba(151, 167, 195, 0.5)' size="1rem" /> 
        </div>
      </div>
    </div>
    <div className='sjfooter'>
            <div className='sjdivider'></div>
            <div className='sjfootercontent'>
                <div className='sjskip' onClick={props.handleChange}>Skip</div>
                <div onClick={props.handleChange} className='sjnext'>Next</div>
            </div>
        </div>
  </div>;
};

export default FinalIntro;
