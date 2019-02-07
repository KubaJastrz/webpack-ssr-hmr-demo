const clientDevConfig = require('./webpack.dev.config');
const serverConfig = require('./webpack.server.config');

module.exports = [
    { name: 'client', ...clientDevConfig },
    { name: 'server', ...serverConfig },
];
