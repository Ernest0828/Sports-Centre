import React,{Fragment, useState} from "react";
import "./noAccBasket.css";
import { Link} from "react-router-dom";

export default function Basket() {
  return (
    <Fragment>
        <div className="basket">
            <span className="basketTitle">Basket</span> 
            <div className="userBasket">
              <div className="basketLoginPrompt">
                <div className="basketLoginPromptDescription">Log in to add items to your basket.</div>
                <button className="basketLoginButton">Login</button>
              </div>                
            </div>
        </div>
    </Fragment>
  )
}
