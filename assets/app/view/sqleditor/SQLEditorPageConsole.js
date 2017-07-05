Ext.define('App.view.sqleditor.SQLEditorPageConsole',{
    extend: 'Ext.tab.Panel',
    xtype : 'sqleditorpageconsole',


    tabPosition : 'left',
    tabRotation : 0,
    height      : 200,
    title       : 'Console',
    header      : false,
    
    items : [
        {
            iconCls     : 'speech-bubble-white',
            listeners   : {
                activate: function(me){
                    me.setIconCls('speech-bubble-white');
                },
                deactivate: function(me){
                    me.setIconCls('speech-bubble');
                }
            }
        },
        {
            xtype       : 'grid',
            iconCls     : 'grid',
            listeners   : {
                activate: function(me){
                    me.setIconCls('grid-white');
                },
                deactivate: function(me){
                    me.setIconCls('grid');
                }
            }
        }
    ]
    
});