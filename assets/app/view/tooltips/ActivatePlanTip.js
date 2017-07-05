Ext.define('App.view.tooltips.ActivatePlanTip',{
    extend: 'Ext.tip.ToolTip',
    xtype : 'activateplantip',

    closable        : false,
    anchor          : 'left',
    anchorToTarget  : true,
    autoHide        : false,
    alwaysOnTop     : true,
    cls             : 'app-tip',
    shadow          : false,
    dismissDelay    : 10000,

    constructor: function(){
        var me = this;
        me.html = "Activate plan after creating tasks";
        this.callParent(arguments);
    }
});