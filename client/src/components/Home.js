import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

    const [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    });

    const onChange = (e) => {
        console.log("Form input changed");
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {

        // clear the local storage
        localStorage.clear();

        console.log("Form submitted");
        console.log("Form data:", user);


        e.preventDefault();
        const { userEmail, userPassword } = user; 
      
        try {
          const response = await axios.post("http://localhost:8082/API/users/login", {
            userEmail,
            userPassword,
          });
          
          if (response.data.success) {
            const { token, username } = response.data;
      
            // store the token in localStorage and use it for authenticated requests
            localStorage.setItem('jwtToken', token);
            
            // redirect to a protected route or homepage after login
            console.log("Login successful! with Username: ", username);
            navigate('/dashboard');
          }
        } catch (err) {
          console.error(err.response.data);
        }
      };

    return (
        <div>
            <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href = "/" className="flex items-center mb-6 text-7xl font-semibold text-purple-900">
                    RateMyProf    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="userEmail" id="userEmail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" onChange={onChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="userPassword" id="userPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange} />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className= " block w-full bg-purple-900 text-white p-3 rounded-lg font-bolded" onClick = {handleSubmit}> 
                                    Submit
                                </button>
                            </div>
                            <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                                Don't have an account yet? <Link to="/signupPage" className="text-slate-900">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-5">
                        &copy; 2023 All rights reserved. Created by Adam Sulemanji
                    </p>

                </div>
            </div>
            </section>
        </div>
    );
}

export default Home;
