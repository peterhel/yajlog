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
}, "test2", { what: 'an object!' });
