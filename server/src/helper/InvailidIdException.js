module.exports = function InvailidIdException() {
  this.status = 400;
  this.errmessage = 'Invailid ID';
  this.message = 'Missing parameter(s)!';
};
