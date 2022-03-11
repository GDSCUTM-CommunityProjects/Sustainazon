class Response {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}

function errorHandler(error, defaultMsg = "Bad Request", defaultStatus = 400) {
  let message = defaultMsg;
  if (error.hasOwnProperty("message")) message = error.message;
  return new Response(defaultStatus, { message });
}

module.exports = { Response, errorHandler };
