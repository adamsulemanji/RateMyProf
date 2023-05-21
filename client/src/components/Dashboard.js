import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


function Dashboard() {

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
      };


    const token = localStorage.getItem('jwtToken');
    const tokenPayload = parseJwt(token);

    const username = tokenPayload.username;
    const id = tokenPayload.id;

    

    return (
        <div>
            <h1>Welcome ! {username} with ID: {id}</h1>
        </div>
    );
}


export default Dashboard;