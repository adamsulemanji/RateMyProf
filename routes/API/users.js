const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../../models/User');


router.get('/test', (req, res) => res.send('user route testing!'));

router.get('/', (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
        .then(user => res.json({ mgs: 'User entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a user' }));
});

router.post("/", (req, res) => {
    console.log("UserCreate route accessed");
    

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ password: "Passwords do not match" });
    }
    else if (req.body.email !== req.body.confirmEmail) {
        return res.status(400).json({ email: "Emails do not match" });
    }
    else {
        User.findOne({ username: req.body.username, email: req.body.email, phone: req.body.phone })
            .then((user) => {
                if (user) {
                    return res.status(400).json({ username: "Username already exists" });
                }
                else {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(req.body.password, salt);
                    req.body.password = hash;

                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        gradYear: req.body.gradYear,
                        major: req.body.major,
                        classification: req.body.classification,
                        permissions: req.body.permissions
                    });
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }
    
});


router.post('/login', (req, res) => {
    console.log("UserLogin route accessed");
    console.log("Form data within Route:", req.body);
    User.findOne({ email: req.body.userEmail })
      .then(user => {
        if (!user) {
          return res.status(404).json({ email: "Email not found" });
        }
        
        bcrypt.compare(req.body.userPassword, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user.id,
                username: user.username
              };
              
              jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
            } else {
              return res.status(400).json({ password: "Password incorrect" });
            }
          });
      });
  });


module.exports = router;

