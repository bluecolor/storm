Ext.define('App.lib.Ajax', {
    singleton: true,
    alternateClassName : ['Ajax'],

    testCronExpression: function(exp){
        return $.ajax({
            type        : 'GET',
            url         : 'app/test/cron/{}'.format(exp),
            contentType : 'application/json',
            dataType    : 'json'});
    }
});
