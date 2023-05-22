import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const navigate = useNavigate();

    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gradYear: "",
        major: "",
        classification: "",
        permissions: "user"
    });
  
    const onChange = (e) => {
        console.log("Form input changed");
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {

        console.log("Form submitted");
        console.log("Form data:", formInput);

        e.preventDefault();

        axios
          .post("http://localhost:8082/API/users", formInput)
          .then(() => {
            setFormInput({
                username: "",
                password: "",
                confirmPassword: "",
                email: "",
                confirmEmail: "",
                phone: "",
                gradYear: "",
                major: "",
                classification: "",
            });
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log("Error in UserCreate!", err.response.data);
            console.log("Error details:", err);
          });
      };
    

    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to="/" className="flex items-center mb-6 text-7xl font-semibold text-purple-900">RateMyProf</Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create a new account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit = {onSubmit}>
                                <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="confirmEmail" className="block mb-2 text-sm font-medium text-gray-900">Confirm email</label>
                                    <input type="confirmEmail" name="confirmEmail" id="confirmEmail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                    <input type="tel" name="phone" id="phone" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="gradYear" className="block mb-2 text-sm font-medium text-gray-900">Graduation Year</label>
                                    <input type="text" name="gradYear" id="gradYear" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="major" className="block mb-2 text-sm font-medium text-gray-900">Major</label>
                                    <input type="text" name="major" id="major" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div>
                                    <label for="classification" className="block mb-2 text-sm font-medium text-gray-900">Classification</label>
                                    <input type="text" name="classification" id="classification" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={onChange}></input>
                                </div>
                                <div className="flex items-center justify-between">
                                    <input className=" block w-full bg-purple-900 text-white p-3 rounded-lg font-bolded" type = "Submit"/>
                                </div>
                                <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                                    Already have an account? <Link to="/" className="text-slate-900">Sign in</Link>
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

export default Signup;
