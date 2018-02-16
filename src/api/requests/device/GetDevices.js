const DeviceService = require('./DeviceService');

class GetDevices extends DeviceService {
  constructor(accessToken, replyAddress) {
    super(accessToken, replyAddress, 'getDevices', {
      filter: {
        'deviceModel.deviceClass': 'com.kiwigrid.devices.location.Location'
      },
      projection: { tagValues: { AddressLocation: 1 } }
    });
  }
}

module.exports = GetDevices;
