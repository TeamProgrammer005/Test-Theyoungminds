import axios from 'axios';


 const  Url= process.env.REACT_APP_API



export const postData = async(data)=>{
   return await axios.post(`${Url}/producttransaction`, data)
}

export const postDataFor3D = async(sendData)=>{
   return await axios.post(`${Url}/orderyour3d`, sendData)
}

export const getProductsByType = async(productType)=>{
   productType= productType || ''
   return await axios.get(`${Url}/product/${productType}`)
}

export const getTData = async(UniqueCode)=>{
  
  return await axios.get(`${Url}/producttransaction/${UniqueCode}`)
}

export const sendEmail = async(sEmail)=>{
   return await axios.post(`${Url}/mail`, sEmail)
}

export const payment = async(payData)=>{
   return await axios.post(`${Url}/razorpay`, payData)
}

export const onSuccessfullPayment = async(dataSendOnSuccess)=>{
   return await axios.post(`${Url}/suseccefullpayment`, dataSendOnSuccess)
}

export const comfermationOfPayment = async(dataSendOnSuccess)=>{
   return await axios.post(`${Url}/razorpays`, dataSendOnSuccess)
}

export const getSuggention = async()=>{
   return await axios.get(`${Url}/suggestionformaterial`)
}

export const getMetarialType = async()=>{
   return await axios.get(`${Url}/typeformaterial`)
}

export const getColorType = async()=>{
   return await axios.get(`${Url}/colorformaterial`)
}

export const uploads_file = async(formData1)=>{
   return await axios.post(`${Url}/uploads_file`, formData1)
}

export const upload_file = async(formData)=>{
   return await axios.post(`${Url}/upload_file`, formData)
}

export const upload_files = async(formData)=>{
   return await axios.post(`${Url}/upload_files`, formData)
}

export const repair3d = async(data)=>{
   return await axios.post(`${Url}/repair3d`, data)
}

export const ideaof3d = async(data)=>{
   return await axios.post(`${Url}/ideaof3d`, data)
}