Ext.define('App.view.home.scheduler.SchedulerCards',{
    extend : 'Ext.panel.Panel',
    xtype  : 'schedulercards',

    requires : [
        'App.view.home.scheduler.SchedulerCard',
        'App.view.home.scheduler.SchedulerCardsController',
        'App.view.pool.button.RefreshButton'
    ],

    controller: 'schedulercards',

    layout: {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },
    
    maxWidth: 400,
    iconCls : 'sch-clock',
    title   : 'Schedulers',
    flex    : 1,
    margin  : '0 10 0 0',
    cls     : 'card',

    scrollable: true,

    tbar  : {
        name  : 'schTbar',
        padding: '0 0 10 0',
        items : [
            {
                hidden  : false,
                xtype   : 'button',
                iconCls : 'plus',
                tooltip : 'Add scheduler',
                handler : 'onCreateScheduler'
            },
            {
                xtype: 'refreshbutton',
                handler : function(){
                    Ext.getStore(Constants.Store.SCHEDULER).load();
                }
            }
        ]
    },
    items : [
    ],

    constructor: function(){
        var me = this;

        var s = Ext.getStore(Constants.Store.SCHEDULER);
        s.on('datachanged',function(){
            _.each(s.data.items,function(sch){
                var card = me.down('schedulercard[schedulerId={}]'.format(sch.get('id')));
                if(card){
                    card.setStatus(sch.get('status'));
                    card.setProgress(sch.get('progress'));
                }else{
                    me.insert(
                        {
                            xtype       : 'schedulercard',
                            schedulerId : sch.get('id'),
                            title       : sch.get('name'),
                            listeners   : {
                                beforerender: function(c){
                                    c.setStatus(sch.get('status'));
                                    c.setProgress(sch.get('progress'));
                                }
                            }
                        }
                    );
                }
            });
        });

        this.callParent(arguments);
    }

});