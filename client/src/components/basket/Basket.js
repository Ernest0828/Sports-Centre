import React, { Fragment, useState, useContext, useEffect} from "react";
import "./basket.css";
import { Link } from "react-router-dom";
import {Auth} from "../../context/Auth"
import PayButton from "../paybutton/PayButton";

export default function Basket({basketItems = [], removeItem}) {

  // save items to local storage every time the items array changes
  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(items));
  }, [items]);

  
  //Need to make this array dynamic such that it takes in the info/data from the booking details
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(basketItems);
  }, [basketItems]);

  return (
    <Fragment>
      <div className="basket">
        <span className="basketTitle">Basket</span>
        <div className="userBasket">
          {user ? (
            items.map((item, index) => (
              <div className="itemInBasket" key={index}>
                <div className="itemDescription">
                  <p>{item.description}</p>
                </div>
                <div className="belowDescription">
                  <div className="itemCost">
                    <p>£{item.cost.toFixed(2)}</p>
                  </div>
                  <button
                    className="removeBookingButton"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="basketLoginPrompt">
              <div className="basketLoginPromptDescription">
                Log in to add items to your basket.
              </div>
              <Link to="../login">
                <button className="basketLoginButton">Login</button>
              </Link>
            </div>
          )}
        </div>
        <div className="basketBottom">
          <div className="basketTotalCost">
            {user ? (
              <p>
                Total: £
                {items.reduce((total, item) => total + item.cost, 0).toFixed(2)}
              </p>
            ) : (
              <p>Total: £0.00</p>
            )}
          </div>
          <PayButton items = {items}/>
        </div>
      </div>
    </Fragment>
  );
}