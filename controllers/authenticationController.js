const { User } = require('../models');
const { encryption, compare, getAccessToken, getRefreshToken } = require('../services/security');
const response = require('../services/response');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const hashedPassword = await encryption(req.body.password);
    const user = {
      ...req.body,
      password: hashedPassword,
    };
    await User.create(user);
    response(201, true, user, 'User created successfully', res);
  } catch (error) {
    console.log(error);
    response(400, false, error, 'Failed to register new user', res);
  }
};

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    console.log(user);
    if(user) {
      const isValid = await compare(password, user.password);
      if(isValid) {
        const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SCREET, {
          expiresIn: '30s',
        });
        const refreshToken = jwt.sign({ username: user.username }, process.env.JWT_REFRESH_SCREET, {
          expiresIn: '1d',
        });
        await user.update({ refresh_token: refreshToken });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          // secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        const { username, email, role } = user;
        const data = {
          username,
          email,
          role,
          accessToken,
        } 
        return response(201, true, data, 'Authentication success', res);
      } else {
        return response(401, false, '', 'Authentication failed', res);
      }} else {
        return response(401, false, '', 'Authentication failed', res);
      }
    } catch (error) {
      response(401, false, error, 'Authentication failed', res);
  }
}

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return response(401, false, '', 'Authentication failed', res);
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if(!user) return response(403, false, '', 'Authentication failed', res);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SCREET, (err, decode) => {
      if(err) return response(403, false, err, 'Authentication failed', res);
      const username = user.username;
      const accessToken = jwt.sign({ username }, process.env.JWT_SCREET, {
        expiresIn: '30s',
      });
      const data = {
        roles: [user.role],
        accessToken,
      }
      return response(200, true, data, 'Token verified', res);
    });
  } catch (error) {
    return response(401, false, error, 'Authentication failed', res);
  }
}

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return response(204, false, '', 'Logout failed, token not found', res);
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if(!user) return response(204, false, '', 'Logout failed, something wrong with token', res);
    await user.update({ refresh_token: null });
    res.clearCookie('refreshToken');
    return response(200, true, '', 'Success Logout', res)
  } catch (error) {
    return response(500, false, error, 'Logout failed, something wrong with server', res);
  }
}

module.exports = { register, login, logout, refreshToken };