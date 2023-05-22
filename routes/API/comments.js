const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const Comment = require('../../models/Comment');

router.get('/test', (req, res) => res.send('comment route testing!'));


router.get('/', (req, res) => {
    Comment.find()
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nocommentsfound: 'No Comments found' }));
});

router.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nocommentfound: 'No Comment found' }));
});

router.put('/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
        .then(comment => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, req.body)
        .then(comment => res.json({ mgs: 'Comment entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a comment' }));
});

router.post("/", (req, res) => {
    console.log("CommentCreate route accessed");
    

    const newComment = new Comment({
        userId: req.body.userId,
        course: req.body.course,
        professor: req.body.professor,
        comment: req.body.comment,
        letterGrade: req.body.letterGrade
    });

    newComment.save()
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json({ error: 'Unable to add this comment' }));
});

router.get('/professor/:id', (req, res) => {
    Comment.find({ professor: req.params.id })
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nocommentsfound: 'No Comments found' }));
});

router.get('/course/:id', (req, res) => {
    Comment.find({ course: req.params.id })
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nocommentsfound: 'No Comments found' }));
});

module.exports = router;

