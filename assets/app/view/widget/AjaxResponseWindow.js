Ext.define('App.view.widget.AjaxResponseWindow', {

    extend  : 'Ext.window.Window',
    xtype   : 'ajaxresponsewindow',

    requires: [
        'App.view.widget.AjaxResponseGrid'
    ],

    modal       : true,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 800,
    height      : 500,
    resizable   : false,
    layout      : 'fit',
    title       : 'Server Response Details',
    iconCls     : '',
    frame       : false,

    items:[
        { xtype : 'ajaxresponsegrid',header:false}
    ],

    listeners : {
        show : function(){
            var size = Ext.getBody().getViewSize();
            this.setHeight(.6 * size.height );
            this.setWidth (.4 * size.width );
            this.alignTo(this.container, 'c-c');
        }
    }


});
