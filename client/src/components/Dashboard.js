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

        const handleCommentDelete = (commentId) => {
            console.log("Deleting comment with ID:", commentId);

            if (window.confirm("Are you sure you want to delete this comment?")) {
                console.log("Deleting comment with ID:", commentId);
            } else {
                return;
            }

            axios
                .delete(`http://localhost:8082/API/comments/${commentId}`)
                .then((response) => {
                    const newComments = comments.filter((comment) => comment._id !== commentId);
                    setComments(newComments);
                })
                .catch((err) => {
                    console.log("Error in CommentDelete!", err.response.data);
                    console.log("Error details:", err);
                });
        };

        const handleCommentEdit = (commentId, commentData) => {
            console.log("Editing comment with ID:", commentId);
            console.log("New comment data:", commentData);

            var newComment = window.prompt("Edit comment:", commentData.comment);

            if (newComment !== null) { 
                commentData.comment = newComment;
            }

            axios
                .put(`http://localhost:8082/API/comments/${commentId}`, commentData)
                .then((response) => {
                    const newComments = comments.map((comment) => {
                        if (comment._id === commentId) {
                            comment.course = commentData.course;
                            comment.professor = commentData.professor;
                            comment.letterGrade = commentData.letterGrade;
                            comment.comment = commentData.comment;
                        }
                        return comment;
                    });
                    setComments(newComments);
                })
                .catch((err) => {
                    console.log("Error in CommentUpdate!", err.response.data);
                    console.log("Error details:", err);
                });
        };


    return (
        <div>
            <NavBar id = {id} handleCommentSubmit = {handleCommentSubmit} />
            <h1 className = "text-4xl text-center mt-10 font-bold text-purple-900">Welcome, {username}</h1>
            <h4 className = "text-2xl text-center mt-10 font-bold text-purple-900">
                Welcome to RateMyProf, the best place to rate your classes!
            </h4>
            <h2 className = "text-2xl text-center mt-10 font-bold text-purple-900">
                Your Comments
            </h2>
            <div className="grid grid-cols-5 gap-4 px-5">
            {comments.map((comment) => (
                <CommentTile
                    key={comment._id}
                    comment={comment.comment}
                    username={username}
                    id={id}
                    userId={comment.userId}
                    course={comment.course}
                    professor={comment.professor}
                    letterGrade={comment.letterGrade}
                    createdAt={comment.createdAt}
                    updatedAt={comment.updatedAt}
                    handleCommentEdit={() => handleCommentEdit(comment._id, comment)}
                    handleCommentDelete={() => handleCommentDelete(comment._id)}
                />
            ))}
            </div>
        </div>
    );
}


export default Dashboard;