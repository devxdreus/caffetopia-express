const { User } = require('../models');
const response = require('../services/response');
const getUsername = require('../services/getUsername');

async function showProfile(req, res) {
  try {
    const username = getUsername(req);
    const user = await User.findOne({
      where: {
        username,
      },
    });
    const role = user.isAdmin ? 'Admin' : 'Member';
    const data = {
      username: user.username,
      email: user.email,
      role,
    }
    response(200, true, data, 'User profile', res);
  } catch (error) {
    response(500, false, error, 'Server Error', res);
  }
}

module.exports = { showProfile };