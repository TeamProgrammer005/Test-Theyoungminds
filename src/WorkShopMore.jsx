import React from 'react';
import { Link } from "react-router-dom";
import Footer1 from './Footer/Footer1';

const WorkShopMore = () => {


   return (
      <>
         <div className="bodyFixbackGround">
            <div className="flexCenterCol">


               <div className="banner">
                  <h1> Hello <strong> I am read more</strong></h1>
                  <Link to="/form">  <button className='buttn btn '>Enroll now </button></Link>

                  <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='buttn btn ' >
                     <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
                  </button>



               </div>
            </div>

            <div className="overflow">
               <br />  <br />
               <p className='cerntershadowcard'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
               </p>
               <p className='cerntershadowcard'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
               </p>
               <p className='cerntershadowcard'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
               </p>
               <p className='cerntershadowcard'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
               </p>
               <p className='cerntershadowcard'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero minima sint amet vero obcaecati aliquam cumque pariatur expedita velit ab quasi nostrum eveniet doloribus, consectetur nobis ipsum, similique veritatis?
               </p>
         
          <br />
          <br />
          <br />
            
          <Footer1 />
          <br />
          <br />
          <br />

            </div>
     
         </div>
        
   
         <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Share on social media</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     icon goes here
                  </div>
                  <div className="modal-footer">

                  </div>
               </div>
            </div>
         </div>
      </>
   )

}

export default WorkShopMore
