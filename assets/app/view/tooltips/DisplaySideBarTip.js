Ext.define('App.view.tooltips.DisplaySideBarTip',{
    extend: 'Ext.tip.ToolTip',
    xtype : 'displaysidebartip',

    closable        : true,
    anchor          : 'top',
    anchorToTarget  : true,
    autoHide        : true,
    alwaysOnTop     : true,
    cls             : 'app-tip',
    shadow          : false,
    dismissDelay    : 5000,
    width           : 175,

    listeners: {
        hide: function(){
            this.setTarget(undefined);
        }
    },

    constructor: function(){

        var me = this;
        me.html =
            "Use <img src='../resources/img/menu-16.png'/> for more actions";
            //"<span>Use for more actions</span>";
        this.callParent(arguments);
    }
});