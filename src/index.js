const KiwigridApi = require('./api/KiwigridApi.js');

console.log('Welcome to the kiwigrid-cloud-ws-api interactive CLI.');

const kiwigridApi = new KiwigridApi(
  'wss://cloud.kiwigrid.com/kiwibus/1/1/websocket',
  'username',
  'password'
);
kiwigridApi.connect();
