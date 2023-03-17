import React, { Fragment, useState } from "react";
import "./haveAccBasket.css";
import { Link } from "react-router-dom";

export default function Basket() {
  const [items, setItems] = useState([
    { description: "Swimming Pool — 1 Hour", cost: 8.0 },
    { description: "Swimming Pool — 1 Hour", cost: 8.0 },
    { description: "Swimming Pool — 1 Hour", cost: 8.0 },
    { description: "Swimming Pool — 1 Hour", cost: 8.0 },
  ]);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Fragment>
      <div className="basket">
        <span className="basketTitle">Basket</span>
        <div className="userBasket">
          {items.map((item, index) => (
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
          ))}
        </div>
        <div className="basketBottom">
          <div className="basketTotalCost">
            <p>
              Total: £{items.reduce((total, item) => total + item.cost, 0).toFixed(2)}
            </p>
          </div>
          <button className="checkoutButton">Check Out</button>
        </div>
      </div>
    </Fragment>
  );
}
