import React from "react";

function CommentTile(props) {
	const comment = props.comment;
	const username = props.username;
	const course = props.course;
	const professor = props.professor;
	const letterGrade = props.letterGrade;
	const id = props.id;

	return (
		
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
