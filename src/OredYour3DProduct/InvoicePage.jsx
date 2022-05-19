import React from 'react';
import "../Registration/registration.css";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ym_watermark from "../image/ymwatermark.png";
import { HiOutlineDownload } from "react-icons/hi";
import axios from 'axios';
import { exportComponentAsPNG } from 'react-component-export-image';


const Tiket = () => {
  const [compclass, setCompclass] = useState(1);
  const [data, setData] = useState('');
  const componentRef = useRef();
  const { _id } = useParams();

  const getBytoken = async () => {
    let res = await axios.get(`https://node-app-ym.herokuapp.com/api/yourtiketof3d/${_id}`)


    if (res.data !== undefined) {

      setData(res.data)
      console.log(res.data);
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
      <div style={{ minWidth: "100%" }}>
        <img class="media-object" width='70px' src="https://cdn.razorpay.com/logos/IXTD2b464tvA8z_large.png" alt="YM Education Private Limited" />
        <h3 class="merchant-name">YM Education Private Limited</h3>
        <div class="tax-details">
          <span class="tax-heading">GSTIN - </span>
          19AABCY4620N1ZX
        </div>
        <div class="tax-details">
          <span class="tax-heading">CIN - </span>
          U80301WB2021PTC249666
        </div>
        <br />
        <br />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <strong>Service Charge</strong> <strong>{ }</strong>  <strong>{data.invoiceData.totalAmount - Math.round(data.invoiceData.gstAmount)}</strong>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <strong>Tax</strong>    <strong>{Math.round(data.invoiceData.gstAmount)}</strong>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <strong>Gross Total</strong> <strong>{data.invoiceData.count}</strong> <strong>x</strong>  <strong>{data.invoiceData.totalAmount}</strong>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <strong>Sub Total</strong>  <strong>{data.invoiceData.count * data.invoiceData.totalAmount}</strong>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <strong>RazorPay Fee</strong>    <strong>{((data.invoiceData.paymentObject.fee) / 100).toString().split(".")[0]}</strong>
        </div>

        <br />
        <hr />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <strong>Net Total</strong>    <strong> {((data.invoiceData.paymentObject.amount) / 100).toString().split(".")[0]} </strong>
        </div>

        <br />
        {/* {((data.invoiceData.paymentObject.tax)/100).toString().split(".")[0]} */}
        <br />

      </div>
      <div >
        <h4>YM Education Private Limited</h4>
        <address>
          <div>
          </div>
          9, SURENDRA MOHAN GHOSH SARANI, 2ND FLOOR, ROOM NO. 28, 9, SURENDRA MOHAN GHOSH SARANI, Kolkata, West Bengal, India - 700001
        </address>
      </div>
    </div>
  ));



  if (compclass === 2) {
    return (<>
      <div className='shareicons'>
      <div style={{ display: 'flex', alignItems: "center", border: "2px solid #ecf0f3" }} className="downloadInvoice" onClick={SaveMytiket}>
        < HiOutlineDownload size="2.5rem" color='#193566' /> <div>Download Invoice</div>
      </div>
    </div>
      <div className='putItcenter' id="pdf1" >
        
        <div className="container workshopform">
          <form className="thankyoumsg toplabel" >
            <div className="conForm" id="pdf4" >
              <div className="conFormOrder" id='pdf5'>

                <ComponentToPrint ref={componentRef} />
                <div>
                  <img className="ymimage mt-2" src={ym_watermark} alt="logo" />
                  <div style={{ fontWeight: "bold" }} className='mb-2 ymname'>theyoungminds.org</div>
                </div>
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
      </> )
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
export default Tiket