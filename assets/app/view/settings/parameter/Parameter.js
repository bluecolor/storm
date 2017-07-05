Ext.define('App.view.settings.parameter.Parameter',{
    extend: 'Ext.window.Window',
    xtype: 'parameter',

    requires : [
        'App.view.settings.parameter.ParameterController',
        'App.view.settings.parameter.ParameterModel',
        'App.view.settings.parameter.ParameterList',
        'App.view.settings.parameter.ParameterDetail'
    ],

    controller : 'parameter',
    viewModel  : 'parameter',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Parameters',

    items : [
        {
            xtype       : 'parameterlist',
            region      : 'west',
            width       : 300,
            split       : true,
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            header      : false
        },
        {
            xtype : 'parameterdetail',
            region: 'center'
        }

    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.size;
            }
        }
    },

    setValues : function(p){
        this.clear();
        if(!p){
            return this;
        }
        this.down('parameterdetail').setValues(p);
        return this;
    },

    getValues : function(){
        return this.down('parameterdetail').getValues();
    },

    clear : function(){
        this.down('parameterdetail').clear();
        return this;
    },

    setReadOnly : function(b){
        b = b==undefined?true:b;
        this.down('toolbar[name=tbar] [name=save]').setVisible(!b);
        this.down('parameterdetail').setReadOnly(b);
        return this;
    },

    view : function(p){
        return this.setValues(p).setReadOnly().show();
    },

    edit : function(p){
        return this.setValues(p).setReadOnly(false).show();
    },

    create : function(){
        this.clear().setReadOnly(false).show();
    }

});
