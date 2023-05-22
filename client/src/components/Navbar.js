import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function NavBar(props) {


    function StringCleanUp(string) {
        return string.replace(/[^0-9a-z]/gi, '').toUpperCase();
    }
    const userId = props.id;
    const navigate = useNavigate();
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState('');
    const [course, setCourse] = useState('');
    const [professor, setProfessor] = useState('');
    const [letterGrade, setLetterGrade] = useState('A');
    const [showAlert, setShowAlert] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        navigate('/');
    };

    const handleCommentSubmit = () => {
        console.log("Comment submitted");
        if (comment === "" || course === "" || professor === "") {
            setShowAlert(true);
            console.log("Missing comment data");
        } else {

            comment = StringCleanUp(comment);
            course = StringCleanUp(course);
            professor = StringCleanUp(professor);
            
            const commentData = {
                comment: comment,
                course: course,
                professor: professor,
                letterGrade: letterGrade,
                userId: userId
            };
            
            console.log("Comment data:", commentData);

            axios
                .post("http://localhost:8082/API/comments", commentData)
                .then(() => {
                    setComment('');
                    setCourse('');
                    setProfessor('');
                    setLetterGrade('A');
                    setShowCommentBox(false);
                    setShowAlert(false);
                }
                )
                .catch((err) => {
                    console.log("Error in CommentCreate!", err.response.data);
                    console.log("Error details:", err);
                });
        }
        
    };

    return (
        <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">RateMyProf</span>
                </a>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/dashboard" className="block py-2 pl-3 pr-4 m-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link to="/search" className="block py-2 pl-3 pr-4 m-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Search</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="block py-2 pl-3 pr-4 m-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="block py-2 pl-3 pr-4 m-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</button>
                        </li>
                        <button 
                            type="button" 
                            onClick={() => setShowCommentBox(true)}
                            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Leave a comment
                        </button>
                        {showCommentBox && 
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
                                    <div className="bg-white p-5 rounded-lg w-1/4 flex flex-col items-center border-purple-900 border-8">
                                        <h1 className="text-4xl font-bold mb-5 text-purple-900">Leave a comment</h1>
                                        <label className="text-left text-lg font-bold mb-2 w-full px-1">Course</label>
                                        <input className="w-full mb-5 border border-gray-200 rounded-lg p-2 shadow-lg" placeholder="i.e: CSCE412" type="text" value={course} onChange={e => setCourse(e.target.value)} />
                                        <label className="text-left text-lg font-bold mb-2 w-full px-1">Professor</label>
                                        <input className="w-full mb-5 border border-gray-200 rounded-lg p-2 shadow-lg" placeholder="i.e: Dr. John Doe" type="text" value={professor} onChange={e => setProfessor(e.target.value)} />
                                        <label className="text-left text-lg font-bold mb-2 w-full px-1">Letter Grade</label>
                                        <select className="w-full mb-5 border border-gray-200 rounded-lg p-2 shadow-lg" value={letterGrade} onChange={e => setLetterGrade(e.target.value)}>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="F">F</option>
                                            <option value="Q">Q</option>
                                        </select>
                                        
                                        <label className="text-left text-lg font-bold mb-2 w-full px-1">Comment</label>
                                        <textarea 
                                            value={comment} 
                                            onChange={e => setComment(e.target.value)} 
                                            placeholder="Leave your comment here..."
                                            className="w-full h-24 mb-10 border border-gray-200 rounded-lg p-2 shadow-lg"
                                        />
                                        {
                                            showAlert && (
                                                <div className="bg-red-500 text-white px-4 py-3 rounded relative" role="alert">
                                                    <strong className="font-bold">Oops!</strong>
                                                    <span className="block sm:inline"> Please fill in all fields!</span>
                                                </div>
                                            )
                                        }
                                        <div className="flex justify-between w-full">
                                            <button onClick={handleCommentSubmit} className="bg-purple-500 text-white px-4 py-2 rounded mt-2">Submit comment</button>
                                            <button onClick={() => {setShowCommentBox(false); setShowAlert(false)}} className="bg-purple-500 text-white px-4 py-2 rounded mt-2">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            }
                    </ul>
                </div>
            </div>
        </nav>
        
    );
}

export default NavBar;