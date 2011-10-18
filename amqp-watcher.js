var amqp = require('amqp'),
	comm = require('commander'),
	config = require('./config.js')


comm
	.version('0.0.1')
	.option('-h, --host [hostname]', 'Host', '127.0.0.1')
	.option('-p, --port <n>', 'Port', 5672, parseInt)
	.option('-u, --username [guest:guest]', 'Username and password', 'guest:guest')
	.option('-v, --vhost [/]', 'Virtual host', '/')
	.option('-e, --exchange [name:type]', 'Exchange:type to bind to [amq.topic:topic]', 'amq.topic:topic')
	.option('-b, --body []', 'Body of the msg sent to the exchange')
	.option('-l, --listen [routing key]', 'Listen to the exchange [#]')
	.option('-r, --repeat <n>', 'Repeat the msg n times [1]', 1)
	.parse(process.argv)

if (!comm.body && !comm.listen) {
	console.log('Publish or subscribe?...')
	process.exit(1);
}
if (comm.listen===true) comm.listen='#'

comm.exchangeName = comm.exchange.split(':')[0]
comm.exchangeType = comm.exchange.split(':')[1]
comm.user = comm.username.split(':')[0]
comm.pass = comm.username.split(':')[1]

console.log('Host: %s@%s:%s, Exchange: %s, Type: %s', comm.user, comm.host, comm.port, comm.exchangeName, comm.exchangeType)

var config = {
	host: comm.host,
	login: comm.user,
	password: comm.pass,
	vhost: comm.vhost
}

var conn = amqp.createConnection(config);

conn.on('ready', function() {
	console.log('Connection ok');
	var e = conn.exchange(comm.exchangeName, {type: comm.exchangeType});

	if (comm.body) {
		for (var i=0; i<comm.repeat; i++) {
			e.publish('holamundo', comm.body);
			console.log('.')
		}
		console.log('listo');
		setTimeout(function() {
			process.exit(0);
		}, 300)
		
	}
	
	if (comm.listen) {
		var qName = 'amqp-watcher-' + Math.random() * 99999;
		var q = conn.queue(qName, {exclusive: true}, function() {
			q.bind(e, comm.listen);
			q.subscribe(getMsg);
		})
	}
	
})

getMsg = function(msg, _, header) {
	
	var data = msg.data;
	
	try {
		data = JSON.parse(msg.data);
	}
	catch (err){}
	
	try {
		data = msg.data + ''
	}
	catch(err){}
	
	console.log(new Date(), data)
	console.log();
}

process.on('uncaughtException', function(err) {
	console.log('ERROR', err.stack);
	process.exit(2);
});