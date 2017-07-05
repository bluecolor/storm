Ext.define('App.view.pool.combo.SearchCombo',{
    extend      : 'Ext.form.ComboBox',
    xtype       : 'searchcombo',

    typeAhead   : true,
    editable    : true,
    queryMode   : 'local',

    displayField: 'name',
    valueField  : 'id',

    hideTrigger : true,

    listConfig: {
        loadingText : 'Searching...',
        emptyText   : 'No matching record found!'
    },

    constructor : function(){
        var me = this;
        me.callParent(arguments);
        me.on('afterrender',function(c){
            c.inputEl.on('keypress',function(e) {
                if(e.keyCode === 13 ){
                    me.fireEvent('enterkeypress', me, e);
                }
            });
        });
    },

    minChars  : 0,
    queryParam: 'q'

});
