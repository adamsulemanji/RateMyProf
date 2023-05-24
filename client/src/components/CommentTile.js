import React from "react";

function CommentTile(props) {

    const comment = props.comment;
    const username = props.username;
    const course = props.course;
    const professor = props.professor;
    const letterGrade = props.letterGrade;
    const id = props.id;

	return (
		// <div className="flex justify-center">
		// 	<div className="w-1/2 bg-white shadow-md rounded pt-6 pb-8 mb-4">
        //         <div className="mb-4">
		// 			<label className="block text-gray-700 text-sm font-bold mb-2">
		// 				Username and ID
		// 			</label>
		// 			<p className="text-gray-700 text-base">{username} and {id}</p>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label className="block text-gray-700 text-sm font-bold mb-2">
		// 				Course
		// 			</label>
		// 			<p className="text-gray-700 text-base">{course}</p>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label className="block text-gray-700 text-sm font-bold mb-2">
		// 				Professor
		// 			</label>
		// 			<p className="text-gray-700 text-base">{professor}</p>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label className="block text-gray-700 text-sm font-bold mb-2">
		// 				Letter Grade
		// 			</label>
		// 			<p className="text-gray-700 text-base">
		// 				{letterGrade}
		// 			</p>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label className="block text-gray-700 text-sm font-bold mb-2">
		// 				Comment
		// 			</label>
		// 			<p className="text-gray-700 text-base">{comment}</p>
		// 		</div>
		// 	</div>
		// </div>

        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 border-2 border-purple-900 w-auto overflow-auto">
            <div className="flex justify-between">
                <p className="text-lg font-bold">@{username}</p>
                <p className="text-lg font-bold">Grade: {letterGrade}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
                <p className="text-lg font-bold">{course}</p>
                <p className="text-lg font-bold">{professor}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-start">
                <p className="text-lg font-bold">Comment: {comment}</p>
            </div>
        </div>



	);
}

export default CommentTile;
