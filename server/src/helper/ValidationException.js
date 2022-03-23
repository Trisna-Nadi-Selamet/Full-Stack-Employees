module.exports = function ValidationException(errors) {
  this.status = 400;
  this.errmessage = 'Invailid Data Request';
  this.message = 'Missing parameter(s)!';
  this.errors = errors;
};
