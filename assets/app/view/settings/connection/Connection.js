Ext.define('App.view.settings.connection.Connection',{
    extend: 'Ext.window.Window',
    xtype: 'connection',

    requires : [
        'App.view.settings.connection.ConnectionController',
        'App.view.settings.connection.ConnectionModel',
        'App.view.settings.connection.ConnectionList',
        'App.view.settings.connection.ConnectionDetail'
    ],

    controller : 'connection',
    viewModel  : {type:'connection'},

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Connection',

    items : [
        {
            xtype       : 'connectionlist',
            region      : 'west',
            width       : 300,
            split       : true,
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            header      : false
        },
        {
            xtype       : 'connectiondetail',
            region      : 'center',
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false
        }
    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = 3;
            }
        },
        show: 'onShowConnection'
    },


    setReadOnly : function(b){
        b = b == undefined ? true:b;
        this.down('connectiondetail').setReadOnly(b);
        return this;
    },

    setValues : function(c){
        this.down('connectiondetail').setValues(c);
        return this;
    },

    getValues : function(){
        return this.down('connectiondetail').getValues();
    },

    view : function(c){
        if(!c){
            this.setReadOnly().show();
            return;
        }
        return this.setValues(c).setReadOnly().show();
    },
    edit : function(c){
        return this.setValues(c).setReadOnly(false).show();
    },
    create : function(c){
        this.down('connectiondetail').clear();
        return this.show();
    }

});
