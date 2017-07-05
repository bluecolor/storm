Ext.define('App.view.navigator.navsession.NavSessionMenu',{
    extend : 'Ext.menu.Menu',
    xtype  : 'navsessionmenu',

    items  : [
        {
            text : 'Refresh',
            name : 'refresh'
        },'-',
        {
            text : 'Play',
            name : 'play',
            iconCls : 'play'
        },
        {
            iconCls : 'pause',
            text : 'Pause',
            name : 'pause'
        },
        {
            text : 'Replay',
            name : 'replay',
            iconCls : 'replay'
        },'-',
        {
            name : 'allSessions',
            text : 'All Sessions',
            iconCls : 'glasses-blue'
        }
    ],

    setDisabled: function(){

        var items = this.items.items;
        _.each(items,function(item){
            item.setDisabled(true);
        });
    },

    setState: function(status){

        this.down('[name=play]').setDisabled(status!=Constants.Status.PAUSED);
        this.down('[name=pause]').setDisabled(
            [Constants.Status.RUNNING,Constants.Status.READY].indexOf(status)<0);
        this.down('[name=replay]').setDisabled(status != Constants.Status.COMPLETED);
    }


});