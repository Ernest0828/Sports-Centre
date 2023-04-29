import React, { useState, useContext, useEffect} from "react";
import "./basket.css";
import { Link } from "react-router-dom";
import {Auth} from "../../context/Auth"
import axios from "axios";
import PayButton from "../paybutton/PayButton";

export default function Basket({ removeItem }) {
  const { user } = useContext(Auth);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/basket/basket/" + user.details.customerId);
        const itemsWithNames = await Promise.all(response.data.map(async (item) => {
          if (item.basketType === "class") {
            const classResponse = await axios.get("http://localhost:4000/api/classes/find/" + item.classId);
            return {
              ...item,
              className: classResponse.data.className
            };
          } else {
            return {
              ...item,
              activityName: item.activityName
            };
          }
        }));
        setItems(itemsWithNames);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchBasketItems();
  }, [user.details.customerId]);
  
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/api/basket/${user.details.customerId}/${itemId}`);
      const response = await axios.get(`http://localhost:4000/api/basket/basket/${user.details.customerId}`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  };


  return (
    <div className="basket">
      <span className="basketTitle">Basket</span>
      <div className="userBasket">
        {user ? (
          items.map((item) => (
            <div className="itemInBasket" key={item.basketId}>
              <div className="itemDescription">
                <p>{`${item.facilityName} - ${item.activityId} ${formatDate(item.date)} - ${item.startTime}`}</p>
              </div>
              <div className="belowDescription">
                <div className="itemCost">
                  <p>£{item.price.toFixed(2)}</p>
                </div>
                <button className="removeBookingButton" onClick={() => handleRemoveItem(item.basketId)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="basketLoginPrompt">
            <div className="basketLoginPromptDescription">Log in to add items to your basket.</div>
            <Link to="../login">
              <button className="basketLoginButton">Login</button>
            </Link>
          </div>
        )}
      </div>
      <div className="basketBottom">
        <div className="basketTotalCost">
          {user ? (
            <p>Total: £{items.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
          ) : (
            <p>Total: £0.00</p>
          )}
        </div>
        <PayButton items={items} />
      </div>
    </div>
  );
}



