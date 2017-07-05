var moment = require('moment');
var util = require('util');

module.exports = {

    attributes: {


        plan: {
            model: 'Plan',
            index: true
        },

        taskInstances: {
            collection  : 'TaskInstance',
            via         : 'session'
        },

        date: {
            type : 'datetime',
            index: true
        },

        status : {
            type : 'string',
            defaultsTo : 'READY',
            index: true
        },

        startDate: {
            type: 'datetime'
        },

        endDate : {
            type: 'datetime'
        },

        parallel: {
            type : 'integer'
        },

        scheduler: {
            model: 'Scheduler',
            index: true
        },

        getName : function(){
            var date = moment(this.date).format('DD.MM.YYYY');
            var name = this.plan.name;

            return util.format('%s-%s',date,name);
        },

        getStats: function(){
            var tasks = this.taskInstances;

            var o = {
                READY   : 0,
                SUCCESS : 0,
                RUNNING : 0,
                ERROR   : 0,
                BLOCKED : 0,
                KILLED  : 0,
                EXCLUDED: 0
            };

            var calc = function(o, task){
                if(task.excluded){
                    ++o.EXCLUDED;
                }  else {
                    ++o[task.status];
                }
                return o;
            };
            var s = _.reduce(tasks,calc,o);
            s['ALL'] = _.reduce(_.values(s),function(sum,count){
                            return _.isNumber(count) ? sum + count : sum;
                        },0 );
            return s;
        },

        getParallel : function(){
            var me = this;
            var p = 1;

            if(_.isNumber(me.parallel)) {
                p = me.parallel;
            }else if(me.plan && _.isNumber(me.plan.parallel)){
                p = me.plan.parallel;
            }

            return p;
        },


        toJSON: function() {
            var o = this.toObject();
            delete o.taskInstances;
            o.name = this.getName();
            o.stats= this.getStats();
            o.parallel = this.getParallel();
            return o;
        }

    }
};

