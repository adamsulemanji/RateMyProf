import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import CommentTile from "../components/CommentTile";
import 'bootstrap/dist/css/bootstrap.min.css';


function Dashboard() {

    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const [comments, setComments] = useState([]);

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
      
            axios.get(`http://localhost:8082/API/comments/user/${tokenPayload.id}`)
              .then(response => {
                setComments(response.data);
              })
              .catch(err => {
                console.log(err);
              });
          }
        }, []);

        const handleCommentSubmit = (commentData) => {
            axios
              .post("http://localhost:8082/API/comments", commentData)
              .then(() => {
                setComments((prevComments) => [...prevComments, commentData]);
              })
              .catch((err) => {
                console.log("Error in CommentCreate!", err.response.data);
                console.log("Error details:", err);
              });
          };
        
    

    return (
        <div>
            <NavBar id = {id} handleCommentSubmit = {handleCommentSubmit} />
            <h1 className = "text-4xl text-center mt-10 font-bold text-purple-900">Welcome, {username}</h1>
            <h4 className = "text-2xl text-center mt-10 font-bold text-purple-900">
                Welcome to RateMyProf, the best place to rate your professors!
            </h4>
            <h2 className = "text-2xl text-center mt-10 font-bold text-purple-900">
                Your Comments
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {comments.map((comment) => (
                    <CommentTile course = {comment.course} professor = {comment.professor} letterGrade = {comment.letterGrade} comment = {comment.comment} />
                ))}
            </div>
        </div>
    );
}


export default Dashboard;