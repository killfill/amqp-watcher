#!/usr/bin/env node

var amqpWatcher = require('../lib'),
	comm = require('commander'),
	url = require('url');

function list(val) {
	return val.split(':');
}

comm
	.version('0.0.1')
	.option('-s, --server <servername>', 'Hostname of the server [localhost]', 'localhost')
	.option('-u, --url <url>', 'Url to connect to. For example amqp://user:pass@localhost:port/vhost]', 'amqp://localhost')

	.option('-e, --exchange <name:type:durable>', 'Exchange type to bind to [amq.topic:topic:true]', list)
	.option('-b, --body <topic:text>', 'Send a message with the specified body. Will quit after', list)
	.option('-k, --key [routing key]', 'Set the value of the routing key [#]', '#')
	.option('-r, --repeat <n>', 'Repeat the msg n times [1]', 1)
	.parse(process.argv);

//Default values
comm.listen = comm.listen && '#';
comm.exchange = comm.exchange || [];
comm.durable = comm.exchange[2] == 'true';
comm.url = url.parse(comm.url.replace('localhost', comm.server));

//Exchange options
comm.exchange = {
	name: comm.exchange[0],
	options: {type: comm.exchange[1], durable: comm.durable}
}

amqpWatcher.create(comm).connect(function(err, w) {
	
	if (err) return console.log(err);

	if (comm.body) {
		for (var i=0; i<comm.repeat; i++)
			w.exchange.publish(comm.key, comm.body);
			
		//TODO: exit after publishing!
	}
	
	var qName = 'watcher-' + Math.random() * 999999;
	var q = w.conn.queue(qName, {exclusive: true}, function() {
		q.bind(w.exchange, comm.key);
		q.subscribe(function(msg) {
			console.log(msg)
		})
	})	
})

process.on('uncaughtException', function(err) {
	console.log('uncaughtException', err.stack);
	process.exit(2);
});
