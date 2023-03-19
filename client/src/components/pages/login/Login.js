import React,{Fragment} from "react";
import "./login.css";
import { Link} from "react-router-dom";


const Login = ({setAuth}) => {
    return (
        <Fragment>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3 className="loginLogo">GymCorp</h3>
                        <span className="loginDesc">Log in or register and start booking with GymCorp!</span>
                    </div>
                    <div className="loginRight">
                        <div className="loginBox">
                            <span className="loginBoxDesc">Login</span>
                            <input placeholder="Email" className="loginInput"/>
                            <input placeholder="Password" className="loginInput"/>
                            <Link to = "/dashboard">
                                <button className="loginButton" onClick={()=>setAuth(true)}>Log In</button>
                            </Link>
                            <span className="loginForgot">Forgot Password?</span>
                            <Link to = "/register">
                                <button className="loginRegisterButton">Create a New Account</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Login tutorial  */}
        </Fragment>
    );
};
export default Login;