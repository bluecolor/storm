Ext.define('App.view.widget.SessionCombo',{
    extend: 'Ext.form.field.ComboBox',
    xtype : 'sessioncombo',

    editable    : false,
    emptyText   : 'Select a session',
    queryMode   : 'local',
    displayField: 'shortName',
    valueField  : 'id',
    matchFieldWidth: true,
    status      : undefined,

    listConfig  : {
        getInnerTpl: function() {
            var img = '<img src="resources/img/status/{status}-16.png" title="{status}" align="center">';
            return img + ' {shortName}';
        }
    },
    setStatusStyle : function(status) {
        if(status) {
            this.status = status;

            if(!this.inputEl){
                this.on('afterrender',function(c){
                    c.setStatusStyle(status);
                },this,{single:true});
            }else{
                this.inputEl.setStyle({
                    'background-image':    'url(resources/img/status/'+status+'-16.png)',
                    'background-repeat':   'no-repeat',
                    'background-position': '3px center',
                    'padding-left':        '25px'
                });
            }
        }
    },
    clear: function(){
        if(this.inputEl){
            this.inputEl.setStyle({
                'background-image': 'none',
                'padding-left':'5px'
            });
        }
        this.clearValue();
    },
    listeners : {
        select: function (c, r) {
            this.fireEvent('navsessionselect',r.data.id);
            c.setStatusStyle(r.get('status'));
        }
    },

    constructor: function(){
        var me = this;
        me.callParent(arguments);

        var store = Ext.getStore(Constants.Store.SESSION);

        store.on('datachanged', function(){
            if(store.getCount() == 0){
                me.clear();
            }
        });

        var setStyle = function(s){
            var id = me.getValue();
            if(id){
                var r = s.getById(me.getValue());
                if(r){
                    var status = r.get('status');
                    if(me.status!= status){
                        me.setStatusStyle(status);
                    }
                }
            }
        };

        store.on('update',function(s){setStyle(s);});
        store.on('load',function(s){setStyle(s);});
    }


});