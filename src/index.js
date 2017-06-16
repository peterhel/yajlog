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

exports.withTrace = function (rootDir) {
    let version;

    rootDir || console.error(`'rootDir' was not given. Using ${__dirname}.`);

    const dirRx = new RegExp(rootDir);

    try {
        version = require(path.join(rootDir || __dirname, 'package.json')).version;
    } catch (error) {
        console.error('Version could not be read from package.json.');
        version = '0.0.0';
    }

    log4js.configure({
        replaceConsole: true,
        levels: {
            '[all]': 'INFO'
        },
        appenders: [{
            type: __dirname + '/appender.js',
            tokens: {
                version,
                source: function () {
                    // The caller:
                    let stack = (new Error).stack.split("\n");
                    stack.push(__dirname)

                    let row;
                    stack = stack.filter(_row => {
                        return dirRx.test(_row) && !nmRx.test(_row);
                    });
                    const rxresult = rx.exec(stack[1]);
                    const module = (rxresult && rxresult.length > 1) ? rxresult[2] : ''
                    return module.replace(__dirname, '.');
                }
            }
        }],
    });
}
