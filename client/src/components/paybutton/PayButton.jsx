import axios from "axios";
import { Auth } from '../../context/Auth';
import React, { useContext } from 'react';
const url = "http://localhost:4000/api";

 const PayButton = ({items}) => {

    const{user} = useContext(Auth);

    const handleCheckout= async() =>{
        console.log(items);
        axios.post(`${url}/stripe/create-checkout-session`,{
            items,
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