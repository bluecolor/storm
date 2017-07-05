Ext.define('App.view.home.graph.HomeGraphModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.homegraph',

    stores  : {

        sessions : {
            source: 'SessionStore'
        },
        
        planStats: {
            autoLoad: false,
            proxy : {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                'plan','ready','excluded'
            ],
            loadStore: function(stats){
                this.loadRawData(stats);
            }
        },

        sessionTasks : {
            autoLoad: false,
            proxy : {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {name:'status', type:'string'},
                {name:'count', type:'int'}
            ],

            loadStore: function(sid, silent){

                if(!silent){
                    Message.ext.progress('Loading...',Constants.Icon.MULTI_GEAR);
                }

                var me = this;
                var promise = App.lib.ajax.TaskInstance.findBySession(sid);
                var error = function(){
                    Message.growl.error('Unable to get task instances!');
                };
                var always = function(){
                    Ext.MessageBox.hide();
                };
                var success = function(tasks){
                    var stats = {
                        success  : 0,
                        ready    : 0,
                        error    : 0,
                        excluded : 0,
                        killed   : 0,
                        blocked  : 0
                    };

                    _.each(tasks,function(task){
                        stats[task.excluded ? 'excluded': task.status.toLowerCase()]++;
                    });

                    var data = [];
                    _.forOwn(stats, function(value, key) {
                        data.push({status:key, count:value});
                    });
                    me.loadRawData(data);
                };

                promise.success(success).fail(error).always(always);


            }
        }

        
        
    }

});
