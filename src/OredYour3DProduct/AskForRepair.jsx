import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Ordersbuy.css';
import { ReactComponent as UploadSvg } from './Group18.svg';
import { ReactComponent as DeleteSvg } from './deleteIcon.svg';
import { ReactComponent as EyeSvg } from './eyeIcon.svg';
import { ReactComponent as BackSvg } from './path.svg';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import useGAEventsTracker from '../GaEvent/useGAEventsTracker';
import {repair3d,upload_files} from "../api"


const Askforrepair = () => {
    const [svgDLoad, setSvgDLoad] = React.useState(0)
    const GAEventsTracker = useGAEventsTracker("Fix Your Printer Services")
    const [files, setFiles] = React.useState([])
    const [srcImg, setSrcImg] = React.useState([])
    var history = useHistory()
    const tiggerInput = () => {
        var inputTrigger = document.getElementById("selectedfile")
        inputTrigger.click()
    }
    const preView = (index) => {
        var dnone = document.getElementById("dnone");
        dnone.style.display = "flex"

        let reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = function () {

            setSrcImg(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };


    }
    const deleted = (index) => {
        index <= 0 ? files.shift(index) : files.splice(index, index)
        var a = files;
        setFiles([])

        setTimeout(() => {
            setFiles(a)
        }, 300)
    }

    const setDataP = () => {
        setSvgDLoad(1)
        setTimeout(() => {
            setSvgDLoad(0)
        }, 3000)
    }
    const sendData = () => {



    }
    const saveImg = () => {
        if (document.getElementById("selectedfile").files.item(0) !== undefined) {
            var Img1 = document.getElementById("selectedfile").files.item(0)
            setFiles((oneArray) => [Img1, ...oneArray])
        }
    }

    const [show, setShow] = React.useState(false);
    const pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const [errorr, setErrorr] = React.useState("")
    const valitdatoin = (e) => {
        e.preventDefault();
        GAEventsTracker("Added to Cart", `productName : "Fix Your Printer"`);
        GAEventsTracker("Added to Cart", `productCategory:"YM Services"`);
        if (compclass === 1) {
            if (files[0] === undefined) {
                setErrorr("This field is required")
                document.getElementById("n").click()
            } else {
                setCompclass(2);
            }
        } else if (compclass === 2) {
            if (firstName.length >= 2 && lastName.length >= 2) {
                setCompclass(3);
            } else {
                setErrorr("Please fill all field it's required or it is too short")
                document.getElementById("n").click()
            }
        } else if (compclass === 3) {
            if (pattern.test(email)) {
                setCompclass(4);
            } else {
                setErrorr("Please email account not valid or too short  ")
                document.getElementById("n").click()
            }
        } else if (compclass === 4) {
            if (phone.length >= 10 && phone.length <= 10) {
                callph()
            } else {
                setErrorr("Please phone number not valid or too short  ")
                document.getElementById("n").click()
                console.log(phone.length >= 10 && phone.length <= 10);
            }
        }
    }


    const [compclass, setCompclass] = React.useState(1)
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")


    const HiSaveAllData = async (e) => {
        e.preventDefault()
        GAEventsTracker("Checkout Complete", `productName : "Fix Your Printer"`);
        GAEventsTracker("Checkout Complete", `productCategory:"YM Services"`);
        valitdatoin(e)
        var formData = new FormData()

    }
    const callph = async () => {
        setCompclass(compclass + 1)
        var formData = new FormData()

        var formData2 = new FormData()

        if (files[0] !== undefined) {

            for (let index = 0; index < files.length; index++) {
                formData.append("images", files[index])
                let respons = await upload_files(formData)
                formData2.append("respon", JSON.stringify(respons.data))
                formData.delete("images");
            }

        }
        var imgSasveArray = formData2.getAll("respon")
        if (imgSasveArray===[]) {
            var filesArray = null
        } else {
            var filesArray = imgSasveArray
        }
       

        var data = { firstName, lastName, email, phone, filesArray }
        console.log(data);
        let sendingData = await repair3d(data)
        if (sendingData.status === 201) {
            history.push(`/checkyouorder1/${sendingData.data._id}`)
        }
    }



    if (compclass === 1) {
        return (
            <>
                <div className='putCenter'>
                    <div className="maintaindisplay">
                        <div className='fontHeading1'><Link to='/services' ><BackSvg /></Link>Lets Repair</div>
                        <hr />
                        <br />

                        <div style={{ paddingBottom: "12px" }} className='fontHeading2'>Upload Your File
                        </div>
                        <div id="inputload" style={{ flexDirection: "column" }}>
                            <button className="uploadBlock btton">

                                <input type="file" accept='image/*' className="hdn-input" style={{ cursor: "pointer" }} onChange={(e) => { saveImg(e) }} name="" id="selectedfile" />

                                <div className="dashBorder">
                                    <UploadSvg />
                                </div>

                            </button>

                            <div className="d-in clor my-4" style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "10px", cursor: "pointer" }}>

                                <div style={{ cursor: "pointer" }} onClick={tiggerInput} className="circle">
                                    <div style={{ cursor: "pointer" }} className="plusSymbol"></div>
                                </div>

                                <div className="mx-2">
                                    Add more Files
                                </div>

                            </div>
                        </div>

                        <div id="inputLoading" style={{ height: "200px", justifyContent: "center" }}>
                            <div className="d-flex align-items-center" style={{ width: "200px" }}>
                                <strong>Loading...</strong>
                                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div className="fileListBox">

                            {files.map((any, index) => <div key={index} className="pointText"> <div style={{ maxWidth: "193px", overflow: "auto" }} > {any.name}  </div>  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}>  <div onClick={() => { preView(index) }}> <EyeSvg width="18px" height="20px" /> </div> <hr className='routetion' style={{ width: "20px" }} /> <DeleteSvg width="15px" onClick={(e) => { deleted(index) }} height="20px" />   </div>

                            </div>)}



                        </div>
                        <br />
                        <br />
                        <div className="d-in any clor">
                            <button onClick={(e) => { valitdatoin(e) }} className="submitAll">
                                Done
                            </button>
                        </div>
                    </div>

                    <div id="dnone">
                        <div style={{ borderRadius: "23px" }} >
                            <div className='show3D' style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                                <img src={srcImg} style={{ maxHeight: "80%" }} />
                                <button className='btn btn-danger' onClick={() => { document.getElementById("dnone").style.display = "none" }} > close it </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Button id='n' variant="primary" onClick={() => { setShow(true) }}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={() => { setShow(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title> warning !! </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorr} </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </>
        )
    } else if (compclass === 2) {
        return (
            <>
                <div className='putCenter' >

                    <div className="maintaindisplay">
                        <div className='fontHeading1'><BackSvg onClick={() => { setCompclass(1) }} />Firstly</div>
                        <hr />
                        <br />
                        <br />
                        <br />
                        <form >

                            <div className="form-group toplabel">
                                <div className="progressdiv"></div>
                                <div className='leftdiv'><label htmlFor="exampleInputName1">What is Your First Name?</label></div>
                                <input name="firstname" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" className="form-control inpPM1" id="exampleInputName1" placeholder="Enter First Name" style={{ marginBottom: "0px" }} />
                                <p className='error'></p>
                                <div className='leftdiv'><label className="mt-4" htmlFor="exampleInputName2">And Your Last Name?</label></div>
                                <input name="lastname" value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" className="form-control inpPM1" id="exampleInputName2" placeholder="Enter Last Name" style={{ marginBottom: "0px" }} />
                                <p className='error'></p>
                                <br />
                                <br />
                                <br />
                                <button className='btn buttoon' onClick={HiSaveAllData}  >Done</button>
                            </div>
                        </form>

                    </div>

                </div>
                <Button id='n' variant="primary" onClick={() => { setShow(true) }}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={() => { setShow(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title> warning !! </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorr} </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </>
        )
    } else if (compclass === 3) {
        return (<>
            <div className='putCenter' >

                <div className="maintaindisplay">
                    <div className='fontHeading1'><BackSvg onClick={() => { setCompclass(2) }} />Hi,<span className='namestyle'>{firstName}</span></div>
                    <hr />
                    <br />
                    <form className="formdata">


                        <div className="form-group">
                            <div className='leftdiv'><label className="toplabel" htmlFor="exampleInputEmail1">Can we grab your Email Address?</label></div>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" type="email" className="form-control inpPM1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" style={{ marginBottom: "0px" }} />
                            <p className='error'></p>
                            <br />
                            <br />
                            <br />
                            <button className='btn buttoon' onClick={HiSaveAllData}  >Done</button>
                        </div>
                    </form>

                </div>
            </div>
            <Button id='n' variant="primary" onClick={() => { setShow(true) }}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title> warning !! </Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorr} </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
        )
    } else if (compclass === 4) {
        return (
            <>
                <div className='putCenter' >

                    <div className="maintaindisplay">
                        <div className='fontHeading1'><BackSvg onClick={() => { setCompclass(3) }} />Great!</div>
                        <hr />
                        <br />
                        <form className="formdata">

                            <div className="form-group">
                                <div className='leftdiv'><label className="toplabel" htmlFor="exampleInputPhone1"><p className='phonetext'>What is your phone Number?</p><p className='phonetext'>So we can keep in touch.</p></label></div>
                                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} maxLength={10} name="phone" type="tell" className="form-control inpPM1" id="exampleInputPhone1" placeholder="Enter Phone Number" style={{ marginBottom: "0px" }} />
                                <p className='error'></p>
                                <br />
                                <br />
                                <br />
                                <button className='btn buttoon' onClick={HiSaveAllData}  >Done</button>
                            </div>
                        </form>

                    </div>
                </div>
                <Button id='n' variant="primary" onClick={() => { setShow(true) }}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={() => { setShow(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title> warning !! </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorr} </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </>
        )
    } else if (compclass === 5) {
        return (
            <div className='putItcenter' >
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div>Your Patience is appreciated! Please Wait while we upload your files.</div>
            </div>
        )
    }
}

export default Askforrepair;
