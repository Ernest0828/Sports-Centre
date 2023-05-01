import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../../../context/Auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function MembershipSuccess() {

  const{user} = useContext(Auth);
  const navigate = useNavigate();
	const query = useQuery();
	const membershipType = query.get('membershipType');
	const location = useLocation();
	
	

	useEffect(() => {
		const searchParameter = new URLSearchParams(location.search);
		const success = searchParameter.get('success');

		if(!success){
			navigate("/pricing");	
		}
    const createMembership = async () => {
			try {
				const response = await axios.post(`http://localhost:4000/api/membership/buy/${user.details.customerId}`, {
					customerId: user.details.customerId,
					membershipType: membershipType,
				});
	
				console.log("Response data:", response.data);
	
				// Check response status for success or adjust the condition accordingly
				if (response.status === 200) {
					console.log("Membership created successfully");
					alert("Congratulations on becoming a member!");
				} else {
					console.log("Failed to create membership");
					alert("Membership sign Up unsuccessful!");
				}
			} catch (error) {
				console.error("Error:", error.message);
				alert("An error occurred while signing up for membership.");
			}
		};
  
    createMembership();
  }, []);


	return (
    <div><Navbar/>
			<div className="div">MembershipSuccess</div>
		</div>
  )
}

export default MembershipSuccess