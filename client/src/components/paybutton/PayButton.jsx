import axios from "axios";
import { Auth } from '../../context/Auth';
import React, { useContext, useEffect, useState } from 'react';
const url = "http://localhost:4000/api";

 const PayButton = () => {

    const{user} = useContext(Auth);
    const[basketItems, setBasketItems] = useState([]);


    useEffect(() => {
        const fetchBasketItems = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/api/basket/basket/${user.details.customerId}`)
                console.log(response)
                setBasketItems(response.data)
            }catch(error){
                console.log(error.message)
            }
        };
        if(user){
            fetchBasketItems();
        }
    }, [user]);
//How to get all the basket items where customer id = ? and how do i pass all of them to stripe?
    const handleCheckout= async() =>{
        // console.log(items);
        axios.post(`${url}/stripe/booking-checkout-session`,{
            basketItems,
           customerId: user.details.customerId
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=> console.log(err.message));
    };

    return (
    <>
    <button onClick={()=> handleCheckout()}>Check out
    </button>
    </>

    );
 }

 export default PayButton