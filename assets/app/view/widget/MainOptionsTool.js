Ext.define('App.view.widget.MainOptionsTool', {
    extend  : 'Ext.panel.Tool',
    xtype   : 'mainoptionstool',

    id          : 'main-options-tool',
    type        : 'gear',
    tooltip     : 'Navigate',
    menuItems   : [
        {
            name    : '$signout$',
            iconCls : 'power-off',
            listeners : {
                afterrender : function(i) {
                    i.setTooltip('Role : '  + App.lib.User.role);

                    var text =  'Sign Out <span style="font-weight:bold">'
                        +   App.lib.User.username
                        +   '</span>';
                    i.setText(text);
                }
            }
        },
        {
            name    : 'home',
            text    : 'Home',
            iconCls : 'home'
        },
        {
            name    : 'labs',
            text    : 'Labs <span style="color:red;">beta</span>',
            iconCls : 'lab-green'
        },'-'
    ],

    constructor : function(){
        var me = this;
        me.callParent(arguments);

        me.on('click', function(t, e){

            var s = Ext.getStore(Constants.Store.SCHEDULER);
            var items = me.menuItems.slice(0);

            s.each(function(r) {
                items.push(
                    {
                        text    : r.get('name'),
                        name    : r.get('name'),
                        type    : 'sch',
                        icon    : Constants.Icon.getClockIconPathByStatus(r.get('status'))
                    }
                );
            });
            var menu =
                Ext.create('Ext.menu.Menu',{
                    items : items
                });
            menu.showAt(e.getXY());
            menu.on('click',function(m, i){

                if(i.name == '$signout$'){
                    me.fireEvent('signout');
                }

                if(i.type && i.type == 'sch'){
                    me.fireEvent('openscheduler', i.name);
                }
            });

        });

    }


});
