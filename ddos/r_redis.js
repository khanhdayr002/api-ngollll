const redis = require('redis')
const client = redis.createClient({
            //host: 'https://Nodejs.tuanvudev2.repl.co',
            port: 4000
        });

        client.on("error", function(err) {
            console.log("Error " + err);
        });

        client.on("connect", function(err) {
            console.log("Ready ");
        });
       // return client;

module.exports = client;