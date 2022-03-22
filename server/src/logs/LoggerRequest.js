module.exports = (req, res, next) => {
  console.log('running Logger the middleware ' + '|', req.method + '| URL :', req.originalUrl);
  next();
};
