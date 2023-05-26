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
        commentID,
      } = props;

    const date = createdAt ? createdAt.slice(0, 10) : "";
    const time = createdAt ? createdAt.slice(11, 19) : "";

    const updateDate = updatedAt ? updatedAt.slice(0, 10) : "";
    const updateTime = updatedAt ? updatedAt.slice(11, 19) : "";


    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => {
        setShowEdit(true);
    }
    

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
        const [formValue, setFormValue] = useState(comment);
        const handleChange = (e) => {
            setFormValue(e.target.value);
        }

        const handleCommentEdit = (commentData) => {
            console.log("Editing comment with ID:", commentID);
            console.log("New comment data:", commentData);

            axios
                .put(`http://localhost:8082/API/comments/${commentID}`, {comment: commentData})
                .then((response) => {
                    console.log(response);
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log("Error in CommentEdit!", err.response.data);
                    console.log("Error details:", err);
                });

            window.location.reload();    
            
        };
    
        return (
            <>
                <Modal
                    show = {showEdit}
                    onHide = {handleEditClose}
                    size = "lg"
                    aria-labelledby = "contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id = "contained-modal-title-vcenter">
                            Edit Comment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId={formValue}>
                                <Form.Label>Edit Comment</Form.Label>
                                <Form.Control as="textarea" rows={3} value={formValue} onChange={handleChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            handleEditClose();
                            handleCommentEdit(formValue);
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
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
