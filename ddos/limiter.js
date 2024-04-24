//const client = require('./r_redis')

global.client = new Object({
    ip: new Map(),
    max: new Map(),
    time: new Map()
});

  const {ip, max, time} = global.client;
  


module.exports = {
  incr,
  expire,
  ttl
}