    import React from "react";
    import axios from "axios";

    function CommentTile(props) {
        const username = props.username;
        const comment = props.comment;
        const createdAt = props.createdAt;
        const updatedAt = props.updatedAt;
        const id = props.id;
        const userId = props.userId;
        const course = props.course;
        const professor = props.professor;
        const letterGrade = props.letterGrade;
        const handleCommentDelete = props.handleCommentDelete;
        const handleCommentEdit = props.handleCommentEdit;

        const date = createdAt ? createdAt.slice(0, 10) : "";
        const time = createdAt ? createdAt.slice(11, 19) : "";

        return (
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 border-2 border-purple-900 w-auto overflow-auto">
                <div className="flex justify-between mb-4">
                    <p className="text-lg font-bold">@{username}</p>
                    {id === userId && (
                        <div className="flex space-x-2">
                            <button className="bg-green-900 text-white font-bold py-2 px-4 rounded-full" onClick = {handleCommentEdit}>
                                Edit
                            </button>
                            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick = {handleCommentDelete}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="mb-2">
                    <p className="text-lg">{comment}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm font-bold">Course: {course}</p>
                        <p className="text-sm font-bold">Professor: {professor}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold">Grade: {letterGrade}</p>
                        <div>
                            <p className="text-sm font-bold">
                                Date: {date} {time}
                            </p>
                            {updatedAt !== createdAt && (
                                <p className="text-xs font-bold border-2 border-purple">
                                    Edited
                                </p>
                            )}    
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

    export default CommentTile;
