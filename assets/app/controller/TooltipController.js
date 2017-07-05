Ext.define('App.controller.TooltipController', {
    extend: 'Ext.app.Controller',

    views : [
        'App.view.tooltips.AddSchedulerTip',
        'App.view.tooltips.AddConnectionTip',
        'App.view.tooltips.DisplaySideBarTip'
    ],

    refs: [
        {
            ref         : 'addSchedulerTip',
            xtype       : 'addschedulertip',
            selector    : 'addschedulertip',
            autoCreate  : true
        },
        {
            ref         : 'addConnectionTip',
            xtype       : 'addconnectiontip',
            selector    : 'addconnectiontip',
            autoCreate  : true
        },
        {
            ref         : 'displaySideBarTip',
            xtype       : 'displaysidebartip',
            selector    : 'displaysidebartip',
            autoCreate  : true
        }
    ],

    init: function() {
        this.listen({
            controller: {
                '*': {
                    'addschedulertip'   : this.onAddSchedulerTip,
                    'addconnectiontip'  : this.onAddConnectionTip,
                    'displaysidebartip' : this.onAddSideBarTip
                }
            }
        });
    },

    onAddSchedulerTip: function(o){
        var tip = this.getAddSchedulerTip();
        tip.setTarget(o.target.getId());
        tip.show();
    },

    onAddConnectionTip: function(o){
        var tip = this.getAddConnectionTip();
        tip.setTarget(o.target.getId());
        tip.show();
    },

    onAddSideBarTip: function(o){
        var tip = this.getDisplaySideBarTip();
        tip.setTarget(o.target.getId());
        tip.show();
    }

});