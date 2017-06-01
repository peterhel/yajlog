exports.configure = function (config) {
    const log4js = require('log4js');

    log4js.configure({
        replaceConsole: true,
        levels: {
            '[all]': 'INFO'
        },
        appenders: [{
            type: __dirname + '/appender.js',
            tokens: config.tokens
        }]
    });
}
