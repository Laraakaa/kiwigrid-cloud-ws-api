const Service = require('../Service');

class DeviceService extends Service {
  constructor(accessToken, replyAddress, action, params) {
    super('deviceservice', replyAddress, accessToken, {
      action,
      params
    });
  }
}
const data = {
  type: 'send',
  address: 'deviceservice',
  body: {
    action: 'getDevices',
    params: {
      filter: { 'deviceModel.deviceClass': 'com.kiwigrid.devices.location.Location' },
      projection: { tagValues: { AddressLocation: 1 } }
    },
    accessToken: 'accessToken'
  },
  replyAddress: 'a6b1a152-dbc8-48a6-b261-d9aa8c53b03e'
};

module.exports = DeviceService;
