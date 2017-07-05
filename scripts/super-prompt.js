var prompt = require('prompt');
var Promise= require('bluebird');
var crypto = require('../api/lib/crypto');
var winston= require('winston');



module.exports = {

  getMongoProps: function(){
    winston.info('Please provide full path to MongoDB Home');
    var me = this, schema = {
      properties: {
        // path: {
        //   description: 'MONGO_HOME',
        //   required: true
        // },
        dbname: {
          description: 'DB_NAME(storm)',
          required: false
        }
      }
    };

    prompt.start();
    return new Promise(function(resolve, reject){
        prompt.get(schema,function(err,result){
            if (err) {
              reject(err);
            }else{
              resolve(result);
            }
        });
    });

  },

  getSuperUser: function(){

    winston.info('Please provide SuperUser info');

    var me=this,schema = {
        properties: {
            username: {
                pattern: /^[a-zA-Z\-]+$/,
                message: 'Name must be only letters or dashes',
                required: true
            },
            password1: {
                description: 'Enter your password',
                hidden: true,
                required: true
            },
            password2: {
                description: 'Re-enter your password',
                hidden: true,
                required: true,
                message: 'Passwords do not match!',
                conform: function (password2) {
                    var password1 = prompt.history('password1').value;
                    return password1 == password2;
                }
            },
            email: {
                pattern : /^\w+@[a-zA-Z0-9_.+-]+?\.[a-zA-Z]{2,3}$/,
                message: 'A valid email is required.',
                required: false
            }
        }
    };
    prompt.start();

    return new Promise(function(resolve, reject){
        prompt.get(schema,function(err,result){
            if (err) {
                reject(err);
            }else{
                var pwhash = crypto.hash(result.password1)
                resolve({
                    username    : result.username,
                    email       : result.email,
                    name        : 'Super User',
                    password    : pwhash
                });
            }
        });
    });
  }

};
