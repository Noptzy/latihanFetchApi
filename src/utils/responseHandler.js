class responseHandler {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
  static success(message = 'success', data = null) {
    return new responseHandler(true, message, data);
  }
  static error(message = 'error', data = null) {
    return new responseHandler(false, message, data);
  }

  toJSON(){
    return {
        success: this.statusCode,
        message : this.message,
        data: this.data?.data || this?.data,
    }
  }
}

module.exports = responseHandler;
