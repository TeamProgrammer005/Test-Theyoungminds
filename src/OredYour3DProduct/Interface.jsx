import { ReactComponent as MallSvg } from './local_mall.svg';
import { ReactComponent as ImgSvg } from './imgIcon.svg';
import { ReactComponent as AddSvg } from './add_black.svg';
import { ReactComponent as RemoveSvg } from './remove_black.svg';
import { ReactComponent as SellSvg } from './sell_black.svg';
import { ReactComponent as SSvg } from './stion.svg';
import { ReactComponent as UploadSvg } from './Group18.svg'
import { ReactComponent as DeleteSvg } from './deleteIcon.svg'
import { ReactComponent as EyeSvg } from './eyeIcon.svg'
import { ReactComponent as Custom } from './bxs-edit1.svg';
import React, { useState } from 'react';
import './Ordersbuy.css';
import { ReactComponent as BackSvg } from './path.svg';
import { ReactComponent as DropDownsvg } from './pathT.svg';
import { postDataFor3D, sendEmail,payment,onSuccessfullPayment,comfermationOfPayment,getSuggention,getMetarialType,getColorType,uploads_file } from '../api';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import useGAEventsTracker from '../GaEvent/useGAEventsTracker';
import suggestionArray from './json/suggestoin.json'




const Interface = () => {


    var totalPrice;



    const indianStateArray = [
        { stateobj: "Andhra Pradesh" },
        { stateobj: "Arunachal Pradesh" },
        { stateobj: "Assam" },
        { stateobj: "Bihar" },
        { stateobj: "Chhattisgarh" },
        { stateobj: "Goa" },
        { stateobj: "Gujarat" },
        { stateobj: "Haryana" },
        { stateobj: "Himachal Pradesh" },
        { stateobj: "Jammu and Kashmir" },
        { stateobj: "Jharkhand" },
        { stateobj: "Karnataka" },
        { stateobj: "Kerala" },
        { stateobj: "Madhya Pradesh" },
        { stateobj: "Maharashtra" },
        { stateobj: "Manipur" },
        { stateobj: "Meghalaya" },
        { stateobj: "Mizoram" },
        { stateobj: "Nagaland" },
        { stateobj: "Odisha" },
        { stateobj: "Punjab" },
        { stateobj: "Rajasthan" },
        { stateobj: "Sikkim" },
        { stateobj: "Tamil Nadu" },
        { stateobj: "Telangana" },
        { stateobj: "Tripura" },
        { stateobj: "Uttarakhand" },
        { stateobj: "Uttar Pradesh" },
        { stateobj: "West Bengal" },
        { stateobj: "Andaman and Nicobar Islands" },
        { stateobj: "Chandigarh" },
        { stateobj: "Dadra and Nagar Haveli" },
        { stateobj: "Daman and Diu" },
        { stateobj: "Delhi" },
        { stateobj: "Lakshadweep" },
        { stateobj: "Puducherry" }]

    const [total, setTotal] = React.useState(0)
    const [count, setCount] = React.useState(1)
    const [idProductType, setIdProductType] = useState(null)
    const [clientName, setclientName] = React.useState('')
    const [clientPhone, setclientPhone] = React.useState('')
    const [clientEmail, setclientEmail] = React.useState('')
    const [fisrtVol, setFisrtVol] = React.useState(0)



    const GAEventsTracker = useGAEventsTracker("Additive Manufacturing Service")




    var history = useHistory()
    //     function loadScript(src) {
    //         return new Promise((resolve) => {
    //             const script = document.createElement("script");
    //             script.src = src;
    //             script.onload = () => {
    //                 resolve(true);
    //             };
    //             script.onerror = () => {
    //                 resolve(false);
    //             };
    //             document.body.appendChild(script);
    //         });
    // }







    async function displayRazorpay() {
        // const res = await loadScript(
        //     "https://checkout.razorpay.com/v1/checkout.js"
        // );

        // if (!res) {
        //     alert("Razorpay SDK failed to load. Are you online?");
        //     return;
        // }
      var  clientId= ""
        const payData= { total, count }
        const result = await payment(payData)
        // console.log(clientId);
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data.response;
        var re = result.data
        const options = {
            key:"rzp_live_EcSQph6XpFpWSY",
            amount: amount.toString(),
            currency: currency,
            name: "Additive Manufacturing",
            description: "Additive Manufacturing Service",
            order_id: order_id,
            handler: function (response) {
                // console.log(response);
                const dataSendOnSuccess= { clientId:clientId.ID, response, re }
                let respon = onSuccessfullPayment(dataSendOnSuccess)
                GAEventsTracker("Checkout Complete", `productName : "Additive Manufacturing"`);
                GAEventsTracker("Checkout Complete", `productPrice:${count * total}`)
                GAEventsTracker("Checkout Complete", `productQuantity:${count}`)
                GAEventsTracker("Checkout Complete", `productCategory:"YM Services"`)
                sendToTicket({ id: response.razorpay_payment_id, clientId:clientId.ID, link:clientId.link })

            },

            theme: {
                color: "#193566",
            },
            prefill: {
                name: clientName,
                contact: clientPhone,
                email: clientEmail
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        document.getElementById("goBackHide").style.display = "block";
    }

    const sendToTicket = async (id) => {
        console.log(id.id);
        let ifRight = await comfermationOfPayment({id:id.id})
        console.log(ifRight.data)
        if (ifRight !== undefined || ifRight !== null) {
            if (ifRight.data.id === id.id && ifRight.data.status === "captured" && ifRight.data.entity === "payment") {
                history.push(`/checkyouorder/${id.clientId}`)
                await sendEmail({
                    to: "connect.youngminds@gmail.com",
                    subject: "successfull order details",
                    content: `The client name : ${clientName}, 
                    The client phone : ${clientPhone}, 
                    The client Email : ${clientEmail}, 
                    client db id : ${id.clientId},
                    client Link : ${window.location.host}/checkyouorder/${id.clientId},
                    client files Link : ${id.link},
                    Details are ==>
                    layerHight: ${outputMm1}, 
                    inFill: ${mmInput2},
                    supportRemove: ${supRemov},
                    voporPolish: ${voporPolish},
                    deliveryOrPickup: ${free}, 
                    address1: ${hNo},
                    address2: ${area},
                    Lankmark: ${Lankmark},
                    Town: ${Town},
                    pincode: ${pincode}, 
                    state: ${state},
                    count: ${count},
                    rushPaint: ${rushPaint},
                    colorTypeId: ${colorTypeId},
                    handelingFees: ${handeling},
                    printingFees: ${printing}, 
                    materialFees: ${material},
                    additionalFees: ${additional},
                    deliveryFees: ${deliver},
                    tax: ${gst},
                    netTotal: ${count * total}`
                })
            } else {

            }
        }
    }


    var vstl = document.getElementById("vs_iframe");

    var x_axis = 0, y_axis = 0, z_axis = 0, area1 = 0, lastSelectedFile = File;
    var box_vol = 0, shape_vol = 0;
    var unit_1, unit_2, mult_1, mult_2, fixed = 0;
    var input_size = true;
    let letGetAddress, letGetPlace, colorChosse;

    var shade = '#DDDDDD';
    var element = 0;

    function commas_convert(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [rushPaint, setRushPaint] = React.useState('')
    const [pickSuggetion, setPickSuggetion] = React.useState(-1)
    const [Slider, setSlider] = React.useState(0)
    const [svgDLoad, setSvgDLoad] = React.useState(0)
    const [files, setFiles] = React.useState([])
    var [suggestion, setSuggestion] = React.useState([])
    const [totalVolume, setTotalVolume] = React.useState(0)
    const [colors, setColors] = React.useState([])
    const [materialType, setMaterialType] = React.useState([])

    var imgArry = [];



    var saveImg = async (e) => {
        if (e.target.files[0] != undefined) {
            var selectedFile = e.target.files[0];
            // console.log(selectedFile);
            vstl.contentWindow.postMessage({ msg_type: 'load', file: selectedFile }, '*');
            setDataP()
        }


        // console.log(formData);

    }




    const [imgCount, setImgCount] = React.useState(0)
    const [handeling, setHandeling] = React.useState(1000)
    const [printing, setPrinting] = React.useState(0)
    const [material, setMaterial] = React.useState(0)
    const [additional, setAdditional] = React.useState(0)
    const [deliver, setDeliver] = React.useState(0)
    const [gst, setgst] = React.useState(0)
    const [finishing, setFinishing] = React.useState(0)
    var saveObj = []


    const needData = async () => {
        let suggestionA = await getSuggention();
        let colorArray = await getColorType();
        let materialArray = await getMetarialType();
        setColors(colorArray.data);
        setMaterialType(materialArray.data);
        setSuggestion(suggestionA.data);
        // console.log(JSON.stringify(suggestionA.data));
    }
    React.useEffect(() => {
        setSuggestion(suggestionArray);
        needData()
    }, []);
 

    React.useEffect(() => {
        letGetAddress = document.getElementById("letGetAddress")
        letGetPlace = document.getElementById("letGetPlace")
        vstl = document.getElementById("vs_iframe");
        // alert(vstl)
        if (vstl != null && vstl != undefined) {
            vstl.onload = function () {

                vstl.contentWindow.postMessage({ msg_type: "get_info" }, "*");
                window.onmessage = function (e) {

                    if (e.origin == "https://www.viewstl.com" && e.data.msg_type) {
                        if (e.data.msg_type == "info") {

                            vstl.contentWindow.postMessage({ msg_type: 'set_bgcolor', value: '#DEE3ED' }, '*');
                            vstl.contentWindow.postMessage({ msg_type: 'set_color', value: shade }, '*');

                            input_size = false; x_axis = e.data.x; y_axis = e.data.y; z_axis = e.data.z; area1 = e.data.area;
                            shape_vol = e.data.volume / 1000;
                            var volume = null
                            if (shape_vol != 0) {
                                if (shape_vol * Math.pow(1, 3) < 1000000) {

                                    volume = commas_convert((shape_vol * Math.pow(1, 3) * 1).toFixed(0 + fixed));

                                } else {
                                    alert("too big flie")
                                    //svol.innerHTML = "Too big!";
                                }
                            }
                            // var objfile = allSelectedFiles[allSelectedFiles.length-1];
                            // console.log(allSelectedFiles);
                            // console.log(objfile);
                            var selectedlastfileele = document.getElementById('selectedfile');
                            var selectedlastfile = selectedlastfileele.files.item(0);
                            imgArry.push({
                                volume: volume, name: selectedlastfile.name, x_axis, y_axis, z_axis,
                                file: selectedlastfile
                            });

                            setFiles([])

                            setFiles(imgArry)
                            callForVol(volume)
                            //var link = document.getElementById('my_link');

                            //link.click();
                            //console.log(link);

                        }
                    }
                }
            }

        }






        if (voporPolish === "voporPolish") {
            if (supRemov === "supportRemove") {
                setFinishing(500)
            } else {
                setFinishing(250)
            }
        };

        if (Slider === 4) {
            setTotal(Math.round(handeling + material + additional + deliver + printing + finishing + parseInt(gst)))

        }


        if (Slider === 4) {

            var allMath = handeling + material + additional + deliver + printing + finishing;
            var centerV = (((allMath) / 100) * 18).toFixed(2);
            setgst(centerV)



        }

        if (Slider === 0) {


            if (svgDLoad === 1) {
                document.getElementById("inputload").style.display = "none";
                document.getElementById("inputLoading").style.display = "flex";
            } else {
                setTimeout(() => {
                    if (document.getElementById("inputload") !== null) {
                        document.getElementById("inputload").style.display = "flex";
                        document.getElementById("inputLoading").style.display = "none";
                    }

                }, 2000)
            }
        }




        if (Slider === 1) {
            if (idProductType !== null) {
                const noS = parseInt(idProductType.split(",")[1]);
                if (noS !== -1) {
                    document.getElementsByName("checkBox1")[noS].checked = true;
                }
            }
        }


        if (Slider === 3) {
            if (pCount === null) {
                document.getElementsByName("pickup")[0].click()
            }
            //    console.log( document.getElementsByName("pickup"));
        }
        if (free === "pickup") {
            setPCount(0)
        } else if (free === "delivery") {
            setPCount(1)
        }

        if (document.getElementsByName('pickup')[pCount] !== undefined) {
            if (pCount !== null) {
                document.getElementsByName('pickup')[pCount].checked = true;
            }
        };
        if (Slider === 4 && rushPaint === "rushPaint") {
            document.getElementsByName("checkBox")[0].checked = true;
        }

        if (Slider === 0 && pickSuggetion >= 0) {
            document.getElementsByClassName('suggestionTab')[pickSuggetion].style.borderLeft = "5px solid #193566"
        }

    });

    React.useEffect(() => {

        if (rushPaint !== "") {
            setAdditional(additional + 500)
        }
        if (rushPaint === "") {
            setAdditional(additional - 500)
        }

    }, [rushPaint]);

    const [colorType, setColorType] = useState('')

    const saveValue = (e) => {
        setIdProductType(e.target.value)
    }


    const [mmInput, setMmInput] = React.useState('20')
    const [mmInput2, setMmInput2] = React.useState('20')
    const [supRemov, setSupRemov] = React.useState()
    const [voporPolish, setVoporPolish] = React.useState()
    const outputMm = 0.075 + mmInput * 0.00325
    const outputMm1 = outputMm.toPrecision(2)

    const [free, setFree] = React.useState(1)
    const [cousto, setCousto] = React.useState(null)
    const [hNo, setHNo] = React.useState('')
    const [area, setArea] = React.useState('')
    const [colorTypeId, setcolorTypeId] = React.useState('')
    const [Lankmark, setLankmark] = React.useState('')
    const [Town, setTown] = React.useState('')
    const [pincode, setPincode] = React.useState('')
    const [state, setState] = React.useState('')
    const [warning, setWarning] = React.useState('')
    const [pCount, setPCount] = React.useState(null)
    const [fls, setFls] = React.useState(false)
    const [arrray, setArrray] = React.useState([])


    const setInputrange = () => {
        setMmInput2('20')
        setMmInput('20')
    }
    const setInputrange2 = () => {
        setMmInput2('55')
        setMmInput('55')
    }
    const setInputrange3 = () => {
        setMmInput2('100')
        setMmInput('100')
    }

    const callForVol = (a) => {
        if (imgCount === 0) {
            setTotalVolume(a)
            setImgCount(imgCount + 1)
        }
    }

    const sendData = async () => {
        totalPrice = total * count;
        await ("Added to CarGAEventsTrackert", `productName : "Additive Manufacturing"`);
        await GAEventsTracker("Added to Cart", `productPrice:${totalPrice}`);
        await GAEventsTracker("Added to Cart", `productQuantity:${count}`);
        await GAEventsTracker("Added to Cart", `productCategory:"YM Services"`);
        if (Slider === 0) {
            if (files[0] === undefined) {
                setWarning("add a file or skip")
                document.getElementById("n").click();
            } else if (document.getElementById('inputLoading').style.display !== 'none') {
                setWarning("please wait")
                document.getElementById("n").click();
            }
            else {
                // console.log(svgDLoad);
                if (cousto === null) {
                    setWarning("click on any option")
                    document.getElementById("n").click();
                } else {
                    setSlider(Slider + 1);
                    setTimeout(() => {
                        document.getElementsByName("checkBox1")[1].click()
                        document.getElementById("defultColor").click()
                    }, 300);
                }
            }


        } else if (Slider === 1) {
            if (idProductType === "" || colorType === "") {
                setWarning("chosse any fild")
                document.getElementById("n").click();
            } else {
                if (cousto === 1) {
                    setSlider(Slider + 1);
                } else {
                    setSlider(Slider + 2);
                }

            }
        } else if (Slider === 2) {
            setSlider(Slider + 1);
        } else if (Slider === 3) {


            if (supRemov === "supportRemove") {
                setFinishing(250)
            };
            if (voporPolish === "voporPolish") {
                if (supRemov === "supportRemove") {
                    setFinishing(500)
                } else {
                    setFinishing(250)
                }
            };


            if (free === "delivery") {
                if (state === "" || pincode === "" || area === "" || Town === "" || clientName === "" || clientPhone === "" || clientEmail === "") {
                    setWarning("Please fill all field")
                    document.getElementById("n").click()
                }
                else {
                    let pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                    if (clientPhone.length === 10) {

                        if (pattern.test(clientEmail)) {
                            setSlider(Slider + 1)
                        } else {
                            setWarning("Please check your email")
                            document.getElementById("n").click()
                        }

                    } else {
                        setWarning("Please check your phone number ")
                        document.getElementById("n").click()
                    }
                }
            } else if (free === "pickup") {
                if (clientName === "" || clientPhone === "" || clientEmail === "") {
                    setWarning("Please fill all fild")
                    document.getElementById("n").click()
                } else {
                    let pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                    if (clientPhone.length === 10) {
                        if (clientEmail !== "") {
                            if (pattern.test(clientEmail)) {
                                setSlider(Slider + 1)
                            } else {
                                setWarning("Please check your email")
                                document.getElementById("n").click()
                            }
                        }
                    } else {
                        setWarning("Please check your phone number ")
                        document.getElementById("n").click()
                    }
                }

            } else if (free === "") {
                setWarning("Please chosse  fill a field")
                document.getElementById("n").click()
            }



            if (files[0] !== undefined) {


                for (let index = 0; index < files.length; index++) {

                    element = element + parseInt(files[index].volume);
                    // console.log(element);
                };

                setPrinting(element * 10)

                if (idProductType === "622d096ae6ba9af1bfdbd7cc,0" || idProductType === "622d099ce6ba9af1bfdbd7ce,1") {
                    if (colorType === "black" || colorType === "white") {
                        setMaterial(0);

                    } else {
                        setMaterial(element * 2)

                    }
                } else if (idProductType === '622d09bbe6ba9af1bfdbd7d0,2') {
                    setMaterial(element * 250)
                } else {
                    if (colorType === "black" || colorType === "white") {
                        setMaterial(element * 5)

                    } else {
                        setMaterial(element * 7)

                    }
                }



                if (pCount === 1) {
                    if (state.toLowerCase() === "west bengal" || state.toLowerCase() === "westbengal" || state.toLowerCase() === "w.b." || state.toLowerCase() === "wb") {
                        if (pincode.indexOf(7) === 0) {
                            if (Town.toLocaleLowerCase() === "kolkata") {

                            }
                            setDeliver(element * 1 * 0.6)

                        }
                    } else {
                        setDeliver(element * 1 * 0.8)

                    }
                }

                if (outputMm1 <= 0.14 && mmInput2 <= 20) {
                    setAdditional(0)

                } else if (outputMm1 <= 0.25 && mmInput2 <= 55) {
                    setAdditional(element * 2)

                } else {
                    setAdditional(element * 3)

                }



            }






            // console.log(sendRes)
            // formData.append("data", JSON.stringify(sendData))
            // formData.append("data", files)





            // axios({
            //     method: "post",
            //     url: "http://localhost:4000/api/upload_files",
            //     data: bodyFormData,
            //     headers: { "Content-Type": "multipart/form-data" },
            // })



        } else if (Slider === 4) {
            if (count <= 0) {
                setWarning("Please give positive integer");
                document.getElementById("n").click();
            } else {
                setSlider(Slider + 1)
                displayRazorpay()
                var formData1 = new FormData()
                var formData2 = new FormData()

                for (let index = 0; index < files.length; index++) {
                    formData1.append("images", files[index].file)
                    let resp = await uploads_file(formData1);
                    formData2.append("respon", JSON.stringify(resp.data))
                    formData1.delete("images");
                }
                /*##Why this code is not comfortable for send image because it react so fast and crash the backend block to send response*/

                // files.map( async (img, index) => {
                //     formData1.append("images", img.file)
                //   let resp = await axios.post("http://localhost:4000/api/upload_files",formData1);
                //   console.log(resp.data);
                //     formData2.append("respon",resp.data)
                //     formData1.delete("images");
                //     console.log(formData1.getAll("images"));
                // })
                var imgSasveArray = formData2.getAll("respon")
                let sendData = { outputMm1, mmInput2, supRemov, voporPolish, free, hNo, area, Lankmark, Town, pincode, state, warning, count, pCount, idProductType, Slider, svgDLoad, rushPaint, colorTypeId, handeling, printing, material, additional, deliver, gst, total, imageName: JSON.parse(imgSasveArray[0]), clientName, clientPhone, clientEmail }

                let sendRes = await postDataFor3D(sendData)
            if (sendRes.status===201) {
                // history.push(`/checkyouorder/${sendRes.data._id}`)
                // await sendEmail({
                //     to: "connect.youngminds@gmail.com",
                //     subject: "successfull order details",
                //     content: `The client name : ${clientName}, 
                //     The client phone : ${clientPhone}, 
                //     The client Email : ${clientEmail}, 
                //     client db id : ${sendRes.data._id},
                //     client Link : ${window.location.host}/checkyouorder/${sendRes.data._id},
                //     client files Link : ${imgSasveArray},
                //     Details are ==>
                //     layerHight: ${outputMm1}, 
                //     inFill: ${mmInput2},
                //     supportRemove: ${supRemov},
                //     voporPolish: ${voporPolish},
                //     deliveryOrPickup: ${free}, 
                //     address1: ${hNo},
                //     address2: ${area},
                //     Lankmark: ${Lankmark},
                //     Town: ${Town},
                //     pincode: ${pincode}, 
                //     state: ${state},
                //     count: ${count},
                //     rushPaint: ${rushPaint},
                //     colorTypeId: ${colorTypeId},
                //     handelingFees: ${handeling},
                //     printingFees: ${printing}, 
                //     materialFees: ${material},
                //     additionalFees: ${additional},
                //     deliveryFees: ${deliver},
                //     tax: ${gst},
                //     netTotal: ${count * total},
                //     payment:pending`
                // })
            }
            
               
               
              
            }

        }


    }
    const makeActive = (a) => {
        for (let index = 0; index < document.getElementsByClassName('suggestionTab').length; index++) {
            document.getElementsByClassName('suggestionTab')[index].style.borderLeft = ""
        }
        if (a >= 0) {
            setPickSuggetion(a)
            document.getElementsByClassName('suggestionTab')[a].style.borderLeft = "5px solid #193566"
        } else {
            setPickSuggetion(document.getElementsByClassName('suggestionTab').length - 1);
            document.getElementsByClassName("suggestionTab")[document.getElementsByClassName('suggestionTab').length - 1].style.borderLeft = "5px solid #193566"
        }
    }

    const tiggerInput = () => {
        var inputTrigger = document.getElementById("selectedfile")
        inputTrigger.click()
    }
    const preView = (index) => {
        var vstls = document.getElementById("vs-iframe");
        var dnone = document.getElementById("dnone");
        vstls.style.display = "flex"
        dnone.style.display = "flex"
        vstls.contentWindow.postMessage({ msg_type: 'load', file: files[index].file }, '*');

        saveObj.push(files[index].volume, files[index].name, Math.round(files[index].x_axis), Math.round(files[index].y_axis), Math.round(files[index].z_axis))
        setArrray([]);
        setArrray(saveObj)

    }
    const deleted = (index) => {
        index <= 0 ? files.shift(index) : files.splice(index, index)
        var a = files;
        setFiles([])

        setTimeout(() => {
            setFiles(a)
            var elementVol = 0
            for (let index = 0; index < a.length; index++) {
                elementVol = elementVol + parseInt(a[index].volume);
            }
            setTotalVolume(elementVol)
        }, 300)
    }
    const addPinCode = (e) => {
        if (e.target.value.length <= 6) {
            setPincode(e.target.value);
        }

    }
    const setDataP = () => {
        setSvgDLoad(1)
        setTimeout(() => {

            var element1 = 0
            for (let index = 0; index < files.length; index++) {
                element1 = element1 + parseInt(files[index].volume);
            }
            if (imgCount !== 0) {

                setTotalVolume(element1)
                // console.log(element1);
            }
            setImgCount(imgCount + 1)
            setSvgDLoad(0)
        }, 6000)
    }
    const defultSet = () => {
        if (cousto === 1) {
            document.getElementsByName("checkBox1")[1].click()
            document.getElementById("defultColor").click()
        } else {
            document.getElementsByName("checkBox1")[1].click()
            document.getElementById("defultColor").click()
        }
    }

    var price = 100;


    if (Slider === 0) {
        return (
            <>
                <div className='putCenter' >
                    <div className="maintaindisplay">
                        <div className='fontHeading1'> <Link to='/services' ><BackSvg /></Link> Get&nbsp;started</div>
                        <hr />
                        <br />
                        <div style={{ paddingBottom: "12px" }} className='fontHeading2'>Upload Your File
                            <div className="underCap">
                                ( STLs or ziped STL Files)
                            </div>
                        </div>
                        <div id="inputload" style={{ flexDirection: "column" }}>
                            <button className="uploadBlock btton">
                                <form encType="multipart/form-data" id="form" >
                                    <input type="file" accept='.stl' className="hdn-input" style={{ cursor: "pointer" }} onChange={saveImg} name="" id="selectedfile" />
                                </form>


                                <div className="dashBorder">
                                    <UploadSvg />
                                </div>

                                <iframe name="viewstl" id="vs_iframe" src="https://www.viewstl.com/?embedded&bgcolor=gray&color=white&noborder=yes&orientation=bottom" className='none' ></iframe>
                            </button>

                            <div className="d-in clor my-2" style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "10px", cursor: "pointer" }}>

                                <div style={{ cursor: "pointer" }} onClick={tiggerInput} className="circle">
                                    <div style={{ cursor: "pointer" }} className="plusSymbol"></div>
                                </div>

                                <div className="mx-2">
                                    Add more Files
                                </div>

                            </div>
                        </div>

                        <div id="inputLoading" style={{ height: "110px", justifyContent: "center" }}>
                            <div className="d-flex align-items-center" style={{ width: "200px" }}>
                                <strong>Loading...</strong>
                                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div className="fileListBox">

                            {files.map((any, index) => <div key={index} className="pointText"> <div style={{ maxWidth: "193px", overflow: "auto" }}>  {any.name} </div>  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}>  <div onClick={() => { preView(index) }}> <EyeSvg width="18px" height="20px" /> </div> <hr className='routetion' style={{ width: "20px" }} /> <DeleteSvg width="15px" onClick={(e) => { deleted(index) }} height="20px" />   </div>

                            </div>)}



                        </div>

                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <div style={{ fontSize: "20px", color: "#193566" }}> <strong> Our Suggestions </strong> </div>
                                <div>

                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }} >

                                {suggestion.map((any, index) => {
                                    return (
                                        <div className='suggestionTab my-2 px-2' onClick={() => {
                                            setCousto(0); setSupRemov(any.supportRemoval); setVoporPolish(any.vaporPolishing); setMmInput(any.inFill); setMmInput2(any.inFill); makeActive(index); setFinishing(500)
                                        }} key={index} >
                                            <div style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "", minWidth: "100%", justifyContent: "space-between" }}>
                                                <strong style={{ fontWeight: "900" }}>{any.typeName}</strong>  <strong style={{ fontSize: "14px" }} > ₹ {totalVolume !== 0 ? Math.round((totalVolume * any.multi) + any.plus + 1000 + (((totalVolume * any.multi) + any.plus + 1000) * 18 / 100)) : 0} </strong>
                                            </div>
                                            <p style={{ color: "#a4b3c9", fontSize: "11px" }} > ({any.layerHight}mm, {any.inFill}%, {any.supportRemoval} , {any.vaporPolishing})   </p>
                                            <hr />

                                        </div>
                                    )
                                })}
                                <div className='suggestionTab px-2' onClick={() => { setCousto(1); setSupRemov(""); setVoporPolish(""); makeActive(-1) }} >
                                    <strong style={{ fontWeight: "900", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "", minWidth: "100%", justifyContent: "space-between" }}>Customise <Custom /></strong>
                                    <p style={{ color: "#a4b3c9", fontSize: "11px" }} > (You can customise on 3rd page If you want)</p>
                                    <hr />

                                </div>
                            </div>
                        </div>

                        <div className="d-in any mHeightY-3 clor">
                            <Link to="/3d_design" className='underline' >
                                I don't have any file.
                            </Link>
                            <hr className='routetion' />
                            <button onClick={() => { sendData() }} className="submitAll">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
                <div id="dnone">
                    <div style={{ borderRadius: "23px" }} >
                        <div className='show3D' >
                            <iframe name="viewstl" id="vs-iframe" src="https://www.viewstl.com/?embedded&bgcolor=gray&color=white&noborder=yes&orientation=bottom" ></iframe>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#193566" }} >
                                <div>Volume : :</div>   {arrray[0]} cm3
                            </div >
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#193566" }} >
                                <div>Name :</div>     {arrray[1]}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#193566" }}>
                                <div>X-coordinate :</div>    {arrray[2]} mm
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#193566" }} >
                                <div>Y-coordinate :</div>    {arrray[3]} mm
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#193566" }} >
                                <div>Z-coordinate :</div>   {arrray[4]} mm
                            </div>
                            <button className='btn btn-danger' onClick={() => { document.getElementById("vs-iframe").style.display = "none"; document.getElementById("dnone").style.display = "none" }} > close it </button>
                        </div>
                    </div>
                </div>
                <Button id='n' variant="primary" onClick={() => { setFls(true) }}>
                    Launch demo modal
                </Button>
                <Modal show={fls}  >
                    <Modal.Header closeButton onClick={() => { setFls(false) }}>
                        <Modal.Title style={{ color: 'red' }}>Warning !!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'red' }}> {warning} </Modal.Body>

                </Modal>
            </>
        );
    } else if (Slider === 1) {
        return (
            <>
                <div className="putCenter">
                    <div className="maintaindisplay">
                        <div className='fontHeading1'><BackSvg onClick={() => { setSlider(0) }} />Description</div>
                        <hr />
                        <br />
                        <div className='fontHeading2'>
                            Choose preferred material
                        </div>
                        <div className="materialVaule">
                            <div>{materialType.map((productType, index) => <label key={index} className='blockLine'> <input type="radio" onClick={saveValue} value={productType._id + "," + index} name="checkBox1" /> <span className='checked'  ></span> {productType.name} </label>)} </div>
                        </div>
                        <div className="fontHeading2">
                            Choose preferred colour
                        </div>
                        <div className="absluteContainer">

                            <div className="colorChosse" >
                                <br />
                                <br />
                                <div className="flexClr">
                                    <div className="clrVlue" onClick={() => { setcolorTypeId('white'); setColorType('white') }} style={{ cursor: "pointer", backgroundColor: "white" }} id="defultColor"></div>
                                    <div className="clrVlue" onClick={() => { setcolorTypeId('black'); setColorType('black') }} style={{ cursor: "pointer", backgroundColor: "black" }} ></div>
                                </div>
                                <hr />
                                <div className="flexClr">
                                    {colors.map((productType, index) => <div key={index} className="clrVlue" onClick={() => { setColorType(productType.name); setcolorTypeId(productType._id) }} style={{ cursor: "pointer", backgroundColor: `${productType.value}` }}></div>)}

                                </div>
                            </div>
                            <div className="roundRetrangel">
                                {colorType === "" ? 'select Item' : <> <div className="clrVlue" style={{ cursor: "pointer", backgroundColor: `${colorType}` }} ></div> {colorType} </>} <DropDownsvg className='rotation' />
                            </div>
                        </div>
                        <div className="d-in any clor">
                            <button onClick={defultSet} className="submitAll">
                                Reset
                            </button>
                            <hr className='routetion' />
                            <button onClick={() => { sendData() }} className="submitAll">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
                <Button id='n' variant="primary" onClick={() => { setFls(true) }}>
                    Launch demo modal
                </Button>
                <Modal show={fls}   >
                    <Modal.Header closeButton onClick={() => { setFls(false) }}>
                        <Modal.Title style={{ color: 'red' }}>Warning !!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'red' }}> {warning} </Modal.Body>

                </Modal>
            </>
        )
    } else if (Slider === 2) {
        return (
            <>
                <div className="putCenter">
                    <div className="maintaindisplay">
                        <div className='fontHeading1' style={{ letterSpacing: "-2px" }}  ><BackSvg onClick={() => { setSlider(1) }} /> Tell us more</div>
                        <hr />
                        <br />

                        <div className="bottomM-1">
                            <div style={{ fontSize: "17px" }} className='fontHeading2'>Layer Height: </div>
                            <div className="dashFild">
                                {outputMm1} mm
                            </div>
                        </div>

                        <div className="inputRange my-2">
                            <div className="inpuText">
                                0.075 mm
                            </div>
                            <input type="range" style={{ background: `linear-gradient(to right, #97a7c3 0%, #97a7c3 ${mmInput}%, #fff 0%, #fff 100%)` }} onChange={(e) => { setMmInput(e.target.value) }} value={mmInput} className="inputN" />
                            <div className="inpuText">
                                0.4 mm
                            </div>
                        </div>


                        <div className="bottomM-1">
                            <div style={{ fontSize: "17px" }} className='fontHeading2'>Infill Percentage:  </div>
                            <div className="dashFild" style={{ width: "40%" }}>
                                {mmInput2} %
                            </div>
                        </div>

                        <div className="inputRange my-3">
                            <div className="inpuText">
                                0%&nbsp;&nbsp;
                            </div>
                            <input type="range" style={{ background: `linear-gradient(to right, #97a7c3 0%, #97a7c3 ${mmInput2}%, #fff 0%, #fff 100%)` }} onChange={(e) => { setMmInput2(e.target.value) }} value={mmInput2} className="inputN" />
                            <div className="inpuText ">
                                &nbsp;&nbsp; 100%
                            </div>
                        </div>



                        <div className="rowFlex my-3">
                            <div style={{ fontSize: "17px" }} className='fontHeading2'>Support Removal:
                                <div className="underCap">
                                    (weight * 1.33)
                                </div>
                            </div>
                            <label className='blockLine'> <input type="checkbox" /> <span onClick={() => { supRemov === "supportRemove" ? setSupRemov("") : setSupRemov("supportRemove") }} className='checked'  ></span>  </label>
                        </div>


                        <div className="rowFlex my-3">

                            <div style={{ fontSize: "17px" }} className='fontHeading2'>Vapor Polishing:
                                <div className="underCap">
                                    (weight * 1.25 ; eligible materials: ABS/PLA/PC/BendLAY/HIPS)
                                </div>
                            </div>
                            <label className='blockLine'> <input type="checkbox" /> <span onClick={() => { voporPolish === "voporPolish" ? setVoporPolish("") : setVoporPolish("voporPolish") }} className='checked'  ></span>  </label>
                        </div>


                        <div className="rowFlex my-2">
                            <div className="fontSize20px">
                                Our Suggestions
                            </div>
                            < SSvg />
                        </div>

                        {suggestion.map((any, index) => {
                            return (
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >

                                    <input type="radio" name="setInFill" style={{ marginRight: "20px", marginLeft: "5px" }} onClick={() => { setSupRemov(any.supportRemoval); setVoporPolish(any.vaporPolishing); setMmInput(any.inFill); setMmInput2(any.inFill); setFinishing(500) }} /> {any.typeName}

                                </div>
                            )
                        })}


                        < br />

                        <div className="d-in any clor">
                            <a href="tel:+918910540012" className='underline' >
                                Talk to us
                            </a>
                            <hr className='routetion' />
                            <button onClick={() => { sendData() }} className="submitAll">
                                Print
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    } else if (Slider === 3) {
        return (
            <>
                <div className="putCenter">
                    <div className="maintaindisplay">
                        <div className='fontHeading1' style={{ letterSpacing: "2px", fontSize: "42px" }}  ><div onClick={() => {
                            if (cousto === 1) {
                                setSlider(2)
                                console.log(cousto);
                            } else {
                                setSlider(1);
                                console.log(cousto);
                            }
                        }} ><BackSvg /></div>  Address</div>
                        <hr />
                        <br />

                        <div className="clmScoler">
                            <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Name</div>
                                <input type="text" height="45px" name='name' value={clientName} onChange={(e) => { setclientName(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                            </div>
                            <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Phone</div>
                                <input type="text" height="45px" name='phone' value={clientPhone} onChange={(e) => { setclientPhone(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                            </div>
                            <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Email (Optional)</div>
                                <input type="text" height="45px" name='email' value={clientEmail} onChange={(e) => { setclientEmail(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                            </div>
                            <br />
                            <div className='' >
                                <div className="fontHeading2">
                                    Shipping:
                                </div>
                                <label className='blockLine mx-3' onClick={() => { setFree("pickup") }} > <input type="radio" name="pickup" /> <span onClick={() => { setFree("pickup") }} className='checked'  ></span> pickup (free) </label>
                                <label className='blockLine my-3 mx-3' onClick={() => { setFree("delivery") }} > <input type="radio" name="pickup" /> <span onClick={() => { setFree("delivery") }} className='checked'  ></span>delivery ($5.80 USD + $0.01 USD/g)  </label>
                            </div>
                            {free === "delivery" ? <div id='letGetAddress' style={{ flexDirection: "column" }}>
                                <div className="fontHeading2">
                                    Delivery at
                                </div>
                                <div className="rowFlex">
                                    <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                        <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Pincode</div>
                                        <input type="number" height="45px" name='pincode' value={pincode} onChange={(e) => { addPinCode(e) }} className="form-control shadowInput col-10" style={{ borderRadius: "200px", height: "35px" }} />
                                    </div>

                                    <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                        <div style={{ fontSize: "14px", fontWeight: "bold" }} >State</div>
                                        <Form.Select aria-label="Default select example" value={state} onChange={(e) => { setState(e.target.value) }} className="form-control shadowInput col-10" style={{ borderRadius: "200px", height: "35px" }} >
                                            <option className="form-control shadowInput col-10" style={{ borderRadius: "200px", height: "35px" }} value='' >Choose Your State</option>

                                            {indianStateArray.map((stateArray) => {
                                                return (
                                                    <option value={stateArray.stateobj}>{stateArray.stateobj}</option>
                                                )

                                            })}

                                        </Form.Select>
                                    </div>
                                </div>
                                <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                    <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Town/City</div>
                                    <input type="text" name='city' height="45px" value={Town} onChange={(e) => { setTown(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                                </div>
                                <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                    <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Flat, House no, Building, Apartment</div>
                                    <input type="text" name='houseNo' height="45px" value={hNo} onChange={(e) => { setHNo(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                                </div>
                                <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                    <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Area, Street, Sector</div>
                                    <input type="text" name='street' height="45px" value={area} onChange={(e) => { setArea(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                                </div>
                                <div className="fontChipkuInput" style={{ marginBottom: "10px" }} >
                                    <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "8px" }} >Lankmark (Optional)</div>
                                    <input type="text" name='landmark' height="45px" value={Lankmark} onChange={(e) => { setLankmark(e.target.value) }} className="form-control shadowInput col-12" style={{ borderRadius: "200px", height: "27px" }} />
                                </div>


                            </div> : <div id="letGetPlace">
                                9, Mangoe Ln, Mission Row Extension, Esplanade, Chowringhee North, Bow Barracks, Kolkata, West Bengal 700001
                            </div>}
                        </div>
                        <br />

                    </div>
                    <div className="d-in any clor">
                        <button onClick={() => { sendData() }} className="submitAll">
                            Submit
                        </button>
                    </div>
                </div>
                <Button id='n' variant="primary" onClick={() => { setFls(true) }}>
                    Launch demo modal
                </Button>
                <Modal show={fls}   >
                    <Modal.Header closeButton onClick={() => { setFls(false) }}>
                        <Modal.Title style={{ color: 'red' }}>Warning !!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'red' }}> {warning} </Modal.Body>
                </Modal>
            </>
        )
    } else if (Slider === 4) {
        return (
            <>
                <div className="putCenter">
                    <div className="maintaindisplay">
                        <div className='fontHeading1' style={{ letterSpacing: "2px", fontSize: "42px" }}  ><div onClick={() => { setSlider(3) }} ><BackSvg /></div>  Payment</div>
                        <hr />

                        <div className="rowFlex my-2">
                            <div className="fontHeading2" style={{ fontSize: "21px" }}>
                                Your Cart
                            </div>
                            < MallSvg />
                        </div>
                        <div className="rowFlex p-3" style={{ boxShadow: "4px 5px 4px 1px #d7dde3, -4px -5px 4px 1px #ffffff", borderRadius: "7px" }}>

                            <div style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
                                < ImgSvg />
                                <div className="fontHeading2 mx-2" style={{ fontSize: "12px" }}>
                                    Quantity
                                    <div className="underCap">
                                        product description
                                    </div>
                                </div>

                            </div>
                            <div style={{ display: "flex", flexDirection: 'row', alignItems: "center" }} className="">
                                <button className="round " onClick={() => { count >= 2 ? setCount(count - 1) : setCount(1) }} >
                                    < RemoveSvg />
                                </button>
                                <input type="number" min={1} value={count} style={{ width: "40px", backgroundColor: "#ecf0f3", border: "2px solid #ecf0f3", textAlign: "center", boxShadow: "inset rgb(215 221 227) 0px 2px 4px 1px, inset rgb(255 255 255) -4px -5px 4px 1px", borderRadius: "7px" }} onChange={(e) => { if (e.target.value !== "") { setCount(parseInt(e.target.value)) } }} className='focusInputColor' />

                                <button className="round " onClick={() => { count === "" ? setCount(1) : setCount(count + 1) }}>
                                    < AddSvg />
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className="rowFlex">
                            <div className='fontHeading2'>Rush Printing:
                                <div className="underCap">
                                    (Estimated delivery time - 1 week)
                                </div>
                            </div>
                            <label className='blockLine'> <input type="checkbox" name="checkBox" /> <span onClick={(e) => { rushPaint === "rushPaint" ? setRushPaint("") : setRushPaint("rushPaint") }} className='checked'  ></span>  </label>
                        </div>
                        <br />
                        <div className="rowFlex my-2">
                            <div className="fontHeading2" >
                                Billing
                            </div>
                            < SellSvg />
                        </div>
                        <div className="Aretrianget py-2">
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Handeling fees
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {handeling}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Printing fees
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {printing}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Material fees
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {material}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Finishing fees
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {finishing}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Additional fees
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {additional}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Transport Cost
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {deliver}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    G.S.T
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {gst}
                                </div>
                            </div>
                            <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    Net Total
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    {count === 1 ? total : `${count}*${total}`}
                                </div>
                            </div>
                            {/* <div className="rowFlex mx-4 my-2">
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    disscount
                                </div>
                                <div className="underCap" style={{ fontStyle: "normal" }}>
                                    
                                </div>
                            </div> */}
                            <hr className='mx-2' style={{ background: "#193566", }} />

                            <div className="rowFlex mx-4 my-2">
                                <div className="fontHeading2" >
                                    Total
                                </div>
                                <div className="fontHeading2" >
                                    {count * total}
                                </div>
                            </div>
                        </div>

                        <br />
                        <div className="d-in any clor">
                            <button onClick={(e) => { sendData() }} className="submitAll">
                                Pay Now
                            </button>
                        </div>

                    </div>
                </div>
                <Button id='n' variant="primary" onClick={() => { setFls(true) }}>
                    Launch demo modal
                </Button>
                <Modal show={fls}   >
                    <Modal.Header closeButton onClick={() => { setFls(false) }}>
                        <Modal.Title style={{ color: 'red' }}>Warning !!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'red' }}> {warning} </Modal.Body>

                </Modal>
            </>
        )
    } else if (Slider === 5) {
        return (
            <div className='putItcenter' >
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div>Your Patience is appreciated! Please Wait while we upload your files.</div>
                <div className="putItCenter">
                    <button id='goBackHide' className='submitAll' onClick={() => { setSlider(Slider - 1) }} >Goback </button>
                </div>
            </div>
        )
    } else if (Slider === 6) {
        return (
            <div className='putItcenter' >
                <div>something worng 404 please contact us</div>
            </div>
        )
    }

}

export default Interface;
