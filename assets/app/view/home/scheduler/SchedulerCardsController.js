Ext.define('App.view.home.scheduler.SchedulerCardsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.schedulercards',
    name  : 'SchedulerCardsController',

    requires: [
        'App.view.home.scheduler.SchedulerCardMenu'
    ],


    listen : {
        component: {
            'schedulercard' : {
                'schedulercardclick': function(c){
                    this.onSchedulerCardClick(c.schedulerId);
                }
            }
        },
        controller: {
            '*': {
                'schedulerselect': function(schedulerId, self){
                    if (self != this) {
                        this.onSchedulerCardClick(schedulerId);
                    }
                },
                'onescheduler': function(schedulerId){
                    this.onSchedulerCardClick(schedulerId, true);
                }
            }

        }
    },

    onCreateScheduler: function(){
        this.fireEvent('displayschedulercreate');
    },

    onSchedulerCardClick: function(schedulerId,silent){
        var cards = this.getView().items.items;

        _.each(cards,function(card){
            if (card.schedulerId == schedulerId){
                card.addCls('scheduler-card-selected');
            }else{
                card.removeCls('scheduler-card-selected');
            }
        });

        if(!silent){
            this.fireEvent('schedulercardclick');
            this.fireEvent('schedulerselect',schedulerId,this);
        }
    },

    onSchedulerCardMenu: function(e,schedulerId){
        var me=this,
            m = Ext.create('App.view.home.scheduler.SchedulerCardMenu');
        m.showAt(e.getXY());
        m.on('click',function(m,i){
            switch (i.name){
                case 'newPlan'  : me.onNewPlan(schedulerId); break;
                case 'newGroup' : me.onNewGroup(schedulerId); break;
                case 'newTask'  : me.onNewTask(schedulerId); break;
                case 'delete'   : me.onDeleteScheduler(schedulerId); break;
                case 'refresh'  : Ext.getStore(Constants.Store.SCHEDULER).load(); break;
            }
        });
    },

    onDeleteScheduler: function(schedulerId){
        var o = {
            force: false,
            id   : schedulerId
        };
        this.fireEvent('deletescheduler',o);
    },

    onNewPlan : function(schedulerId){
        this.fireEvent('displayplancreate',schedulerId);
    },

    onNewGroup : function(schedulerId){
        this.fireEvent('displaygroupcreate',schedulerId);
    },

    onNewTask : function(schedulerId){
        this.fireEvent('displaytaskcreateforsch',schedulerId);
    }

});