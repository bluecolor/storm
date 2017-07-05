Ext.define('App.store.TaskInstanceStore',{

    extend   : 'App.store.BaseStore',
    requires : ['App.model.TaskInstanceModel'],

    id          : 'TaskInstanceStore',
    storeId     : 'TaskInstanceStore',
    alias       : 'store.TaskInstanceStore',
    model       : 'App.model.TaskInstanceModel',
    groupField  : 'primaryGroupName',
    firstLoad   : true,
    _session    : undefined,
    taskStats   : undefined,
    moduleStats : undefined,

    proxy : {
        api : {
            create  : 'taskInstance',
            read    : 'taskInstance/session/:sid',
            update  : 'taskInstance',
            destroy : 'taskInstance'
        }
    },


    _getSessionId : function() {
        return this._session;
    },

    _setSessionId : function(id) {
        this._session = id;
    },

    loadStore : function(sid, callback) {

        if(sid) {
            this._session = sid;
        }

        this.proxy.api.read = sid ? 'taskInstance/session/{0}'.format(sid) : this.proxy.api.read;
        this.load(callback);

    },

    sorters : [
        {
            property: 'primaryGroupName',
            direction:'ASC'
        },
        {
            property: 'name',
            direction:'ASC'
        }
    ],

    messageDataProperty  : 'name',

    /* !CREATE  - unused - */
    createSuccessMessage : 'Created task instance',
    createErrorMessage   : 'Failed to create task instance',

    updateSuccessMessage : 'Updated task instance',
    updateErrorMessage   : 'Failed to update task instance',

    /* !DELETE  - unused - */
    deleteSuccessMessage : 'Deleted task instance',
    deleteErrorMessage   : 'Failed to delete task instance',

    constructor : function(){
        var me = this;
        this.callParent(arguments);
        var events = ['update','load'];
        _.each(events,function(e){
            me.on(e,me.fireDataChangeEvent,me);
        });
    },

    fireDataChangeEvent : function(){
        var me = this;
        var data = Ext.Array.pluck(me.data.items, 'data');
        var stats= me.stats(data);
        me.fireEvent('datachange',data, stats);
    },
    
    stats : function (data) {
        var me=this,
            d  = data ?   data : Ext.Array.pluck(me.data.items, 'data');

        var stats = {
            READY   : 0,
            SUCCESS : 0,
            RUNNING : 0,
            ERROR   : 0,
            BLOCKED : 0,
            KILLED  : 0,
            EXCLUDED: 0,
            all     : function(){
                var that = this;
                return _.reduce(_.values(that),function(sum,count){
                    return _.isNumber(count) ? sum + count : sum;
                },0 );
            }
        };

        var calc = function(s, task){
            if(task.excluded){
                ++s.EXCLUDED;
            }  else {
                ++s[task.status];
            }
            return s;
        };

        return _.reduce(data,calc,stats);
    },

    groupStats: function(){
        var me    = this,
            stats = {},
            instances = this.getRawData();

        _.each(instances, function(instance){
            var pg = instance.task.primaryGroup.id;
            if(stats[pg] == undefined){
                stats[pg] = {
                    READY   : 0,
                    SUCCESS : 0,
                    RUNNING : 0,
                    ERROR   : 0,
                    BLOCKED : 0,
                    KILLED  : 0,
                    EXCLUDED: 0,
                    TOTAL   : 0
                };
            }
            var status = instance.excluded ? Constants.Status.EXCLUDED : instance.status;
            stats[pg][status]++;
            stats[pg]['TOTAL']++;
        });

        return stats;
    },

    groupStatus: function(){
        var groupStatus = {},
            stats = this.groupStats();

        var getStatus = function (v){
            
            if(v.ERROR    > 0) return Constants.Status.ERROR;
            if(v.KILLED   > 0) return Constants.Status.KILLED;
            if(v.EXCLUDED >= v.TOTAL) return Constants.Status.EXCLUDED;
            if(v.BLOCKED  > 0) return Constants.Status.BLOCKED;
            if(v.SUCCESS  + v.EXCLUDED >= v.TOTAL) return Constants.Status.SUCCESS;
            if(v.RUNNING  > 0) return Constants.Status.RUNNING;
            return Constants.Status.READY;
        };

        _.map(stats, function(v, k){
            groupStatus[k] = getStatus(v);
        });

        return groupStatus;
    }


    
    

});
