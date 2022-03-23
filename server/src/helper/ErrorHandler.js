module.exports = (err, req, res, next) => {
  const { status, message, errmessage, errors } = err;
  let validation;
  if (errors) {
    validation = {};
    errors.forEach((error) => {
      validation[error.param] = error.msg;
      //console.log(validation);
    });
  }

  res.status(status).send({
    status: status,
    errmessage: errmessage,
    message: message,
    timestamp: Date.now(),
    path: req.originalUrl,
    validation,
  });
};
