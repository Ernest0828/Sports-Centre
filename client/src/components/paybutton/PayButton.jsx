import axios from "axios";
import { Auth } from '../../context/Auth';
import React, { useContext } from 'react';


 const PayButton = ({items}) => {

    const{user} = useContext(Auth);

    const handleCheckout= async() =>{
        axios.post("http://localhost:5000/api/create-checkout-session",{
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