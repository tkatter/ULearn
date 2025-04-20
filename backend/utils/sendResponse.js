// Allowed options
// results: Number, message: String, token: String, data: Object

class SendResponse {
  constructor(res, statusCode = 200, options = {}) {
    this.res = res;
    this.statusCode = statusCode;

    Object.keys(options).forEach(el => {
      this[el] = options[el];
    });

    if (this.statusCode.toString().startsWith('2')) {
      this.status = 'success';
    } else {
      this.status = 'fail';
    }
  }

  send() {
    this.res.status(this.statusCode).json({
      status: this.status,
      token: this.token,
      results: this.results,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = SendResponse;
