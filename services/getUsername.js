const jwt = require('jsonwebtoken');

const getUsername = (req) => {
  const token = req.header('authorization').split(' ');
  const { username } = jwt.verify(token[1], process.env.JWT_SCREET);
  return username;
}

module.exports = getUsername;