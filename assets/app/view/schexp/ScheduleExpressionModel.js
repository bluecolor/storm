Ext.define('App.view.schexp.ScheduleExpressionModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.scheduleexpression',

    stores: {
        expressionType: {
            autoLoad: true,
            fields: [{name:'name'}],
            data  : [{name:'Text'},{name:'Cron'}]  
        },
        cron: {
            autoLoad: true,
            fields: [
                {name:'name', type:'string'},
                {name:'required', type:'boolean'},
                {name:'allowedValues', type:'string'},
                {name:'allowedSpecialChars', type:'string'}
            ],
            data: [
                {name:'Seconds',required:true,allowedValues:'0-59',allowedSpecialChars:', - * /'},
                {name:'Minutes',required:true,allowedValues:'0-59',allowedSpecialChars:', - * /'},
                {name:'Hours',required:true,allowedValues:'0-23',allowedSpecialChars:', - * /'},
                {name:'Day of month',required:true,allowedValues:'0-31',allowedSpecialChars:', - * ? / L W'},
                {name:'Month',required:true,allowedValues:'	1-12 or JAN-DEC',allowedSpecialChars:', - * /'},
                {name:'Day of week',required:true,allowedValues:'1-7 or SUN-SAT',allowedSpecialChars:', - * ? / L #'},
                {name:'Year',required:false,allowedValues:'empty, 1970-2099',allowedSpecialChars:', - * /'}
            ]
        }
    }

});