const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Professor = require('../../models/Professor');

router.get('/test', (req, res) => res.send('professor route testing!'));

router.get('/', (req, res) => {
    Professor.find()
        .then(professor => res.json(professor))
        .catch(err => res.status(404).json({ noprofessorsfound: 'No Professors found' }));
});

router.get('/:id', (req, res) => {
    Professor.findById(req.params.id)
        .then(professor => res.json(professor))
        .catch(err => res.status(404).json({ noprofessorfound: 'No Professor found' }));
});

router.put('/:id', (req, res) => {
    Professor.findByIdAndUpdate(req.params.id, req.body)
        .then(professor => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    Professor.findByIdAndRemove(req.params.id, req.body)
        .then(professor => res.json({ mgs: 'Professor entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a professor' }));
});

router.post("/", (req, res) => {
    console.log("ProfessorCreate route accessed");
    
    if (req.body.name === "") {
        return res.status(400).json({ error: 'Name cannot be empty' });
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    else if (req.body.email !== "" && req.body.confirmEmail) {
        return res.status(400).json({ error: 'Emails do not match' });
    }
    else {
        Professor.findOne({ username: req.body.username, email: req.body.email, phone: req.body.phone })
            .then((professor) => {
                if (professor)
                    return res.status(400).json({ error: 'Professor already exists' });
                else {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(req.body.password, salt);
                    req.body.password = hash;

                    const newProfessor = new Professor({
                        name: req.body.name,
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        phone: req.body.phone,
                        department: req.body.department,
                        numRatings: 0,
                        sumRatings: 0
                    });

                    newProfessor.save()
                        .then(professor => res.json(professor))
                        .catch(err => res.status(400).json({ error: 'Unable to add this professor' }));
                }
            })
        }


});

router.put('/rating/:id', (req, res) => {
    Professor.findById(req.params.id)
        .then(professor => {
            professor.numRatings += 1;
            professor.sumRatings += req.body.rating;
            professor.save()
                .then(professor => res.json(professor))
                .catch(err => res.status(400).json({ error: 'Unable to update this professor' }));
        })
        .catch(err => res.status(404).json({ error: 'No such a professor' }));
});

module.exports = router;