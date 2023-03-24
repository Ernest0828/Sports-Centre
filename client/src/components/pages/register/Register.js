import React,{Fragment} from "react";
import "./register.css";
import { Link} from "react-router-dom";
import axios from "axios";


const Register = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const details = event.target;
      
        const data = {
          name: details.elements.name.value,
          number: details.elements.number.value,
          email: details.elements.email.value,
          password: details.elements.password.value,
        };
      
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', data);
          console.log(response.data); // Print the response from the server
          // Redirect to login page or show a success message
        } catch (error) {
          console.error(error.response.data); // Print the error message from the server
          // Show an error message to the user
        }
    };
      
    return (
        <Fragment>
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">GymCorp</h3>
                    <span className="registerDesc">Log in or register and start booking with GymCorp!</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <span className="registerBoxDesc">Create an account</span>
                        <input name="name" placeholder="Name" className="registerInput"/>
                        <input name="number" placeholder="Number" className="registerInput"/>
                        <input name="email" type="email" placeholder="Email" className="registerInput"/>
                        <input name="password" type="password" placeholder="Password" className="registerInput"/>
                        <input type="password" placeholder="Retype your password" className="registerInput"/>
                        {/*Temporary link to profile until we get dashboard*/}
                        <button className="registerButton" type="submit">Sign Up</button>
                        <Link to="/login" className="registerLoginButton">
                            <button className="buttonInLink">Login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
    );
};
export default Register;

