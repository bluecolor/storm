Ext.define('App.view.widget.TechnoCombo',{
    extend  : 'Ext.form.field.ComboBox',
    xtype   : 'technocombo',

    name    : 'technoCombo',
    editable: false,

    valueField  : 'id',
    displayField: 'name',
    width   : 300,

    constructor: function(){
        var me = this;
        me.callParent(arguments);
        var store = Ext.create('Ext.data.Store',{
            fields: [{name:'name',type:'string'},{name:'id',type:'string'}],
            data  : [
                {
                    name: 'OS',
                    id  : Constants.Technology.OS
                },
                {
                    name: 'JavaScript',
                    id  : Constants.Technology.JAVA_SCRIPT
                },
                {
                    name: 'CoffeeScript',
                    id  : Constants.Technology.COFFEE_SCRIPT
                },
                {
                    name: 'Python',
                    id  : Constants.Technology.PYTHON
                },
                {
                    name: 'Ruby',
                    id  : Constants.Technology.RUBY
                },
                {
                    name: 'PL/SQL',
                    id  : Constants.Technology.PLSQL
                }
            ]
        });
        me.bindStore(store);

        me.on('select',function(c,r){
            var tc = Ext.ComponentQuery.query('technocombo');
            _.each(tc,function(combo){
                if(combo.getValue()!=r.get('id')){
                    combo.select(r);
                }
            });
        });
    }



});