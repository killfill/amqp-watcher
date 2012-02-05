var amqp = require('amqp');

Watcher = function(opts) {
	this.config = opts;
}

exports.create = function(conf) {
	return new Watcher(conf);
}

Watcher.prototype.connect = function(cb) {

	this.conn = amqp.createConnection(this.config);

	var that = this,
		conf = this.config;

	this.conn.on('ready', function() {
		that.exchange = that.conn.exchange(conf.exchange.name, conf.exchange.options);
		cb(null, that);
	});

	this.conn.on('error', function(err) {
		//TODO: this happends when conn.end(). how to avoid it?
		if (err.code=='EPIPE') return;
		cb(err);
	});

}

exports._class = Watcher;
