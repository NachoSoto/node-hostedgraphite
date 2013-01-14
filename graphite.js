"use strict"

var dgram = require('dgram');

var Graphite = function(apiKey) {
	this.apiKey = apiKey;
	this.port = 2003;
	this.host = 'carbon.hostedgraphite.com';

	this.client = dgram.createSocket('udp4');
};

Graphite.prototype.sendMetric = function(name, count, timestamp) {
	var metrics = {};
	var value;

	if (timestamp) {
		value = [count, timestamp];
	} else {
		value = count;
	}

	metrics[name] = value;

	this.sendMetrics(metrics);
};

Graphite.prototype.sendMetrics = function(metrics) {
	var metricNames = Object.keys(metrics);

	if (metricNames.length > 0) {
		var message = '',
			apiKey = this.apiKey;

		metricNames.forEach(function(key) {
			var value = metrics[key];

			var count, 
				timestamp;

			if (Array.isArray(value)) {
				count = value[0];
				timestamp = ' ' + value[1];
			} else {
				count = value;
			}

			message += apiKey + '.' + key + ' ' + value;

			if (timestamp) {
				message += timestamp;
			}

			message += "\n";
		});

		message = new Buffer(message);

		this.client.send(message, 0, message.length, this.port, this.host);
	}
};

module.exports = Graphite;