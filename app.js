const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const user = require('./routes/API/users');

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/API/users', user);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));