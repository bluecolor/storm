var SessionManager = require('./SessionManager.js');
var Promise = require('bluebird');

module.exports = {

    start : function(){
        this.preStart().then(()=>{return SessionManager.start();});
    },

    preStart : function(){
        return Promise.resolve(SessionService.boot());
    }

};