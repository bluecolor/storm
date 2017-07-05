var crypto = require('./scripts/crypto');
var _ = require('lodash');

if(_.isEmpty(process.argv) || process.argv.length < 3){
    winston.error('No argument is given!');
    winston.info('Valid format is. encrypt [texts with space]');
    winston.info('eg. encrypt secret1 secret2');
    throw "Invalid input exception";
}

crypto.encode(_.slice(process.argv,2));