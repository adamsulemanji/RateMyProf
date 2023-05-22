import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function Dashboard() {

    const [username, setUsername] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
        };

        const token = localStorage.getItem("jwtToken");
        const tokenPayload = parseJwt(token);

        if (tokenPayload) {
            setUsername(tokenPayload.username);
            setId(tokenPayload.id);
        }
    }, []);


    return (
        <div>
            <NavBar id = {id} />
            <h1 className = "text-4xl text-center mt-10 font-bold text-purple-900">Welcome, {username}</h1>
            <h4 className = "text-2xl text-center mt-10 font-bold text-purple-900">
                Welcome to RateMyProf, the best place to rate your professors!
            </h4>
            <h2 className = "text-2xl text-center mt-10 font-bold text-purple-900">
                Your Comments
            </h2>

            <div className = "flex justify-center">
            </div>

        </div>
    );
}


export default Dashboard;