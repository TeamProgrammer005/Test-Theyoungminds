import React from 'react';
import "../Registration/registration.css";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ym_watermark from "../image/ymwatermark.png";
import QrCode from 'react-qr-code'
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa"
import { AiOutlineInstagram } from "react-icons/ai";
import { GoLocation } from "react-icons/go"
import { getTData } from '../api';
import { MdCheckCircle, MdDangerous } from 'react-icons/md'
import axios from 'axios';
import { exportComponentAsPNG } from 'react-component-export-image';

const Tiket2 = () => {
    const [compclass, setCompclass] = useState(1);
    const [data, setData] = useState('');
    const componentRef = useRef();
    const { _id } = useParams();
    var domainNow = window.location.host

     const  Url= process.env.REACT_APP_API

    const getBytoken = async () => {
        let res = await axios.get(`${Url}/getideaof3d/${_id}`)


        if (res.data !== undefined) {

            setData(res.data)
            setCompclass(2)
        } else {
            setCompclass(3)
        }
    }

    useEffect(() => {
        getBytoken()
    }, []);
    const SaveMytiket = () => {
        document.getElementById("maskloder").style.display = "block";
        exportComponentAsPNG(componentRef);

        setTimeout(() => {
            document.getElementById("maskloder").style.display = "none";
        }, 2000);
    }


    const ComponentToPrint = React.forwardRef((props, ref) => (
        <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>



            <div className='makeroundShadow'> <div className="rowDisplay"><MdCheckCircle size={135} color="rgb(95 183 17)" id='verify' /><MdDangerous size={135} color="red" id='unVerify' /></div> </div>
            <div className='qrname mb-2'>{data.firstName} {data.lastName} </div>
            <div id='pdf6' className="conForm1">  <QrCode fgColor='#193566' value={domainNow + '/checkyouorder1/' + _id} height={50} size={90} /></div>
            <div className='ticketnumber'> {data._id} </div>
            <hr style={{ width: "100%" }} />
            <div className='qrlocation'> <FaWhatsapp className='mr-2' />{data.phone}</div>
            <hr style={{ width: "100%" }} />
            <div className='qrlocation'><HiOutlineMail className='mr-2' />{data.email}</div>
            <hr style={{ width: "100%" }} className='mb-2' />

        </div>
    ));



    if (compclass === 2) {
        return (
            <div className='putItcenter' id="pdf1" >
                <div className="container workshopform">
                    <form className="thankyoumsg toplabel" >
                        <div className='thankmsg'>We will reach out to you soon</div>
                        <div className="conForm" id="pdf4" >
                            <div className="conForm2" id='pdf5'>

                                <ComponentToPrint ref={componentRef} />
                                <div>
                                    <img className="ymimage mt-2" src={ym_watermark} alt="logo" />
                                    <div style={{ fontWeight: "bold" }} className='mb-2 ymname'>theyoungminds.org</div>
                                </div>
                            </div>
                        </div>
                        <div className='shareicons'>
                            <div className='allicons' onClick={SaveMytiket}>
                                < HiOutlineDownload size="2.5rem" color='#193566' className='mr-4 sicon' />
                            </div>
                            <div className='allicons'> <a href='https://wa.me/+918910540012'><FaWhatsapp size="2.5rem" color='#193566' className='mr-4 sicon' /></a> </div>
                            <div className='allicons'>
                                <a href='https://www.instagram.com/youngminds.education/?hl=en'>
                                    <AiOutlineInstagram size="2.5rem" color='#193566' className='mr-4 sicon' />
                                </a></div>
                            <div className='allicons'>
                                <a href='https://www.facebook.com/theyoungminds.org'>
                                    <img className='sicon' width={"40px"} alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzE5MzU2NiI+PHBhdGggZD0iTTE2Mi43MTIsNzIuMjc0NGMtMS45OTUyLC01LjUwNCAtNC40NzIsLTEwLjg3MDQgLTcuNzA1NiwtMTYuMDMwNGMtMy4xOTkyLC01LjEyNTYgLTcuMjU4NCwtMTAuMDc5MiAtMTIuNDg3MiwtMTQuMjA3MmMtNS4xOTQ0LC00LjA5MzYgLTEyLjAwNTYsLTcuMTg5NiAtMTkuMjI5NiwtNy43NzQ0bC0yLjY4MzIsLTAuMTM3NmMtMC45Mjg4LDAuMDM0NCAtMS45NjA4LDAuMDM0NCAtMi45MjQsMC4xMzc2Yy0xLjk2MDgsMC4yMDY0IC0zLjgxODQsMC42NTM2IC01LjU3MjgsMS4xNjk2Yy0zLjU0MzIsMS4xMDA4IC02LjYzOTIsMi43NTIgLTkuMzU2OCw0LjU0MDhjLTQuODg0OCwzLjIzMzYgLTguNzcyLDYuOTgzMiAtMTIuMjgwOCwxMC44MzZjMC4wMzQ0LDAuMDY4OCAwLjEwMzIsMC4xMDMyIDAuMTM3NiwwLjE3MmwwLjc1NjgsMC45NjMyYzEuNzU0NCwyLjMwNDggNS41NzI4LDcuNjAyNCA4Ljk3ODQsMTMuMzEyOGM0LjIzMTIsLTQuMTI4IDkuNzM1MiwtOS4xMTYgMTIuMDA1NiwtMTAuNTYwOGMxLjcyLC0xLjA2NjQgMy40MDU2LC0xLjg5MiA0LjkxOTIsLTIuMzM5MmMwLjc5MTIsLTAuMjA2NCAxLjUxMzYsLTAuMzc4NCAyLjIwMTYsLTAuNDEyOGMwLjM0NCwtMC4wNjg4IDAuNjUzNiwtMC4wMzQ0IDEuMDMyLC0wLjA2ODhsMS4zMDcyLDAuMDY4OGMzLjM3MTIsMC4zMDk2IDYuNjczNiwxLjY4NTYgOS44MDQsNC4wOTM2YzYuMjI2NCw0Ljk1MzYgMTEuMTQ1NiwxMy4zODE2IDE0LjM0NDgsMjIuMjkxMmMzLjI2OCw4Ljk0NCA1LjEyNTYsMTguNzEzNiA1LjIyODgsMjguMTM5MmMwLDQuNTA2NCAtMC41ODQ4LDguODQwOCAtMS45NjA4LDEyLjQxODRjLTEuMzQxNiwzLjYxMiAtNC43NDcyLDQuOTg4IC04LjYsNC45ODhjLTUuNjA3MiwwIC05LjY2NjQsLTIuNDA4IC0xMi45MzQ0LC01Ljc3OTJjLTMuNTc3NiwtMy43NDk2IC02Ljk0ODgsLTcuOTQ2NCAtMTAuMTgyNCwtMTIuNDE4NGMtMi42ODMyLC0zLjc0OTYgLTUuMjk3NiwtNy42MzY4IC03Ljc3NDQsLTExLjU5MjhjLTQuMzY4OCwtNy4wODY0IC0xMC4yMTY4LC0xNi4wNjQ4IC0xNC4yNzYsLTIzLjU2NGwtOS40NiwtMTQuMjc2Yy0xLjA2NjQsLTEuMzQxNiAtMi4wOTg0LC0yLjY4MzIgLTMuMjMzNiwtNC4wMjQ4Yy0zLjgxODQsLTQuMzM0NCAtOC4wNDk2LC04LjYgLTEzLjUxOTIsLTEyLjI0NjRjLTIuNzE3NiwtMS43ODg4IC01LjgxMzYsLTMuNDQgLTkuMzU2OCwtNC41NDA4Yy0xLjc1NDQsLTAuNTE2IC0zLjYxMiwtMC45NjMyIC01LjU3MjgsLTEuMTY5NmMtMC42MTkyLC0wLjA2ODggLTEuMjM4NCwtMC4xMDMyIC0xLjg1NzYsLTAuMTAzMmMtMC4zNzg0LDAgLTAuNzIyNCwtMC4wMzQ0IC0xLjA2NjQsLTAuMDM0NGwtMi42ODMyLDAuMTM3NmMtNy4yMjQsMC41ODQ4IC0xNC4wMzUyLDMuNjgwOCAtMTkuMjI5Niw3Ljc3NDRjLTUuMjI4OCw0LjEyOCAtOS4yODgsOS4wODE2IC0xMi40ODcyLDE0LjIwNzJjLTMuMjMzNiw1LjE2IC01LjcxMDQsMTAuNTI2NCAtNy43MDU2LDE2LjAzMDRjLTMuODg3MiwxMS4wMDggLTUuOTg1NiwyMi4zOTQ0IC02LjAyLDM0LjE1OTJjMC4wMzQ0LDYuMTIzMiAwLjgyNTYsMTIuNDg3MiAzLjMwMjQsMTguODE2OGMyLjQwOCw2LjE5MiA2Ljk0ODgsMTIuNzYyNCAxNC4xNzI4LDE2LjQwODhjMy41NDMyLDEuODIzMiA3LjU2OCwyLjc4NjQgMTEuNDIwOCwyLjc4NjRjNC4yMzEyLDAuMTAzMiA4LjI1NiwtMS4xMDA4IDExLjQ1NTIsLTIuNjQ4OGM2LjQzMjgsLTMuMTk5MiAxMC44NzA0LC03LjQzMDQgMTQuODk1MiwtMTEuNjk2YzcuOTQ2NCwtOC42MzQ0IDEzLjgyODgsLTE3Ljk5MTIgMTkuMjY0LC0yNy41MmMxLjUxMzYsLTIuNjE0NCAyLjk1ODQsLTUuMjk3NiA0LjM2ODgsLTguMDE1MmMtMC43MjI0LC0xLjQxMDQgLTEuNDQ0OCwtMi44ODk2IC0yLjIwMTYsLTQuNDM3NmMtMi4xMzI4LC0zLjU0MzIgLTQuNzgxNiwtNy43NCAtNi43MDgsLTEwLjY2NGMtMi44NTUyLDUuMTYgLTUuODEzNiwxMC4xODI0IC04Ljg3NTIsMTUuMTcwNGMtNS40Njk2LDguNjY4OCAtMTEuMzUyLDE3LjA5NjggLTE3LjkyMjQsMjQuMDExMmMtMy4yNjgsMy4zNzEyIC02Ljg4LDYuMzI5NiAtMTAuMDQ0OCw3Ljc0Yy0xLjYxNjgsMC42ODggLTIuODU1MiwwLjkyODggLTMuOTIxNiwwLjg2Yy0xLjQ3OTIsMCAtMi43MTc2LC0wLjM0NCAtMy44ODcyLC0wLjk2MzJjLTIuMzA0OCwtMS4yMDQgLTQuNDcyLC0zLjc4NCAtNS44MTM2LC03LjM5NmMtMS4zNzYsLTMuNTc3NiAtMS45NjA4LC03LjkxMiAtMS45NjA4LC0xMi40MTg0YzAuMTAzMiwtOS40MjU2IDEuOTYwOCwtMTkuMTk1MiA1LjIyODgsLTI4LjEzOTJjMy4xOTkyLC04LjkwOTYgOC4xMTg0LC0xNy4zMzc2IDE0LjM0NDgsLTIyLjI5MTJjMy4xMzA0LC0yLjQwOCA2LjQzMjgsLTMuNzg0IDkuODA0LC00LjA5MzZsMS4zMDcyLC0wLjA2ODhjMC4zNzg0LDAuMDM0NCAwLjY4OCwwIDEuMDMyLDAuMDY4OGMwLjY4OCwwLjAzNDQgMS40MTA0LDAuMjA2NCAyLjIwMTYsMC40MTI4YzAuODk0NCwwLjI3NTIgMS44NTc2LDAuNjUzNiAyLjg1NTIsMS4xNjk2YzAuNjg4LDAuMzQ0IDEuMzc2LDAuNzIyNCAyLjA2NCwxLjE2OTZjMy40NCwyLjIwMTYgNi44NDU2LDUuNDM1MiAxMC4wNDQ4LDkuMDEyOGMyLjQ3NjgsMi43ODY0IDQuODUwNCw1Ljg4MjQgNy4yMjQsOS4wNDcybDkuMDgxNiwxNC4wNjk2YzIuNTgsNS4zMzIgNS4yNjMyLDEwLjYyOTYgOC4yMjE2LDE1Ljc1NTJjNS40MzUyLDkuNTI4OCAxMS4zMTc2LDE4Ljg4NTYgMTkuMjY0LDI3LjUyYzIuMzM5MiwyLjUxMTIgNC44NTA0LDQuOTg4IDcuODA4OCw3LjIyNGMyLjA5ODQsMS42NTEyIDQuNDAzMiwzLjEzMDQgNy4wODY0LDQuNDcyYzMuMTk5MiwxLjU0OCA3LjIyNCwyLjc1MiAxMS40NTUyLDIuNjQ4OGMzLjg1MjgsMCA3Ljg3NzYsLTAuOTYzMiAxMS40MjA4LC0yLjc4NjRjNy4yMjQsLTMuNjQ2NCAxMS43NjQ4LC0xMC4yMTY4IDE0LjE3MjgsLTE2LjQwODhjMi40NzY4LC02LjMyOTYgMy4yNjgsLTEyLjY5MzYgMy4zMDI0LC0xOC44MTY4Yy0wLjAzNDQsLTExLjc2NDggLTIuMTMyOCwtMjMuMTUxMiAtNi4wMiwtMzQuMTU5MnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" />
                                </a>
                            </div>
                        </div>
                    </form>
                    <br />
                    <br />
                    <br />
                </div>
                <div id='maskloder' style={{ display: "none", opacity: "75%", backgroundColor: "#12143647", position: "absolute", left: "0", right: '0', top: "0", bottom: "0" }}>
                    <br /><br /><br /><br /><br /><br /><br />
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (compclass === 1) {
        return (
            <div className='putItcenter' >
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } if (compclass === 3) {
        return (
            <div className='putItcenter' >
                <h1>Page not found 404</h1>
            </div>
        )
    }
}

export default Tiket2;