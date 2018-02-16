const WebSocket = require('ws');

const GetDevices = require('./requests/device/GetDevices');

const Answer = require('./answers/Base');

class KiwigridApi {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;

    this.sendPing = this.sendPing.bind(this);
  }

  connect() {
    this.wsClient = new WebSocket(this.wsUrl);

    this.wsClient.on('open', () => this.onOpen());
    this.wsClient.on('close', (code, reason) => this.onClose(code, reason));

    this.wsClient.on('message', message => this.onMessage(message));
  }

  onOpen() {
    console.log('Connected to ' + this.wsClient.url);

    this.pingInterval = setInterval(this.sendPing, 5000);
  }

  onClose(code, reason) {
    console.log('Connection closed, code=' + code + ', reason=' + reason);

    clearInterval(this.pingInterval);
  }

  onMessage(msg) {
    console.log('Msg:' + msg);

    if (msg === 'o') {
      this.sendPing();
      this.send(
        new GetDevices(
          'accessToken',
          'a6b1a152-dbc8-48a6-b261-d9aa8c53b03e'
        )
      );
      return;
      /* this.sendRaw(
        '["{\\"type\\":\\"send\\",\\"address\\":\\"deviceservice\\",\\"body\\":{\\"action\\":\\"getDevices\\",\\"params\\":{\\"filter\\":{\\"deviceModel.deviceClass\\":\\"com.kiwigrid.devices.location.Location\\"},\\"projection\\":{\\"tagValues\\":{\\"AddressLocation\\":1}}},\\"accessToken\\":\\"eyJjbGllbnRfaWQiOiJraXdpZ3JpZC5kZXNrdG9wIiwidXNlcl9pZCI6IlBWQmFlcnRzY2hpIiwiY2xpZW50X3R5cGUiOiJhcHBsaWNhdGlvbiIsInNlc3Npb25faWQiOiI0OWJiNGY1Ni04YmE1LTQxYjQtYjI4Ny02ODU4NzMwNTdhZDAiLCJzZXNzaW9uIjp7InR5cGUiOiJub3JtYWwifSwic2NvcGUiOlsibWFuYWdlX2RldmljZXMiLCJyZWFkX2FwcF9pbmZvIiwicmVhZF90YWd2YWx1ZV9oaXN0b3J5IiwicmVhZF91c2VycyIsIm1hbmFnZV91c2VycyIsInJlYWRfZGV2aWNlcyIsImVzX2JpbmRfZW0iLCJkZWxldGVfdXNlcnMiLCJlc19yZWFkX2VtcyJdLCJleHBpcmF0aW9uIjoxNTE4Nzg4MjI3MTcxLCJjaGFubmVsIjoic29sYXJ3YXR0IiwiYWNjZXNzaWJsZV9jaGFubmVscyI6WyJzb2xhcndhdHQiXX0uTE44ZElLcVdCVG9uZnd1NnRVWHBrOXhFSHZ3PQ\\"},\\"replyAddress\\":\\"a6b1a152-dbc8-48a6-b261-d9aa8c53b03e\\"}"]'
      ); */
    }

    if (msg.startsWith('a[')) {
      const parsed = new Answer(msg);
      console.log(parsed);
    }
  }

  onError(err) {
    console.log('Err:' + err);
  }

  sendRaw(msg) {
    console.log('Send:' + msg);
    this.wsClient.send(msg);
  }

  send(request) {
    this.sendRaw(request.convertToMessage());
  }

  sendPing() {
    this.sendRaw('["{\\"type\\":\\"ping\\"}"]');
  }
}

module.exports = KiwigridApi;
