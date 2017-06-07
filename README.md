# yajlog

A lib that wraps log2js and adds a default json appender.

    const log2json = require('../dist');
    
    log2json.configure({
        tokens: {
            devs: 'are kings',
            nerds: () => {
                return 'are gods';
            }
        }
    });
    
    console.log('test', {
        property: 'goes here!'
    }, "test2")
