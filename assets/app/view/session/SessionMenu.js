Ext.define('App.view.session.SessionMenu',{
    extend : 'Ext.menu.Menu',
    xtype  : 'sessionmenu',

    items  : [
        {
            iconCls : 'pause',
            text : 'Pause',
            name : 'pause'
        },
        {
            text : 'Play',
            name : 'play',
            iconCls : 'play'
        },
        {
            text : 'Replay',
            name : 'replay',
            iconCls : 'replay'
        },'-',
        {
            name : 'view',
            text : 'View'
        },
        {
            name : 'parallel',
            text : 'Parallel'
        },
        {
            text : 'Delete',
            name : 'delete',
            iconCls : 'delete'
        }
    ],

    display : function(pos,status){
        var me = this;
        me.showAt(pos);
        if(status){
            me.setStateByStatus(status);
        }
        return me;
    },

    setStateByStatus : function(s){
        var S = Constants.Status;
        this.down('[name=pause]').setDisabled(!S.from(s).to(S.PAUSED));
        this.down('[name=play]').setDisabled(s!=Constants.Status.PAUSED);
        this.down('[name=delete]').setDisabled(s==S.RUNNING);
        this.down('[name=replay]').setDisabled(['COMPLETED','SUCCESS'].indexOf(s)== -1);
    }

});