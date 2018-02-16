const DeviceService = require('./DeviceService');

class GetDevices extends DeviceService {
  constructor(accessToken, replyAddress, action, params) {
    super(accessToken, replyAddress, 'GetDevices', params);
  }
}
