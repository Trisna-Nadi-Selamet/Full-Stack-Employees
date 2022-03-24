modelu.exports = (req, res, next) => {
  const { status, message, errmessage, data } = success;

  res(status).send({
    status: status,
    message: message,
    errmessage: errmessage,
    timestamp: Date.now(),
    path: req.originalUrl,
    data: data,
  });
};
