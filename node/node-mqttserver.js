/*
 * @Author: [JokerChen]
 * @Date: 2020-11-21 13:03:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-21 13:10:43
 * @Description: 
 */
var mosca = require('mosca');
var ascoltatore = {
  //using ascoltatore
  //type: 'mongo',
  //url: 'mongodb:////127.0.0.1:1883/mqtt',
  //pubsubCollection: 'ascoltatori',
  //mongo: {}
};
var settings = {
  port: 1883,
  backend: ascoltatore
};
var server = new mosca.Server(settings);
server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});
// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Published', packet.payload);
});
server.on('ready', setup);
// fired when the mqtt server is ready
function setup () {
  console.log('Mosca server is up and running');
}
