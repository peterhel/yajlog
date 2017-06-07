# yajlog - Yet another json logger

A lib that wraps log2js and adds a default json appender.

    const yajlog = require('yajlog');
    
    yajlog.configure({
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
