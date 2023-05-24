require("dotenv").config();

module.exports = {
    development:
        process.env.REACT_APP_MONGO_URI,
    secretOrKey:
        process.env.REACT_APP_JWT_SECRET,
  };