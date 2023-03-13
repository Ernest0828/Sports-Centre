import React,{Fragment} from "react";
import "./register.css";
import { Link} from "react-router-dom";


const Register = () => {
    return (
        <Fragment>
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">GymCorp</h3>
                    <span className="registerDesc">Log in or register and start booking with GymCorp!</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <span className="registerBoxDesc">Create an account</span>
                        <input  placeholder="Name" className="registerInput"/>
                        <input  placeholder="Number" className="registerInput"/>
                        <input type="email" placeholder="Email" className="registerInput"/>
                        <input type="password" placeholder="Password" className="registerInput"/>
                        <input type="password" placeholder="Retype your password" className="registerInput"/>
                        <button className="registerButton">Sign Up</button>
                        <button className="registerLoginButton">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    );
};
export default Register;

