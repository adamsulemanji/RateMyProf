import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useState, useEffect } from "react";

function CommentTile(props) {
    const {
        username,
        comment,
        createdAt,
        updatedAt,
        id,
        userId,
        course,
        professor,
        letterGrade,
        handleCommentDelete,
        handleCommentUpdate,
      } = props;

    const date = createdAt ? createdAt.slice(0, 10) : "";
    const time = createdAt ? createdAt.slice(11, 19) : "";

    const updateDate = updatedAt ? updatedAt.slice(0, 10) : "";
    const updateTime = updatedAt ? updatedAt.slice(11, 19) : "";


    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [localComment, setLocalComment] = useState(comment);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => {
        setEditComment(comment);
        setShowEdit(true);
    }

    useEffect(() => {
        setLocalComment(comment); // update local comment state when props.comment changes
      }, [comment]);

    const handleCommentEdit = () => {
    axios
        .put(`http://localhost:8082/API/comments/${id}`, { comment: localComment })
        .then((response) => {
        props.handleCommentUpdate(id, { comment: localComment }); // call parent's update function
        })
        .catch((err) => {
        console.log("Error in CommentUpdate!", err.response.data);
        console.log("Error details:", err);
        });
    };


    function DeleteConfirm() {
        return (
            <>
                <Modal 
                    show={showDelete}
                    onHide={handleDeleteClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id = "contained-modal-title-vcenter">
                            Delete Comment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => {
                            handleCommentDelete(id);
                            handleDeleteClose();
                        }}>
                            Delete Comment
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    function EditComment() {
        return (
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                value={localComment} 
                                onChange={(e) => setLocalComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCommentEdit();
                        handleEditClose();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 border-2 border-purple-900 w-auto overflow-auto">
            <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">@{username}</p>
                {id === userId && (
                    <div className="flex space-x-2">
                        <button className="bg-green-800 text-white font-bold py-2 px-4 rounded-full" onClick = {handleEditShow}>
                            Edit
                        </button>
                        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full" onClick = {handleDeleteShow}>
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
                            Created At: {date} {time}
                        </p>
                        {updatedAt !== createdAt && (
                            <p className="text-xs font-bold border-2 border-purple-900 rounded-lg w-1/2 justify-center flex items-center">
                                Edited
                            </p>
                        )}    
                    </div>
                </div>
            </div>
            <DeleteConfirm />
            <EditComment />
        </div>
    );
}

export default CommentTile;
