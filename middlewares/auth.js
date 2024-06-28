const jwt = require("jsonwebtoken");
const response = require('../services/response');

// const auth = (req, res, next) => {
//   const token = req.cookies.token;
//   if(!token) return response(403, false, '', 'No token provided!', res);

//   jwt.verify(token, process.env.JWT_SCREET, (err, decoded) => {
//     if(err) return response(403, false, err, 'Unauthorized!', res);
//     req.username = decoded.username;
//     next();
//   });
// }

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if(token === null) return response(401, false, '', 'No token provided', res);
  jwt.verify(token, process.env.JWT_SCREET, (err, decoded) => {
    if(err) return response(403, false, err, 'Unauthorized!', res);
    req.username = decoded.username;
    next();
  });
}

module.exports = auth;