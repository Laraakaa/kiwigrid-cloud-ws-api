const Base = require('./Base');

class Service extends Base {
  constructor(address, replyAddress, accessToken, body) {
    super('send');

    this.address = address;
    this.replyAddress = replyAddress;
    this.body = {
      accessToken,
      ...body
    };
  }
}

module.exports = Service;
