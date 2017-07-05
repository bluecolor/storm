
module.exports = {

    IDLE        : 'IDLE',
    READY       : 'READY',
    SUCCESS     : 'SUCCESS',
    ERROR       : 'ERROR',
    KILLED      : 'KILLED',
    EXCLUDED    : 'EXCLUDED',
    RUNNING     : 'RUNNING',
    BLOCKED     : 'BLOCKED',
    PAUSED      : 'PAUSED',
    COMPLETED   : 'COMPLETED',

    isCompleted : function(task){
        var me = this;
        return [me.SUCCESS, me.EXCLUDED].indexOf(task.status) > -1;
    },

    getCompleteStatuses: function(){
        var me = this;
        return [me.SUCCESS, me.EXCLUDED];
    },

    isNotCompleted : function(task){
        var me = this;
        return !me.isCompleted(task);
    },

    from : function(s1){
        var me = this;
        var sm = {
            READY       : [me.READY,me.EXCLUDED,me.BLOCKED],
            SUCCESS     : [me.READY],
            COMPLETED   : [me.READY],
            RUNNING     : [me.KILLED],
            ERROR       : [me.ERROR,me.READY,me.EXCLUDED],
            EXCLUDED    : [me.READY,me.EXCLUDED],
            BLOCKED     : [me.BLOCKED,me.READY,me.EXCLUDED],
            PAUSED      : [me.PAUSED,me.RUNNING,me.READY],
            KILLED      : [me.KILLED,me.READY,me.BLOCKED,me.EXCLUDED]
        };

        return {
            from : s1,
            to   : function(s2){
                return sm[s1] && sm[s1].indexOf(s2)!=-1;
            }
        };
    }

};