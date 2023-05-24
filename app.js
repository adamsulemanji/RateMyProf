const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const user = require('./routes/API/users');
const comment = require('./routes/API/comments');
const professor = require('./routes/API/professors');

const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./config/passport")(passport);


connectDB();

let environment = process.env.REACT_APP_NODE_ENV;
console.log("Application is running in " + environment + " mode");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/API/users', user);
app.use('/API/comments', comment);
app.use('/API/professors', professor);


const port = process.env.PORT || 8082;


if (environment === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));