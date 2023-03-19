import React,{Fragment, useState} from "react";
import "./haveAccBasket.css";
import { Link} from "react-router-dom";

export default function Basket() {
  return (
    <Fragment>
        <div className="basket">
            <span className="basketTitle">Basket</span> 
            <div className="userBasket">
              <div className="itemInBasket">
                <div className="itemDescription">
                  <p>Swimming Pool — 1 Hour</p>
                </div>
                <div className="belowDescription">
                  <div className="itemCost">
                    <p>£13.00</p>
                  </div>
                  <button className="removeBookingButton">Remove</button>
                </div>  
              </div> 
              <div className="itemInBasket">
                <div className="itemDescription">
                  <p>Swimming Pool — 1 Hour</p>
                </div>
                <div className="belowDescription">
                  <div className="itemCost">
                    <p>£13.00</p>
                  </div>
                  <button className="removeBookingButton">Remove</button>
                </div>  
              </div> <div className="itemInBasket">
                <div className="itemDescription">
                  <p>Swimming Pool — 1 Hour</p>
                </div>
                <div className="belowDescription">
                  <div className="itemCost">
                    <p>£13.00</p>
                  </div>
                  <button className="removeBookingButton">Remove</button>
                </div>  
              </div> <div className="itemInBasket">
                <div className="itemDescription">
                  <p>Swimming Pool — 1 Hour</p>
                </div>
                <div className="belowDescription">
                  <div className="itemCost">
                    <p>£13.00</p>
                  </div>
                  <button className="removeBookingButton">Remove</button>
                </div>  
              </div>                
            </div>
            <div className="basketBottom">
              <div className="basketTotalCost">
                  <p>Total: £39.00</p>
              </div>
              <button className="checkoutButton">Check Out</button>
            </div>
        </div>
    </Fragment>
  )
}
