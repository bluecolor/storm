Ext.define('App.lib.User',{
    singleton : true,
    alternateClassName : ['User'],


    id      : undefined,
    name    : 'name',
    username: 'su',
    email   : undefined,
    role    : 'ADMIN',

    options : {
        schPlan     : [],
        deno        : {
            taskStatusWarn: true
        },
        tipsOnStart : false,
        editor: {
            theme       : 'clouds',
            fontSize    : 17,
            tabSize     : 4,
            softTabs    : false,
            wrapText    : false,
            highlightActiveLine: true,
            autoComplete: false,
            lineNumbers : true,
            gutter      : true
        }
    },

    getName : function(){
        return this.name;
    },

    getEmail: function(){
        return this.email;
    },


    hasRole : function(role){

        switch (role) {
            case Constants.Role.ADMIN :
                return this.role === Constants.Role.ADMIN;
            case Constants.Role.OPER  :
                return this.role === Constants.Role.ADMIN || this.role === Constants.Role.OPER;
            case Constants.Role.GUEST :
                return true;
        }

    },

    getDefaultScheduler : function(){
        var me = this;
        var sch= undefined;

        if(me.options.schPlan){
            for(var i =0; i< me.options.schPlan.length; i++){
                var sp = me.options.schPlan[i];
                if(sp['default']){
                    return sp.scheduler;
                }
            }
        }
    },

    getDefaultPlan : function(){
        var me = this;

        if(me.options.schPlan){
            for(var i =0; i< me.options.schPlan.length; i++){
                var sp = me.options.schPlan[i];
                if(sp['default']){
                    return sp.plan;
                }
            }
        }
    },

    init : function(me) {

        if(!me.username){
            Message.growl.error('Undefined user!');
            return;
        }

        this.id = me.id;
        this.name = me.name;
        this.email= me.email;
        this.username = me.username;
        this.role = me.role;

        if(me && me.options){
            try {
                var ops = me.options;
                Ext.Object.merge(this.options, ops);
            }catch(e){
                console.log(e);
            }
        }
    },

    constructor : function(){
        var promise = AsyncUser.me();
        var that = this;
        promise.success(function(me){
            that.init(me);
        }).error(function(e){
            console.log(e);
        });
        this.callParent(arguments);
    }

});
