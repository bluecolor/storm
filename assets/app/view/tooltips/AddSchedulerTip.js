Ext.define('App.view.tooltips.AddSchedulerTip',{
    extend: 'Ext.tip.ToolTip',
    xtype : 'addschedulertip',

    closable        : true,
    anchor          : 'bottom',
    anchorToTarget  : true,
    autoHide        : true,
    alwaysOnTop     : true,
    cls             : 'app-tip',
    shadow          : false,
    dismissDelay    : 5000,

    listeners: {
        hide: function(){
            this.setTarget(undefined);
        }
    },

    constructor: function(){

        var me = this;
        me.html =
            "You don't have any scheduler!<br>" +
            "Press <img src='../resources/img/plus-16.png'/> to create scheduler.";

        this.callParent(arguments);
    }
});