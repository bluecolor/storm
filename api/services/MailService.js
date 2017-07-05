
var mailer      = require('nodemailer'),
    Promise     = require('bluebird'),
    AppParams   = require('../constants/AppParams'),
    smtpTransport = require('nodemailer-smtp-transport');


var MailService = {

    transport : {
        host: 'undefined',
        port: 0,
        auth: {
            user: 'storm@bluecolor.io',
            pass: ''
        }
    },


    isMailServerDefined: function(){
        return AppConf.find({parameter:AppParams.MAIL_SERVER}).then(confs=>{
            if(_.isEmpty(confs)){
                return false;
            }
            return confs[0].value != undefined;
        });
    },

    _getTransport : function(){
        return AppConf.find({parameter:AppParams.MAIL_SERVER}).then(confs=>{

            if(confs && confs[0] && confs[0].value){
                var ms = confs[0].value;
                var transport =  {
                    host: ms.host,
                    port: ms.port,
                    secure: true,
                    auth: {
                        user: ms.username,
                        pass: ms.password
                    }
                };

                return smtpTransport(transport);
            }
        });
    },

    send : function(m){
        var me = this;

        return me._getTransport().then(transport=>{
            var t = mailer.createTransport(transport);
            return new Promise(function(fulfill, reject) {
                t.sendMail(m,(e,i)=>{
                    if (e)
                        reject(e);
                    else
                        fulfill(i.response);
                });
            });
        });

    },


    test: function(ms,email){
        var me=this;
        var transport =
            smtpTransport({
                host: ms.host,
                port: ms.port,
                secure: ms.secure != undefined ? ms.secure:true ,
                auth: {
                    user: ms.username,
                    pass: ms.password
                }
            });

        var t = mailer.createTransport(transport);

        var m = {
            from: 'storm ✔ <storm@bluecolor.io>',
            to  : email,
            subject: 'Success : Storm Mail Server works!',
            text: 'Do not reply this message'
        };

        return new Promise(function(fulfill, reject) {
            t.sendMail(m,(e,i)=>{
                if (e)
                    reject({response:e});
                else
                    fulfill({response : i.response});
            });
        });
    }


};

module.exports = MailService;

