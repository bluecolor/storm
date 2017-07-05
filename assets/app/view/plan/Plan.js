Ext.define('App.view.plan.Plan', {
    extend  : 'Ext.window.Window',
    xtype   : 'plan',

    requires  : [
        'App.view.plan.PlanController',
        'App.view.plan.PlanDetail',
        'App.view.plan.PlanList',
        'App.view.plan.PlanSessions',
        'App.view.plan.PlanModel',
        'App.view.tooltips.ActivatePlanTip'
    ],

    schedulerId : undefined,

    controller  : 'plan',
    viewModel   : {type : 'plan'},

    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Plan',

    items : [
        {
            xtype       : 'planlist',
            region      : 'west',
            width       : 300,
            split       : true,
            header      : false,
            hidden      : true
        },
        {
            name        : 'planInfo',
            region      : 'center',
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            reference   : 'PlanInfo',
            xtype       : 'tabpanel',
            tabPosition : 'bottom',
            items  :  [
                {
                    xtype: 'plandetail',
                    title: 'Details'
                },
                {
                    xtype: 'plansessions',
                    title: 'Sessions'
                }
            ]
        }
    ],

    setValues: function(v){
        this.down('plandetail').setValues(v);
        return this;
    },

    getValues: function(){
        return this.down('plandetail').getValues();
    },

    clear : function(){
        this.down('plandetail').clear();
    },

    setReadOnly : function(b){
        b = b != undefined ? b : true;
        this.down('plandetail').setReadOnly(b);
        return this;
    },

    view  : function(v){
        this.setValues(v);
        this.setReadOnly(true);
        return this.show();
    },

    edit  : function(v){
        this.setReadOnly(false);
        this.setValues(v);
        return this.show();
    },
    create: function(schedulerId){
        this.schedulerId = schedulerId;
        this.clear();
        this.setReadOnly(false);
        return this.show();
    },




    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = Constants.UI.borderSplitter.size;
            }
        },
        show: function(w){

            var c = w.down('checkboxfield[name=active]');
            if(!c.isDisabled()){
                return;
            }
            var t = Ext.create('App.view.tooltips.ActivatePlanTip'),
                pos = c.getPosition();
            pos[0] += 90;
            t.showAt(pos);

            w.on('close',function(){
               t.hide();
            });

        }
    }

});
