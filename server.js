var Bumble = require('bumble');
var ElectricFence = require('electricfence');
var Good = require('good');
var Hapi = require('hapi');
var Jade = require('jade');
var config = require('getconfig');

var viewOptions = {
    engines: {
        jade: Jade
    },
    isCached: config.getconfig.env !== 'production',
    path: 'views'
};

var server = new Hapi.Server(config.host, config.port);

server.views(viewOptions);

server.pack.register([
    {
        plugin: Good,
        options: config.good
    }, {
        plugin: Bumble,
        options: config.bumble
    }, {
        plugin: ElectricFence,
        options: config.electricfence
    }
], function startServer(err) {
    if (err) { throw err; }
    server.start(function main(err) {
        if (err) { throw err; }
        server.log(['info'], 'ampersandjs blog running on ' + server.info.host + ':' + server.info.port);
    });
});

