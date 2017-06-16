const log4js = require('log4js');
const path = require('path');
const nmRx = new RegExp('node_modules/');
const rx = /(\(|)([^\s]+?)\d/;

exports.configure = function (config) {
    config = config || {};
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

exports.withTrace = function (rootDir, config) {
    config = config || {};

    rootDir = rootDir || __dirname;

    const dirRx = new RegExp(rootDir);

    config.tokens.source = function () {
        // The caller:
        let stack = (new Error).stack.split("\n");

        let row;
        stack = stack.filter(_row => {
            return dirRx.test(_row) && !nmRx.test(_row);
        });

        const rxresult = rx.exec(stack[stack.length - 1]);
        const module = (rxresult && rxresult.length > 1) ? rxresult[2] : ''
        return module.replace(rootDir, '.');
    }

    exports.configure(config);
}
