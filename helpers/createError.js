const messages = {
  400: 'Bad Request',
  401: '401 Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

module.exports.createError = (status, message = messages[status]) => {
  const newError = new Error(message);
  newError.status = status;
  return newError;
};
