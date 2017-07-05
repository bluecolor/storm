var ProgressBar = require('progress');
var Promise = require('bluebird');
var winston = require('winston');

module.exports = {



    random : function (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    },

    progress: function(){

        var me = this;





        return new Promise(function(fulfill,reject){
            try{
                var white = '\u001b[47m \u001b[0m';
                var green = '\u001b[42m \u001b[0m';

                var bar = new ProgressBar(' [:bar] :percent :etas', {
                    complete: green,
                    incomplete: white,
                    total: 60
                });

                var id = setInterval(()=>{
                    bar.tick();
                    if (bar.complete) {
                        clearInterval(id);
                        fulfill()
                    }
                }, me.random(350,500));
            }catch(e){
                reject(e);
            }
        });
    }
};