Ext.define('App.model.TaskInstanceModel', {
    extend: 'Ext.data.Model',

    idProperty:'id',
    fields: [
        {
            name : 'id',
            type : 'string'
        },
        {
            name : 'task',
            type : 'auto'
        },
        {
            name : 'plan',
            type : 'auto',
            mapping: 'session.plan'
        },
        {
            name : 'sessionName',
            type : 'string',
            mapping: 'session.name'
        },
        {
            name  : 'planName',
            type  : 'string',
            mapping: 'plan',
            convert : function(v){
               return v?v.name:v;
            }
        },
        {
            name : 'name',
            type : 'string',
            mapping : 'task.name'
        },
        {
            name : 'owners',
            type : 'auto',
            mapping : 'task.owners'
        },
        {
            name    : 'primaryGroup',
            type    : 'auto',
            mapping : 'task.primaryGroup'
        },
        {
            name    : 'primaryGroupName',
            type    : 'string',
            mapping : 'task.primaryGroup.name'
        },
        {
            name : 'status',
            type : 'string'
        },
        {
            name    : 'technology',
            type    : 'string',
            mapping : 'technology'
        },
        {
            name : 'script',
            type : 'string',
            mapping:'script'
        },
        {
            name: 'predecessors',
            type: 'auto'
        },
        {
            name: 'predecessorInstances',
            type: 'auto'
        },
        {
            name: 'predecessorStats',
            type: 'auto',
            mapping : 'predecessorInstances',
            convert : function(p){

                var stats = {
                    done : 0,
                    all  : 0,
                    text : '0/0 done',
                    progress: 1
                };

                if(_.isEmpty(p)){
                    return stats;
                }

                stats.done = _.reduce(p,function(t,n){
                    var done = [Constants.Status.SUCCESS,Constants.Status.EXCLUDED];
                    if(done.indexOf(n.status)>-1 || n.excluded){
                        ++t
                    }
                    return t;
                },0);

                stats.all = p.length;
                stats.text= '{0}/{1} done'.format(stats.done,stats.all);
                stats.progress = stats.done/stats.all;


                return stats;
            }
        },
        {
            name: 'startDate',
            type: 'number'
        },
        {
            name: 'startDateStr',
            mapping: 'startDate',
            convert: function(v){
                return moment(v).format('YYYY.MM.DD HH:mm:ss')
            }
        },
        {
            name: 'endDate',
            type: 'number'
        },
        {
            name: 'endDateStr',
            mapping: 'endDate',
            convert: function(v){
                return moment(v).format('YYYY.MM.DD HH:mm:ss')
            }
        },
        {
            name: 'duration',
            type: 'number'
        },
        {
            name: 'durationStr',
            mapping: 'duration',
            convert: function(v){
                return moment.utc(v).format("HH:mm:ss");
            }
        },
        {
            name: 'avgDuration',
            type: 'number'
        },
        {
            name: 'avgDurationStr',
            mapping: 'avgDuration',
            convert: function(v){
                return moment.utc(v).format("HH:mm:ss");
            }
        },
        {
            name : 'order',
            type : 'int'
        },
        {
            name: 'progress',
            convert: function(v,r){
                var duration = r.get('duration'),
                    avg = r.get('avgDuration'),
                    s = r.get('status');

                if([Constants.Status.EXCLUDED,Constants.Status.SUCCESS].indexOf(s)>-1){
                    return 1;
                }
                else if([Constants.Status.READY,Constants.Status.BLOCKED,
                        Constants.Status.ERROR,Constants.Status.KILLED].indexOf(s)>-1){
                    return 0;
                }
                else if(avg == 0 || avg == undefined){
                    return 7/41; //my lucky number
                }

                if(s == Constants.Status.RUNNING && avg  && avg!= 0){
                    return duration/avg;
                }

                return 0;
            }
        }
    ]

});


