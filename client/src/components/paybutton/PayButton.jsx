    import axios from "axios";
    import { Auth } from '../../context/Auth';
    import React, { useContext, useEffect, useState } from 'react';
    import { useNavigate } from "react-router-dom";
    import useFetch from "../../hooks/useFetch";

    const url = "http://localhost:4000/api";

    const PayButton = () => {

    const{user} = useContext(Auth);
    const[basketItems, setBasketItems] = useState([]);
    const navigate = useNavigate();

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

    const {data:customerData} = useFetch ("http://localhost:4000/api/customer/");
    const selectedCustomer = (user && user.details && customerData.find((customer) => customer.customerId === user.details.customerId)) ?? {}
    //How to get all the basket items where customer id = ? and how do i pass all of them to stripe?
    const handleCheckout= async() =>{
        // console.log(items);
        if(selectedCustomer.isMembership){
            navigate('/booking-success')
        }
        else{
        axios.post(`${url}/stripe/booking-checkout-session`,{
            basketItems,
        customerId: user.details.customerId
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=> console.log(err.message));
        }
    };

    return (
    <>
    <button onClick={()=> handleCheckout()}>Check out
    </button>
    </>

    );
    }

    export default PayButton