const dgram = require('dgram');
const toHost = '0.0.0.0';
const toPort = 4000;
const client = dgram.createSocket('udp4');

const data = 'aaa';

client.send(data, 0, data.length, toPort, toHost, (err) => {
  if(err) console.log(err);
  client.close();
});