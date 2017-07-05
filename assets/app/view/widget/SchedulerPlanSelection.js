Ext.define('App.view.widget.SchedulerPlanSelection',{
    extend : 'Ext.form.FieldContainer',
    xtype  : 'schedulerplanselection',

    layout : 'vbox',

    items  : [],

    getSchedulerPlanContainer : function(s){
        return Ext.create('Ext.form.FieldContainer',{
            layout : 'hbox',
            schedulerName: s.name,
            schedulerId  : s.id,
            items : [
                {
                    xtype : 'radio',
                    name  : 'radio',
                    boxLabel  : s.name,
                    labelAlign: 'right',
                    width : 200,
                    listeners : {
                        change: function(radio, n){
                            if(!n) return;
                            var plan = this.up('fieldcontainer').down('combo').getValue();
                            var sp = this.up('schedulerplanselection');
                            sp.fireEvent('change',s, plan);
                        }
                    }
                },
                {
                    xtype       : 'combo',
                    width       : 250,
                    queryMode   : 'local',
                    name        : 'plan',
                    displayField: 'name',
                    valueField  : 'id',
                    editable    : false,
                    store       : Ext.create('App.store.PlanStore'),
                    flex        : 1,
                    listeners : {
                        change: function(radio, nv, ov){
                            if(nv === ov) return;
                            var plan = this.getValue();
                            var sp = this.up('schedulerplanselection');
                            sp.fireEvent('change',s, plan);
                        }
                    }
                }
            ]
        });
    },

    constructor : function(){
        var me = this;
        me.items=[];

        var s = Ext.getStore(Constants.Store.SCHEDULER).getRawData();

        _.each(s,function(sch){
             me.items.push(me.getSchedulerPlanContainer(sch));
        });

        me.callParent(arguments);
        me.enableBubble('changedefault');
        me.loadPlans(s);
    },

    loadPlans : function(s) {

        var me = this,
            promise = AsyncPlan.find();


        promise.success(function(p){

            var sp = {};

            _.each(s, function(sch){
                sp[sch.name] = [];
            });

            _.each(p,function(plan){
                sp[plan.scheduler.name].push(plan);
            });

            _.mapKeys(sp,function(v,k){
                me.down('fieldcontainer[schedulerName={0}] combo'.format(k)).store.loadRawData(v);
            });

            me.fireEvent('plansloaded');

        }).error(function(r){
            Message.growl.error('Unable to get plans!');
        });

    },

    setValue : function(op){

        var me = this;
        me.on('plansloaded',function(){
            _.each(op,function(sp){
                var fc = me.down('fieldcontainer[schedulerId={0}]'.format(sp.scheduler));
                if(fc) {
                    fc.down('radio').setValue(sp['default']);
                    fc.down('combo').setValue(sp.plan);
                }
            });
        });
    },

    getValue: function(){
        var options = [];

        var items = this.items.items;

        for (var i=0; i< items.length; i++){
            var o = {};
            var fc = items[i];
            o.scheduler = fc.schedulerId;
            o.plan = fc.down('combo[name=plan]').getValue();
            o['default'] = fc.down('radio').getValue();
            options.push(o);
        }

        return options;
    }

});
