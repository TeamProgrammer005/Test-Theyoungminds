import React, { useState, useRef } from 'react'
import "./registration.css";
import ym_watermark from "../image/ymwatermark.png";
import QrCode from 'react-qr-code'
import { BsCalendarCheck } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa"
import { HiOutlineDownload } from "react-icons/hi"
import { AiOutlineInstagram } from "react-icons/ai";
import { GoLocation } from "react-icons/go"
import { ReactComponent as ReactOut } from '../image/out.svg';
import { postData, sendEmail, getProductsByType } from '../api';
import { useHistory } from 'react-router-dom';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';


const initialFormData = Object.freeze({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    workplace: "",
    locationId: "",
    worktype: "",
    _id: "",
    producttype: "",
    productdate: ""
});

const WorkshopRegistration = () => {
    const componentRef = useRef();
    const WebLink = window.location.origin
    const navigate = useHistory()
    var [compclass, setcompclass] = useState(1)
    const [formData, updateFormData] = useState(initialFormData);
    const [firstnameerror, setfirstnameerror] = useState("");
    const [lastnameerror, setlastnameerror] = useState("");
    const [workshoptyperror, setworktypeerror] = useState("");
    const [workplaceerror, setworkplaceerror] = useState("");
    const [emailerror, setemailerror] = useState("");
    const [phoneerror, setphoneerror] = useState("");

    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");
    const [dname, setdname] = useState("");
    const [date, setDate] = useState("");
    const [WorkShopProducts, setWorkShopProducts] = useState([]);
    const [productsLocation, setProductsLocation] = useState([]);

    function changecompclass(e) {
        var pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (compclass === 2 && formData.firstname === "") {
            setfirstnameerror("*First Name is required")
        } else if (compclass === 2 && formData.firstname !== "" && formData.lastname === "") {
            setlastnameerror("*Last Name is required")
            setfirstnameerror("")
        } else if (compclass === 1 && formData.worktype === "") {
            setworktypeerror("*Please Select Workshop")
        } else if (compclass === 1 && formData.workplace === "" && formData.worktype !== "") {
            setworkplaceerror("*Please Select Workshop Venue")
            setworktypeerror("")
        } else if (compclass === 3 && formData.email === "") {
            setemailerror("*Email is required")
        } else if (compclass === 3 && !(pattern.test(formData.email))) {
            setemailerror("*Email is not Correct")
        } else if (compclass === 4 && formData.phone === "") {
            setphoneerror("*Mobile Number is required")
        } else if (compclass === 4 && (formData.phone.length < 10 || formData.phone.length > 10)) {
            setphoneerror("*Mobile Number is not correct")

        } else if (compclass === 4) {
            saveAll()
            setcompclass(compclass + 1)
        } else if (compclass === 2) {
            setdname(formData.firstname)
            setcompclass(compclass + 1);
        }
        else {
            setcompclass(compclass + 1)
        }
        e.preventDefault();
        console.log(formData)

    }
    const handleChange = async (e) => {
        e.preventDefault();
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.name === "worktype") {
            if (e.target.value !== "") {
                setworktypeerror("")
            }
        }
        if (e.target.name === "workplace") {
            if (e.target.value !== "") {
                setworkplaceerror("")
            }
        }
        if (formData.workplace !== "") {
            setworkplaceerror("")
        }
        if (formData.firstname !== "") {
            setfirstnameerror("")
        }
        if (formData.lastname !== "") {
            setlastnameerror("")
        }
        if (formData.email !== "") {
            setemailerror("")
        }
        if (formData.phone !== "") {
            setphoneerror("")
        }
    };

    const handleLocationChange = async (e) => {




        var location = productsLocation.filter(any => any.id == e.target.value);

        var locationName = "";
        var productDate = "";

        if (location.length > 0) {
            locationName = location[0].name;
            productDate = location[0].startDateTime.split('T')[0]
        }

        updateFormData({
            ...formData,
            ["locationId"]: e.target.value,
            ["workplace"]: locationName,
            ["productdate"]: productDate
        });

        if (e.target.name === "worktype") {
            if (e.target.value !== "") {
                setworktypeerror("")
            }
        }
        if (e.target.name === "workplace") {
            if (e.target.value !== "") {
                setworkplaceerror("")
            }
        }
        if (formData.workplace !== "") {
            setworkplaceerror("")
        }
        if (formData.firstname !== "") {
            setfirstnameerror("")
        }
        if (formData.lastname !== "") {
            setlastnameerror("")
        }
        if (formData.email !== "") {
            setemailerror("")
        }
        if (formData.phone !== "") {
            setphoneerror("")
        }

    };

    const handleProductChange = async (e) => {

        e.preventDefault();

        var product = WorkShopProducts.filter(any => any._id == e.target.value);

        var productName = "";
        setProductsLocation([]);
        document.getElementById("exampleFormControlSelect1").selectedIndex = 0;
        if (product.length > 0) {
            productName = product[0].name;
            console.log(product[0].name);
            setProductsLocation(product[0].locations);
        }
        console.log(productName);

        updateFormData({
            ...formData,
            ["_id"]: e.target.value,
            ["worktype"]: productName,
            ["workplace"]: ""
        });
        if (e.target.name === "worktype") {
            if (e.target.value !== "") {
                setworktypeerror("")
            }
        } if (formData.firstname !== "") {
            setfirstnameerror("")
        }
        if (formData.lastname !== "") {
            setlastnameerror("")
        }
        if (formData.email !== "") {
            setemailerror("")
        }
        if (formData.phone !== "") {
            setphoneerror("")
        }

    };



    // function generatePDF(){
    //     const input = document.getElementById('pdf1');
    //     html2canvas(input, 
    //         {height: window.outerHeight + window.innerHeight,
    //             windowHeight: window.outerHeight + window.innerHeight,
    //             scrollY: -window.scrollY})
    //   .then((canvas) => {
    //     let imgWidth = 200;
    //     let imgHeight = canvas.height * imgWidth / canvas.width;
    //     const imgData = canvas.toDataURL('img/png');
    //     const pdf = new jsPDF('p', 'mm', 'a4');
    //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("download.pdf");
    //   })
    // ;
    //    /* var doc = new jsPDF("p","pt","a4")
    //     doc.html(document.querySelector("#pdf6"),
    //     {
    //         callback:function(pdf){
    //             pdf.save("workshop_success.pdf")
    //         }
    //     })*/
    // }
    const saveAll = async () => {
        let data = formData
        const res1 = await postData(data);
        setData2(res1.data)
        setData3(`${WebLink}/reg/${res1.data}`)
        if (res1.data !== 'error') {
            setcompclass(6)
            console.log(res1)
            setData2(res1.data)
            const sEmail = {
                content: ` <style>.cent{display: flex;
                min-width: 313px;
                flex-direction: column;
                align-items: center;}</style>   <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
            ">
                    <div  style="
                box-shadow: rgb(0 0 0 / 28%) 0.39rem 0.3rem 0.2rem 0px, rgb(255 255 255) -0.3rem -0.3rem 1rem 5px;
                margin: 10%;
                padding-bottom: 20%;
                border-radius: 20px;
                max-width: 350px !important;
                justify-content: center;
                align-items: center;
                display: flex;
                flex-direction: column;
            ">
                        <div  class="cent">
                            <h4 style="
            color: #193566;
            ">Scan for see WorkShop registration page</h4>
                            <img src="https://chart.googleapis.com/chart?cht=qr&chl=${WebLink}/reg/${res1.data}&chs=160x160&chld=L|0"
                                class="qr-code img-thumbnail img-responsive" />
                        </div>
                    </div>
                </div>`,
                subject: `Thank you for registration`,
                to: `${formData.email}`

            }

            const res2 = await sendEmail(sEmail)
            console.log(res2);
        } else {
            console.log('error');
        }

    }

    React.useEffect(() => {
        any()
        getWorkShopProducts()

    }, [])

    const getWorkShopProducts = async () => {
        const  productType= 'workshop'
        let res = await getProductsByType(productType)
        setWorkShopProducts(res.data)

    }

    const any = () => {
        if (compclass === 1) {
            updateFormData({
                ...formData,
                _id: `61d597eb3b0af6c254acd386`,
                producttype: `workshope`,
                productdate: date
            })
        }
    }

    const ComponentToPrint = React.forwardRef((props, ref) => (
        <div ref={ref}>

        
               
                    <div className='makeroundShadow mx-4 my-2'><ReactOut /></div>
                    <div className='qrname mb-2'>{formData.firstname} {formData.lastname}</div>
                    <div id='pdf6' className="conForm1">  <QrCode fgColor='#193566' value={data3} height={50} size={90} /></div>
                    <div className='ticketnumber'>{data2}</div>
                    <hr style={{ width: "100%" }} />
                    <div className='qrlocation'><GoLocation className='mr-2' />{formData.workplace}</div>
                    <hr style={{ width: "100%" }} />
                    <div className='qrlocation'><BsCalendarCheck className='mr-2' />{formData.productdate}</div>
                    <hr style={{ width: "100%" }} className='mb-2' />
                   
        </div>
    ));


    if (compclass === 2) {
        return (
            <div className='putItcenter' >
                <div className="workshopform">
                    <form className="formdata">
                        <p className='headstyle'>Firstly</p>
                        <div className='progressbar'>
                            <div className='progressbar1'></div>
                            <div className='progressbar4 ml-1'></div>
                            <div className='progressbar2 ml-1'></div>
                            <div className='progressbar2 ml-1'></div>
                            <div className='progressbar3 ml-1'></div>
                        </div>
                        <div className="form-group toplabel">
                            <div className="progressdiv"></div>
                            <div className='leftdiv'><label htmlFor="exampleInputName1">What is Your First Name?</label></div>
                            <input name="firstname" autoComplete='off' value={formData.firstname} onChange={handleChange} type="text" className="form-control inpPM1" id="exampleInputName1" placeholder="Enter First Name" style={{ marginBottom: "0px" }} />
                            <p className='error'>{firstnameerror}</p>
                            <div className='leftdiv'><label className="mt-4" htmlFor="exampleInputName2">And Your Last Name?</label></div>
                            <input name="lastname" autoComplete='off' value={formData.lastname} onChange={handleChange} type="text" className="form-control inpPM1" id="exampleInputName2" placeholder="Enter Last Name" style={{ marginBottom: "0px" }} />
                            <p className='error'>{lastnameerror}</p>
                            <div className="outertick">
                                <button className='btn buttoon' onClick={changecompclass}  >Done</button>
                            </div>
                        </div>
                    </form>
                    <div className="rheader1">
                        <div className="rheader">
                            <img className="ymimage" src={ym_watermark} alt="logo" />
                            <div style={{ fontWeight: "bold" }}>theyoungminds.org</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (compclass === 3) {
        return (
            <div className='putItcenter' >
                <div className="workshopform">

                    <form className="formdata">
                        <p className='headstyle'>Hi,<span className='namestyle'>{dname}</span></p>
                        <div className='progressbar'>
                            <div className='progressbar1'></div>
                            <div className='progressbar4 ml-1'></div>
                            <div className='progressbar4 ml-1'></div>
                            <div className='progressbar2 ml-1'></div>
                            <div className='progressbar3 ml-1'></div>
                        </div>
                        <div className="form-group">
                            <div className='leftdiv'><label className="toplabel" htmlFor="exampleInputEmail1">Can we grab your Email adress?</label></div>
                            <input value={formData.email} autoComplete='off' name="email" onChange={handleChange} type="email" className="form-control inpPM1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" style={{ marginBottom: "0px" }} />
                            <p className='error'>{emailerror}</p>
                            <div className="outertick">
                                <button className='btn buttoon' onClick={changecompclass}  >Done</button>
                            </div>
                        </div>
                    </form>
                    <div className="rheader1">
                        <div className="rheader">

                            <img className="ymimage" src={ym_watermark} alt="logo" />
                            <div style={{ fontWeight: "bold" }}>theyoungminds.org</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (compclass === 4) {
        return (
            <div className='putItcenter' >
                <div className="workshopform">

                    <form className="formdata">
                        <p className='headstyle'>Great!</p>
                        <div className='progressbar'>
                            <div className='progressbar1'></div>
                            <div className='progressbar4 ml-1'></div>
                            <div className='progressbar4 ml-1'></div>
                            <div className='progressbar4 ml-1'></div>
                            <div className='progressbar3 ml-1'></div>
                        </div>
                        <div className="form-group">
                            <div className='leftdiv'><label className="toplabel" htmlFor="exampleInputPhone1"><p className='phonetext'>What is your phone Number?</p><p className='phonetext'>So we can keep in touch.</p></label></div>
                            <input autoComplete='off' value={formData.phone} name="phone" onChange={handleChange} type="tell" className="form-control inpPM1" id="exampleInputPhone1" placeholder="Enter Phone Number" style={{ marginBottom: "0px" }} />
                            <p className='error'>{phoneerror}</p>
                            <div className="outertick" >
                                <button className='btn buttoon' onClick={changecompclass}  >Done</button>
                            </div>
                        </div>
                    </form>
                    <div className="rheader1">
                        <div className="rheader">

                            <img className="ymimage" src={ym_watermark} alt="logo" />
                            <div style={{ fontWeight: "bold" }}>theyoungminds.org</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (compclass === 1) {
        return (

            <div className="container workshopform">
                <div className='putItcenter' >
                    <p className='headstyle'>Let's Go !</p>
                    <div className='progressbar'>
                        <div className='progressbar1'></div>
                        <div className='progressbar2 ml-1'></div>
                        <div className='progressbar2 ml-1'></div>
                        <div className='progressbar2 ml-1'></div>
                        <div className='progressbar3 ml-1'></div>
                    </div>
                    <form className="formdata">
                        <div className="form-group">
                            <div className='leftdiv'><label className="toplabel mb-3" htmlFor="exampleFormControlSelect2">Choose Your Interest</label></div>
                            <select name="worktype" onChange={handleProductChange} className="form-control inpPM2" id="exampleFormControlSelect2">
                                <option className='optioninput' selected disabled>Select Workshop</option>
                                {WorkShopProducts.map((product) => <option className='optioninput' value={product._id}>{product.name}</option>)}
                            </select>
                            <p className='error'>{workshoptyperror}</p>
                        </div>
                    </form>
                    <form className="formdata">
                        <div className="form-group">
                            <div className='leftdiv'><label className="toplabel mb-3" htmlFor="exampleFormControlSelect1">Preferred Venue?</label></div>
                            <select name="workplace" onChange={handleLocationChange} className="form-control inpPM2" id="exampleFormControlSelect1">
                                <option className='optioninput' selected >Select Location</option>

                                {productsLocation.map((product) => <option className='optioninput' value={product.id}>{product.name}</option>)}
                            </select>
                            <p className='error'>{workplaceerror}</p>
                            <div className="outertick">
                                <button className='btn buttoon' onClick={changecompclass}  >Done</button>
                            </div>
                        </div>
                    </form>
                    <div className="rheader1">
                        <div className="rheader">

                            <img className="ymimage" src={ym_watermark} alt="logo" />
                            <div style={{ fontWeight: "bold" }}>theyoungminds.org</div>

                        </div>
                    </div>
                </div>
            </div>

        )

    } else if (compclass === 6) {

        return (
            <React.Fragment>
                <div className='putItcenter' id="pdf1" >
                    <div className="container workshopform">
                        <form className="thankyoumsg toplabel" >
                        <div className='thankmsg'>Thank You for joining us.</div>
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
                                <div className='allicons' onClick={() => exportComponentAsPNG(componentRef)}>  
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
                    </div>
                </div>
            </React.Fragment >
        );

    } else if (compclass === 5) {
        return (
            <div className='putItcenter' >
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else if (compclass === 7) {
        return (
            <div className='putItcenter' >
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}

export default WorkshopRegistration