var Promise = require('bluebird');
var SSHClient = require('ssh2').Client;
var NodeJDBC = require('nodejdbc');
var ConnectionType = require('../constants/ConnectionType.js');
var JDBC = require('../constants/JDBC.js');

module.exports = {

    findAll: function() {
        return Connection.find();
    },

    find : function(id) {
        return Connection.find(id);
    },

    findByName: function(name){
        return Connection.findByName(name);
    },


    create : function(c){
        return Connection.create(c);
    },

    update : function(c){
        var id = c.id;
        return Connection.update(id,c);
    },


    destroy: function(id){
        return Connection.destroy(id);
    },

    save: function(connections){
        return Connection.find().then((_connections)=>{
            return Promise.all(_.map(connections,function(connection){

                var c = _.find(_connections,{name:connection.name});

                if(c){
                    return Connection.update(c.id,connection).then(()=>{
                        return Connection.findOne(c.id);
                    });
                }else{
                    return Connection.create(connection);
                }
            }));
        });
    },



    test : function(c) {
        var me = this;

        if (c.connectionType.toUpperCase() == ConnectionType.SSH.toUpperCase()){
            return me.testSSHConnection(c);
        }else if(c.connectionType.toUpperCase() == ConnectionType.DB.toUpperCase()){
            return me.testDBConnection(c);
        }else if(c.connectionType.toUpperCase() == ConnectionType.Local.toUpperCase()){
            return Promise.resolve(true);
        }
    },

    testDBConnection: function(c) {
        if(_.isEmpty(c.className) && !JDBC.Vendor.findByUrl(c.url)){
            throw 'Can not resolve className for '+c.url;
        }

        var className = c.className;

        if (_.isEmpty(className)){
            var vendor = JDBC.Vendor.findByUrl(c.url);
            if(vendor){
                className = _.first(vendor.className);
            }
        }

        var config = {
            url: c.url,
            username : c.username,
            password : c.password,
            className: className
        };

        var connect = (driver)=>{
            config.libs = driver;
            var nodeJDBC = new NodeJDBC(config);
            return nodeJDBC.getConnection().then((connection)=>{
                connection.close();
                return true;
            });
        };

        return JDBC.getDriver().then(connect);
    },

    testSSHConnection : function(c){

        var ssh = undefined;

        var connection = {
            host     : c.url,
            port     : c.port,
            username : c.username,
            password : c.password
        };

        return new Promise(function(fulfill,reject){
            ssh = new SSHClient();
            ssh.on('ready',function(){
                fulfill();
                ssh.end();
            }).on('error', function(e){
                console.log(e);
                reject(e);
            }).connect(connection);
        });
    }


};
