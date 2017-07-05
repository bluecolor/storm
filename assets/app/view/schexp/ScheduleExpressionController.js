Ext.define('App.view.schexp.ScheduleExpressionController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.scheduleexpression',
    
    onTestExpression: function(){
        var exp = this.lookupReference('Expression').getValue(),
            expType = this.lookupReference('ExpressionType').getValue();

        switch (expType){
            case 'Text': this.onTestTextExpression(exp); break;
            case 'Cron': this.onTestCronExpression(exp);break;
        }

    },

    onTestTextExpression: function(exp){
        var result = this.lookupReference('TestResult');
        var sch = later.parse.text(exp);
        if(sch.error == -1){
            result.success('Expression is Valid');
        }else{
            result.error('Expression is NOT Valid! Error at {}'.format(sch.error));
        }
    },

    onTestCronExpression: function(exp){
        var result = this.lookupReference('TestResult'),
            promise= App.lib.Ajax.testCronExpression(exp);

        promise.success(function(r){
            if(r.success == true){
                result.success('Expression is Valid');
            }else{
                result.error('Expression is NOT Valid!');
            }
        });
    }
});