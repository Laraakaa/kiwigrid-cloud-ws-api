const KiwigridApi = require('./api/KiwigridApi.js');

console.log('Welcome to the kiwigrid-cloud-ws-api interactive CLI.');

const kiwigridApi = new KiwigridApi(
  'wss://cloud.kiwigrid.com/kiwibus/877/f3mbz81x/websocket'
);
kiwigridApi.connect();
