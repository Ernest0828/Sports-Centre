// import React, { Fragment, useState, useContext} from "react";
// import "./basket.css";
// import { Link } from "react-router-dom";
// import {Auth} from "../../context/Auth"

// //used chatgpt for inspiration on the remove function
// export default function Basket() {

//   const {user} = useContext(Auth);

//   const [items, setItems] = useState([
//     { description: "Swimming Pool - General use", cost: 8.0 },
//     { description: "Swimming Pool - General use", cost: 8.0 },
//     { description: "Swimming Pool - General use", cost: 8.0 },
//     { description: "Swimming Pool - General use", cost: 8.0 },
//     { description: "Fitness room  - 1 Hour", cost: 8.0},
//   ]);

//   const removeItem = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//   };

//   return (
//     <Fragment>
//       <div className="basket">
//         <span className="basketTitle">Basket</span>
//         <div className="userBasket">
//           {user ? ( 
//             items.map((item, index) => (
//             <div className="itemInBasket" key={index}>
//               <div className="itemDescription">
//                 <p>{item.description}</p>
//               </div>
//               <div className="belowDescription">
//                 <div className="itemCost">
//                   <p>£{item.cost.toFixed(2)}</p>
//                 </div>
//                 <button
//                   className="removeBookingButton"
//                   onClick={() => removeItem(index)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))
//           ) : (
//             <div className="basketLoginPrompt">
//               <div className="basketLoginPromptDescription">Log in to add items to your basket.</div>
//               <Link to="../login">
//                 <button className="basketLoginButton">Login</button>
//               </Link>
//             </div>
//           )}
//         </div>
//         <div className="basketBottom">
//           <div className="basketTotalCost">
//           {user ? (
//             <p>
//               Total: £{items.reduce((total, item) => total + item.cost, 0).toFixed(2)}
//             </p>
//           ):(
//             <p>
//               Total: £0.00
//             </p>
//           )}
            
//           </div>
//           <button className="checkoutButton">Check Out</button>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

import React, { Fragment, useState, useContext, useEffect } from "react";
import "./basket.css";
import { Link } from "react-router-dom";
import { Auth } from "../../context/Auth";

export default function Basket() {
  const { user } = useContext(Auth);
  const [items, setItems] = useState([]);

  // load items from local storage on mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("basketItems"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  // save items to local storage every time the items array changes
  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(items));
  }, [items]);

  const addItem = (description, cost) => {
    const newItems = [...items, { description, cost }];
    setItems(newItems);
  };

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
          <button className="checkoutButton">Check Out</button>
        </div>
      </div>
    </Fragment>
  );
}