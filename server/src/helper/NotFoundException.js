module.exports = function NotFoundException() {
  this.status = 404;
  this.errmessage = 'User Not Found';
  this.message = 'Missing parameter(s)!';
};
