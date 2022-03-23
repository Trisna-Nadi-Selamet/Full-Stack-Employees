module.exports = (err, req, res, next) => {
  return res.status(err.status).send({
    status: err.status,
    errmessage: err.errmessage,
    message: err.message,
    timestamp: Date.now(),
    path: req.originalUrl,
  });
};
