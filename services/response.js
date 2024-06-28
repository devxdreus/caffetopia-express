const response = (statusCode, status, data, message, res) => {
  res.status(statusCode).json({
    status,
    payload: data,
    message,
  });
}

module.exports = response;