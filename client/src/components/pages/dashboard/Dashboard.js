import React,{Fragment} from "react";
import {useContext} from "react";
import {Auth} from "../../../context/Auth";

const Dashboard = () => {
    const {dispatch } = useContext(Auth);

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <button onClick={ ()=> dispatch({type: "LOGOUT"})}>Logout</button>
        </Fragment>
    );
};
export default Dashboard;


