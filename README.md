node-hostedgraphite
===================

Simple client for hostedgraphite

Usage:
```javascript
var Graphite = require('hostedgraphite');

var graphite = new Graphite(API_KEY);

graphite.sendMetric('metricName.metricOne', 10);
graphite.sendMetrics({
    'metricName.metricOne': 10,
    'metricName.metricTwo': 53,
    'someOtherMetric': 1,
});
```