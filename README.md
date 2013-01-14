node-hostedgraphite
===================

Simple client for hostedgraphite

Usage:
```javascript
var Graphite = require('hostedgraphite');

var graphite = new Graphite(API_KEY);

graphite.sendMetric('metricName.metricOne', 10);
graphite.sendMetric('metricName.metricOne', 10, 1358193723);
graphite.sendMetrics({
    'metricName.metricOne': 10,
    'metricName.metricTwo': 53,
    'someOtherMetric': 1,
});
graphite.sendMetrics([
    {
        'name'      : 'metricName.metricOne',
        'count'     : 10,
        'timestamp' : 1358193723,
    },
    {
        'name'      : 'metricName.metricTwo',
        'count'     : 53,
        'timestamp' : 1358193892,
    },
    {
        'name'      : 'someOtherMetric',
        'count'     : 1,
        'timestamp' : 1358199265,
    },
]);
```