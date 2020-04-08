const dgram = require('dgram');
const toHost = '0.0.0.0';
const toPort = 4000;
const client = dgram.createSocket('udp4');

const dataIdx = 1;
let sum = '';

for(let i=0; i<9216; i++) {
  sum += dataIdx.toString();
}

const data = Buffer.from(sum);

client.send(data, toPort, toHost, (err) => {
  if (err) console.log(err);
  else console.log('ok');
  client.close();
});