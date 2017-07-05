var Promise = require('bluebird');
var fs = require('fs');

module.exports = {

    DRIVER_PATH : __dirname + '/../../driver/',

    Vendor: {

        SQL_SERVER: {
            className: ['com.microsoft.jdbc.sqlserver.SQLServerDriver']
        },

        ORACLE: {
            className: ['oracle.jdbc.driver.OracleDriver']
        },

        POSTGRES: {
            className: ['org.postgresql.Driver']
        },

        SQLITE  : {
            className: ['org.sqlite.JDBC']
        },

        findByUrl: function(url){

            var me = this;
            if(url.indexOf('oracle')>-1){
                return me.ORACLE;
            }
            if(url.indexOf('sqlserver')>-1){
                return me.SQL_SERVER;
            }

            if(url.indexOf('postgresql')>-1){
                return me.POSTGRES;
            }

            if(url.indexOf('sqlite')>-1){
                return me.SQLITE;
            }

        }
    },

    /**
     * todo this can be cached
     * @returns {*}
     */
    getDriver: function(){
        var me = this;
        return new Promise(function(fulfil,reject){
            fs.readdir(me.DRIVER_PATH,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    fulfil(result.map(jar => me.DRIVER_PATH+jar));
                }
            });
        });
    }
};