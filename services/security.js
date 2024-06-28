const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryption = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const compare = async (inputPassword, password) => {
  return bcrypt.compare(inputPassword, password);
}

const getAccessToken = (username) => {
  const token = jwt.sign({ username: username }, process.env.JWT_SCREET, {
    expiresIn: '20s',
  });
  return token;
}

const getRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SCREET, {
    expiresIn: '1d',
  });
}

// secure: true

module.exports = { encryption, compare, getAccessToken, getRefreshToken };