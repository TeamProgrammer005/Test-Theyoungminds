import React from 'react'
import { GrChatOption } from "react-icons/gr"
import {ImCross} from "react-icons/im"

const ReadMore = (props) => {
    return (
        <div className='readmoresection'>
            <div onClick={props.redmorehide} className='readmorebacksection' style={{height:"30%"}}>
            </div>
            <div className='readmoreinnersection'>
            <div onClick={props.redmorehide} className='cross mt-2 pr-4' style={{ color: "#193566" }}><ImCross /></div>
                <div className='readmorehead'>
                    <div></div>
                </div>
                <div className='readmorebody'>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    </p>
                </div>
                <div className='readmorefooter'>
                    <div className='readmorefooterdivider'></div>
                    {/*<div className='startjourneydiv'><button onClick={()=>{gotosyj("workshop")}} className='workshopstart'>Start your journey</button></div>
                    <div onClick={() => setmessageform("messagetext")} className='workshopicon'>
                        <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
    </div>*/}
                    <div className='startjourneydiv'><button onClick={props.startjourney} className='workshopstart'>Start your journey</button></div>
                    <div onClick={props.sendmessage} className='workshopicon'>
                        <span className='innericon'><GrChatOption style={{ marginTop: "5px" }} size={"1.5rem"} /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadMore