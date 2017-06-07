# yajlog - Yet another json logger

A lib that wraps log2js and adds a default json appender.

Made it for simple use. You can log strings and object in any order. Objects will be printed in the `data` property and strings (appended with space) in the `message` property.

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
