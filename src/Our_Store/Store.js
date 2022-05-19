import React from 'react'
// import { Link } from 'react-router-dom'

import Mainpage from '../Mainpage/Mainpage'
import "./Store.css"
import storeCategory from "./storeCateogry.json"
import "./responsiveStore.css"
import storeProduct from "./storeProduct.json"
import trendingproduct from './trendingproduct.json'
import { useState } from 'react'

export default function Store() {
  const [productSlider, setproductSlider] = useState(1)
  const [trendProductSlider, settrendProductSlider] = useState(1)
  const nextTrendProduct = ()=>{
    settrendProductSlider(trendProductSlider === 3  ?  1 : trendProductSlider + 1)
  }
  const prevTrendProduct = ()=>{
    settrendProductSlider(trendProductSlider === 1  ?  3 : trendProductSlider - 1)
  }
  const changeTrendProduct = (index)=>{
    settrendProductSlider(index+1)
  }
  const nextProduct = ()=>{
    setproductSlider(productSlider === 3  ?  1 : productSlider + 1)
  }
  const prevProduct = ()=>{
    setproductSlider(productSlider === 1  ?  3 : productSlider - 1)
  }
  const changeProduct = (index)=>{
    setproductSlider(index+1)
  }
  return (
    <div>
      <div className="storeDOM">
        {/* Adding main page */}
      <Mainpage title = "." midHeading ="Never Stop Learning___" companyName="TOGETHER WE CAN" purpose= "CREATE AN IMPACT" community="" display="flex" img="image/store.jpg" toggleDisplay="none" buttonDisplay= "block" headingDisplay="none" btnText="Search" _display="none" btnLink="https://store.theyoungminds.org"  buttonDisplay_store="none" homeDisplayBtn="none"/>
      {/* section 1 feautured product */}
        <div className="store_featured">
          <div className="featured_nav">
            <div className="nav_heading">
              <h4>FEATURED</h4>
              <h2 className="let_me_try">PRODUCT</h2>
            </div>
            <div className="viewAll">
            {/* <i className="fas fa-thumbtack utility"></i>
                        <Link to="./home/categories"><i className="fas fa-info-circle utility"></i></Link>
                        <Link to="./home/categories"><span>view all</span></Link>
                        <i className='fas fa-chevron-right'></i> */}
                        </div>
          </div>
          <div className="store_products store_productDis">
            {storeProduct.map((data, index) => {
              return (         
                <a className={productSlider === data.slider ? "store-product_details productSlide" : "store-product_details"} key={index} href={data.link} target="_blank" rel="noopener noreferrer">
                  {productSlider === data.slider && (
                    <>
                    <div className="productIMG">
                      <img src={data.img} alt="our_product" />
                    </div>
                  <div className="product_desc">
                    <h4>{data.title}</h4>        
                  </div>
                  <h6>{data.name}</h6> 
                    </>
                  )}
                </a>
              )
            })}
          </div>
          <div className="Deskicons utility">
                            <i className="fas fa-chevron-left" onClick={prevProduct} ></i>
                            <i className="fas fa-chevron-right" onClick={nextProduct}></i>
                        </div>
                        <div className="testBtnDOM">
                            {Array.from({ length: 3 }).map((item, index) => {
                                return (
                                    <div className={productSlider === index + 1 ? "btn active" : "btn"} key={index} onClick={() => changeProduct(index)} ></div>
                                )
                            })}
                        </div>
          <div className="store_products">
            {storeProduct.map((data, index) => {
              return (     
                <a className="store-product_details productFixChanges" key={index} href={data.link} target="_blank" rel="noopener noreferrer">
                   <div className="productIMG">
                      <img src={data.img} alt="our_product" />
                    </div>
                  <div className="product_desc">
                    <h4>{data.title}</h4>        
                  </div>
                  <h6>{data.name}</h6> 
                </a>
              )
            })}
          </div>
        </div>
        {/* section 2 categories for store */}
        <div className="store_categories">
          <h4>TOP</h4>
          <h2>Categories</h2>
          <div className="categories_DOM">
            {storeCategory.map((data, index) => {
              return (
                  <div className='categories_box' key={index}>
                    <h4>{data.title}</h4>
                    <h4>{data.title2}</h4>
                    <img src={data.img} alt="" />
                    <a href={data.link} className='navButton' target='_blank' rel="noopener noreferrer"><button>Go To</button></a>
                  </div>
              )
            })}
          </div>
        </div>
        <div className="store_featured">
          <div className="featured_nav">
            <div className="nav_heading">
              <h4>NOW IN</h4>
              <h2>TREND</h2>
            </div>
            <div className="viewAll">
            {/* <i className="fas fa-thumbtack utility"></i>
                        <Link to="./home/categories"><i className="fas fa-info-circle utility"></i></Link>
                        <Link to="./home/categories"><span>view all</span></Link>
                        <i className='fas fa-chevron-right'></i> */}
                        </div>
          </div>
          <div className="store_products store_productDis">
            {trendingproduct.map((data, index) => {
              return ( 
                <a className={trendProductSlider === data.slider ? "store-product_details productSlide" : "store-product_details"} key={index} href={data.link} target="_blank" rel="noopener noreferrer">
                  {trendProductSlider === data.slider && (
                    <>
                  <div className="productIMG">
                      <img src={data.img} alt="our_product" />
                    </div>
                  <div className="product_desc">
                    <h4>{data.title}</h4>        
                  </div>
                  <h6>{data.name}</h6> 
                    </>
                  )}
                </a>
              )
            })}
          </div>
          <div className="Deskicons utility">
                            <i className="fas fa-chevron-left" onClick={prevTrendProduct} ></i>
                            <i className="fas fa-chevron-right" onClick={nextTrendProduct}></i>
                        </div>
                        <div className="testBtnDOM">
                            {Array.from({ length: 3 }).map((item, index) => {
                                return (
                                    <div className={trendProductSlider === index + 1 ? "btn active" : "btn"} key={index} onClick={() => changeTrendProduct(index)} ></div>
                                )
                            })}
                        </div>
          <div className="store_products">
            {trendingproduct.map((data, index) => {
              return (        
                <a className="store-product_details productFixChanges" key={index} href={data.link} target="_blank" rel="noopener noreferrer">
               <div className="productIMG">
                      <img src={data.img} alt="our_product" />
                    </div>
                  <div className="product_desc">
                    <h4>{data.title}</h4>        
                  </div>
                  <h6>{data.name}</h6> 
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

