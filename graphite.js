"use strict"

var dgram = require('dgram');

var Graphite = function(apiKey) {
	this.apiKey = apiKey;
	this.port = 2003;
	this.host = 'carbon.hostedgraphite.com';

	this.client = dgram.createSocket('udp4');
};

Graphite.prototype.sendMetric = function(name, count, timestamp) {
	var metrics = {
		"name" : key,
		"count" : metrics[key],
		"timestamp" : timestamp, 
	};

	this.sendMetrics(metrics);
};

Graphite.prototype.sendMetrics = function(metrics) {
	if (Array.isArray(metrics)) {
		var message = '',
			apiKey = this.apiKey;

		metrics.forEach(function(metricObject) {
			var key = metricObject['name'],
				value = metricObject['count'],
				timestamp = metricObject || '';

			message += apiKey + '.' + key + ' ' + value + ' ' + timestamp + '\n';
		});

		message = new Buffer(message);

		this.client.send(message, 0, message.length, this.port, this.host);

	} else {
		var metricsArray;

		var metricNames = Object.keys(metrics);

		metricNames.forEach(function(key) {
			metricsArray.push({
				"name" : key,
				"count" : metrics[key],
			});
		});

		this.sendMetrics(metricsArray)
	}
};

module.exports = Graphite;