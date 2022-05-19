import React, { useState } from 'react';
import "./startjourney.css"
import { AiOutlineSearch } from "react-icons/ai"
import sjimage from "../image/sjimage.png"
import { AiOutlinePlus } from "react-icons/ai"
import { BiHomeAlt } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import {TiTick} from "react-icons/ti"
import {useHistory} from "react-router-dom"

const Technology = (props) => {
    const history = useHistory()
    const [isSelected, setisSelected] = useState(false);
    const [searchTerm, setsearchTerm] = useState("")
    const [selectedSubject, setselectedSubject] = useState([]);
    function subjectSelectedFn(subjectid) {
        setselectedSubject(oldid=>[...oldid,subjectid])
        setisSelected(true)
    }
    const [mathCourses] = useState([
        { id: 1, course: "3D Printing", coursenumber: 2 },
        { id: 2, course: "Robotics", coursenumber: 3 },
        { id: 3, course: "AI", coursenumber: 4 }
    ]);
    const selectAllFn=()=>{
        mathCourses.map((mathCourse)=>{
            props.handleChange3(mathCourse.course)
            subjectSelectedFn(mathCourse.id)
        })
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
            <div className='sjtopitems'><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(1) }}><div className='sjhomenuminner'>1</div></div><div className='sjline'></div><div className='sjhomenumouter' onClick={() => { props.handleChange2(2) }}><div className='sjhomenum'>2</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(3) }}><div className='sjhomenuminner'>3</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(4) }}><div className='sjhomenuminner'>4</div></div><div className='sjline'></div><div className='' onClick={() => { props.handleChange2(5) }}><div className='sjhomenuminner'>5</div></div><div className='sjline'></div></div>
            <div><CgProfile onClick={() => { props.handleChange2(6) }} size={"1.5rem"} color='rgba(194, 203, 219, 1)' /></div>
        </div>
        <div className='sjheader'>Technology</div>
        <div className='sjcategory'>
            <div className='inputtext mt-4'>
                <AiOutlineSearch color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                <input
                    placeholder='Search goes here'
                    type="text"
                    onChange={(event)=>{setsearchTerm(event.target.value)}}
                />
            </div>
            <div onClick={selectAllFn} className='sjcategoryselect'>Select all</div>
        </div>

        <div className='sjcardhead1'>
            {
                mathCourses.filter((mathCourse)=>{
                    if(searchTerm==""){
                        return mathCourse
                    }else if(mathCourse.course.toLowerCase().includes(searchTerm.toLowerCase())){
                        return mathCourse
                    }
                }).map(mathCourse => {
                    return (
                        <div className='sjcard mt-4' key={mathCourse.id}>
                            <img src={sjimage} width="156px" height={"98px"} />
                            <div className='sjcardtext'>
                                <div>
                                    <div className='sjtextname'>{mathCourse.course}</div>
                                    <div className='sjtextcourse'>{mathCourse.coursenumber} courses</div>
                                </div>
                                {
                                    isSelected === true && selectedSubject.some((eachsub)=>eachsub===mathCourse.id) ?
                                        <div className='selecteditem'>
                                            <TiTick color='white'/>
                                        </div>
                                        :
                                        <div className='additem' onClick={() => { props.handleChange3(mathCourse.course); subjectSelectedFn(mathCourse.id); }}>
                                            <AiOutlinePlus size={"0.6rem"} color='white'/>
                                        </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='sjfooter'>
            <div className='sjdivider'></div>
            <div className='sjfootercontent'>
                <div className='sjskip' onClick={() => { props.handleChange2(6) }}>Skip</div>
                <div onClick={props.handleChange} className='sjnext'>Next</div>
            </div>
        </div>
    </div>;
};

export default Technology;
