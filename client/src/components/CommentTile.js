import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function CommentTile(props) {
    return (
        <div className = "flex justify-center">
            <div className = "w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className = "mb-4">
                    <label className = "block text-gray-700 text-sm font-bold mb-2">
                        Course
                    </label>
                    <p className = "text-gray-700 text-base">
                        {props.course}
                    </p>
                </div>
                <div className = "mb-4">
                    <label className = "block text-gray-700 text-sm font-bold mb-2">
                        Professor
                    </label>
                    <p className = "text-gray-700 text-base">
                        {props.professor}
                    </p>
                </div>
                <div className = "mb-4">
                    <label className = "block text-gray-700 text-sm font-bold mb-2">
                        Letter Grade
                    </label>
                    <p className = "text-gray-700 text-base">
                        {props.letterGrade}
                    </p>
                </div>
                <div className = "mb-4">
                    <label className = "block text-gray-700 text-sm font-bold mb-2">
                        Comment
                    </label>
                    <p className = "text-gray-700 text-base">
                        {props.comment}
                    </p>
                </div>
            </div>
        </div>
    );

}

export default CommentTile;
