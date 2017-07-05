Ext.define('App.view.navbar.Navbar',{
    extend: 'Ext.panel.Panel',
    xtype : 'navbar',

    requires: [
        'App.view.navbar.NavbarController'
    ],

    controller: 'navbar',

    tbar : {
        name: 'tbar',
        padding: '10 20 20 20',
        items: [
            {
                reference       : 'SideMenuToggle',
                iconCls         : 'menu',
                tooltip         : 'Sidebar',
                enableToggle    : true,
                pressed         : true,
                toggleHandler   : 'onSideMenuToggle'
            },
            {
                iconCls         : 'home',
                tooltip         : 'Home',
                handler         : 'onGoHome'
            },
            {
                hidden      : true,
                xtype       : 'combo',
                name        : 'schedulers',
                reference   : 'Schedulers',
                allowBlank  : false,
                editable    : false,
                emptyText   : 'Select a scheduler',
                queryMode   : 'local',
                displayField: 'name',
                valueField  : 'id',
                store       : Constants.Store.SCHEDULER,
                matchFieldWidth: true,
                width: 250,
                listConfig  : {
                    getInnerTpl: function() {
                        var img = '<img src="resources/img/status/clock/{status}-16.png" title="{status}" align="center">';
                        return img + ' {name}';
                    }
                },
                setStatusStyle : function(status) {
                    this.inputEl.setStyle({
                        'background-image':    'url(resources/img/status/clock/'+status+'-16.png)',
                        'background-repeat':   'no-repeat',
                        'background-position': '3px center',
                        'padding-left':        '25px'
                    });
                },
                clear: function(){
                    this.inputEl.setStyle({
                        'background-image': 'none'
                    });
                    this.clearValue();
                },

                setValueWithStyle: function(sch){
                    this.setValue(sch.data.id);
                    this.setStatusStyle(sch.data.status);
                },

                listeners : {
                    select: function (c, r) {
                        this.fireEvent('schedulerselect',r.data.id);
                        c.setStatusStyle(r.get('status'));
                    }
                }
            }
            ,'->',
            {
                name     : 'bell',
                iconCls  : 'bell-16',
                reference: 'NavbarBell',
                handler  : 'onNavbarBell',
                hidden   : true,
                cls      : 'error-bell',
                listeners: {
                    afterrender: function(me){
                        var anim = function(){
                            var b = me.getId();
                            $("#{}".format(b)).addClass('animated swing')
                                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                    $(this).removeClass('animated swing');
                                });
                        };

                        setInterval(function(){
                            anim();
                        },20000);

                    }
                }
            },
            {
                name    : 'gear',
                iconCls : 'gear',
                handler : 'onNavbarGear'
            },
            {
                name    : 'gear',
                iconCls : 'speaker',
                handler : 'onNavbarSpeaker',
                enableToggle : true,
                pressed      : true
            },
            {
                iconCls : 'user-blue',
                handler : 'onAccountMenu'
            },
            {
                iconCls : 'help-corn',
                handler : 'onHelp'
            }
        ]
    },

    listeners: {
        afterrender: 'onNavbarRender'
    }

});