const KiwigridApi = require('./api/KiwigridApi.js');

console.log('Welcome to the kiwigrid-cloud-ws-api interactive CLI.');

console.log(KiwigridApi);
const kiwigridApi = new KiwigridApi('wss://cloud.kiwigrid.com/websocket');
kiwigridApi.connect();
