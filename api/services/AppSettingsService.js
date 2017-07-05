module.exports = {


    find: function(param) {
        return AppSettings.find({parameter: param}).then(s=> {
            return s[0].value;
        });
    }
    //,
    //
    //find : function(){
    //    return AppSettings.find();
    //},
    //
    //save : function(settings){
    //    return Settings.find().then(function(s){
    //        if(s.length>0){
    //            return AppSettings
    //                .update(s[0].id,settings).then(()=>{
    //                    return AppSettings.findOne(s[0].id);
    //                });
    //        }
    //        return AppSettings.create(settings);
    //    });
    //},
    //
    //testMailServer: function(ms,email){
    //    return MailService.test(ms,email);
    //}
};