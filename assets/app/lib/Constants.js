Ext.define('App.lib.Constants', {
    singleton: true,
    alternateClassName: ['Constants'],

    
    SQL: {
        Statement : {
            type: {
                DDL: {
                    CREATE  : 'CREATE',
                    DROP    : 'DROP',
                    ALTER   : 'ALTER'
                },
                DML: {
                    INSERT  : 'INSERT',
                    UPDATE  : 'UPDATE',
                    DELETE  : 'DELETE',
                    SELECT  : 'SELECT',
                    UNKNOWN : 'UNKNOWN'
                },
                UNKNOWN : 'UNKNOWN'
            }
        }    
    },
    
    
    
    SysConfParam: {
        VERSION : 'VERSION',
        LATEST_VERSION_URL : 'LATEST_VERSION_URL'
    },

    AppConfParam: {
        MAIL_SERVER: 'MAIL_SERVER'
    },


    Role : {
        ADMIN : 'ADMIN',
        OPER  : 'OPER',
        GUEST : 'GUEST'
    },

    Technology: {
        OS              : 'OS',
        JAVA_SCRIPT     : 'JAVA_SCRIPT',
        COFFEE_SCRIPT   : 'COFFEE_SCRIPT',
        PYTHON          : 'PYTHON',
        RUBY            : 'RUBY',
        PLSQL           : 'PLSQL'
    },

    Ace: {
        Theme: {
            CHROME          : 'chrome',
            CLOUDS          : 'clouds',
            CLOUDS_MIDNIGHT : 'clouds_midnight',
            DAWN            : 'dawn',
            GITHUB          : 'github',
            SOLARIZED_DARK  : 'solarized_dark',
            SOLARIZED_LIGHT : 'solarized_light',
            TERMINAL        : 'terminal',
            TEXTMATE        : 'textmate',
            TWILIGHT        : 'twilight'
        }
    },


    UI : {
        borderSplitter : {
            width   : 1,
            height  : 1,
            size    : 1
        }
    },

    Sound: {
        ERROR : 'ERROR_SOUND',
        INFO  : 'INFO_SOUND'
    },

    FileContentType: {
        TASK            : 'TASK',
        TASK_INSTANCE   : 'TASK_INSTANCE',
        PLAN            : 'PLAN',
        SCHEDULER       : 'SCHEDULER',
        CONNECTION      : 'CONNECTION',
        GROUP           : 'GROUP',
        USER            : 'USER',
        SETTINGS        : 'SETTINGS',
        ALL             : 'ALL'
    },


    ID : {
        Session : {
            all         : 'te-all',
            ready       : 'te-ready',
            running     : 'te-running',
            success     : 'te-success',
            error       : 'te-error',
            blocked     : 'te-blocked',
            killed      : 'te-killed',
            excluded    : 'te-excluded',
            template    : 'te-template',
            getByStatus : function(s){
                if(s==undefined){
                    s = 'all';
                }
                s = s.toLowerCase();
                return this[s];
            }
        },
        Settings : {
            options     : 'se-options',
            password    : 'se-password',
            system      : 'se-system',
            users       : 'se-users',
            connections : 'se-connections',
            schedulers  : 'se-schedulers',
            parameters  : 'se-parameters'
        },

        Reports: {
            systemLogs  : 're-system-logs',
            liveSessions: 're-live-sessions',
            schedulers  : 're-schedulers',
            owners      : 're-owners'
        }
    },

    ConnectionType : {
        SSH     : 'SSH',
        DB      : 'DB',
        LOCAL   : 'LOCAL',
        getTechByConnectionType: function(ct){
            var t = Constants.Technology,
                o = {
                    'SSH'   : [t.OS,t.JAVA_SCRIPT,t.COFFEE_SCRIPT,t.RUBY,t.PYTHON],
                    'DB'    : [t.PLSQL],
                    'LOCAL' : [t.OS,t.JAVA_SCRIPT,t.COFFEE_SCRIPT,t.RUBY,t.PYTHON]
                };

            return o[ct.toUpperCase()];
        }
    },

    Store : {
        PLAN            : 'PlanStore',
        PLAN_INSTANCE   : 'PlanInstanceStore',
        TASK            : 'TaskStore',
        GROUP           : 'GroupStore',
        TASK_INSTANCE   : 'TaskInstanceStore',
        USER            : 'UserStore',
        CONNECTION      : 'ConnectionStore',
        SCHEDULER       : 'SchedulerStore',
        SESSION         : 'SessionStore',
        PARAMETER       : 'ParameterStore',
        ISSUE_TAG       : 'IssueTagStore'
    },

    StatsType : {
        MODULE : 'MODULE',
        TASK   : 'TASK'
    },

    Icon : {

        MULTI_GEAR      : 'multi-gear-32',
        DOWNLOAD_CLOUD  : 'download-cloud-32',
        CONNECTION_SSH  : 'console-16.png',
        CONNECTION_JDBC : 'database-16.png',
        CONNECTION_LOCAL: 'local-server-16.png',

        Cls : {
            Log : {
                ERROR  : 'error-red',
                INFO   : 'info',
                WARNING: 'warning',
                getByLogType : function(type) {
                    switch(type) {
                        case LogType.ERROR  : return this.ERROR;
                        case LogType.INFO   : return this.INFO;
                        case LogType.WARNING: return this.WARNING;
                    }

                    return this.INFO;
                }
            }
        },

        getIconClsByStatus : function(status,excluded) {

            if(!status) { return 'tag-unknown';}

            if(excluded == true){
                return 'tag-excluded';
            }

            switch(status) {
                case Constants.Status.ACTIVE   : return 'tag-active';
                case Constants.Status.INACTIVE : return 'tag-inactive';
                case Constants.Status.IDLE     : return 'tag-idle';
                case Constants.Status.READY    : return 'tag-ready';
                case Constants.Status.ERROR    : return 'tag-error';
                case Constants.Status.COMPLETED: return 'tag-completed';
                case Constants.Status.SUCCESS  : return 'tag-completed';
                case Constants.Status.RUNNING  : return 'tag-running';
                case Constants.Status.EXCLUDED : return 'tag-excluded';
                case Constants.Status.BLOCKED  : return 'tag-blocked';
                case Constants.Status.KILLED   : return 'tag-killed';
                case Constants.Status.ABORTED  : return 'tag-aborted';
                case Constants.Status.PAUSED   : return 'tag-suspended';
                case Constants.Status.UNKNOWN  : return 'tag-unknown';
                default : return 'tag-unknown'
            }
        },

        getWhiteBorderIconClsByStatus : function(status) {

            switch(status) {
                case Constants.Status.READY    : return 'tag-ready-wb';
                case Constants.Status.ERROR    : return 'tag-error-wb';
                case Constants.Status.COMPLETED: return 'tag-completed-wb';
                case Constants.Status.SUCCESS  : return 'tag-success-wb';
                case Constants.Status.RUNNING  : return 'tag-running-wb';
                case Constants.Status.EXCLUDED : return 'tag-excluded-wb';
                case Constants.Status.BLOCKED  : return 'tag-blocked-wb';
                case Constants.Status.KILLED   : return 'tag-killed-wb';
                case Constants.Status.ABORTED  : return 'tag-aborted-wb';
                case Constants.Status.PAUSED   : return 'tag-suspended-wb';
                case Constants.Status.UNKNOWN  : return 'tag-unknown-wb';
                case Constants.Status.IDLE     : return 'tag-idle-wb';
                default : return 'tag-unknown-wb'
            }
        },



        getClockIconPathByStatus : function(status) {

            switch(status) {
                case Constants.Status.BLOCKED     : return 'resources/img/status/clock/clock-softred-16.png';
                case Constants.Status.KILLED      : return 'resources/img/status/clock/clock-softred-16.png';
                case Constants.Status.ERROR       : return 'resources/img/status/clock/clock-red-16.png';
                case Constants.Status.READY       : return 'resources/img/status/clock/clock-yellow-16.png';
                case Constants.Status.COMPLETED   : return 'resources/img/status/clock/clock-green-16.png';
                case Constants.Status.SUCCESS     : return 'resources/img/status/clock/clock-green-16.png';
                case Constants.Status.RUNNING     : return 'resources/img/status/clock/clock-blue-16.png';
                case Constants.Status.NOT_RUNNING : return 'resources/img/status/clock/clock-not-running-16.png';
                case Constants.Status.IDLE        : return 'resources/img/status/clock/clock-idle-16.png';

                default : return 'resources/img/status/clock/clock-gray-16.png';
            }
        }

    },

    Status : {
        ACTIVE      : 'ACTIVE',
        INACTIVE    : 'INACTIVE',
        UNKNOWN     : 'UNKNOWN',
        ABORTED     : 'ABORTED',
        COMPLETED   : 'COMPLETED',
        SUCCESS     : 'SUCCESS',
        READY       : 'READY',
        EXCLUDED    : 'EXCLUDED',
        BLOCKED     : 'BLOCKED',
        KILLED      : 'KILLED',
        ERROR       : 'ERROR',
        RUNNING     : 'RUNNING',
        DELETED     : 'DELETED',
        PAUSED      : 'PAUSED',
        IDLE        : 'IDLE',
        NOT_RUNNING : 'NOT-RUNNING',
        VALID       : true,
        INVALID     : false,

        isDangerous : function(status) {

            switch (status) {
                case this.ABORTED : return true;
                case this.ERROR   : return true;
                case this.KILLED  : return true;
                case this.PAUSED  : return true;
            }
            return false;
        },

        getDangerousStatuses : function() {
            return [this.ABORTED, this.ERROR, this.KILLED];
        },

        from : function(s1){
            var me = this;
            var sm = {
                READY   : [me.READY,me.EXCLUDED,me.BLOCKED],
                SUCCESS : [me.READY],
                COMPLETED : [me.READY],
                RUNNING : [me.KILLED],
                ERROR   : [me.ERROR,me.READY,me.EXCLUDED],
                EXCLUDED: [me.READY,me.EXCLUDED],
                BLOCKED : [me.BLOCKED,me.READY,me.EXCLUDED],
                PAUSED  : [me.READY,me.BLOCKED,me.EXCLUDED]
            };

            return {
                from : s1,
                to   : function(s2){
                    return sm[s1] && sm[s1].indexOf(s2)!=-1;
                }
            };
        }

    },

    Color : {

        DARKRED     : '#D5402B',
        BLUE        : '#428BCA',
        BLACK       : '#000000',
        PLAY        : '#718F4F',
        SUSPENDED   : '#E67E22',
        ABORTED     : '#700000',
        READY       : '#FFB505',
        COMPLETED   : '#008110',
        SUCCESS     : '#008110',
        PAUSED      : '#E67E22',
        BLOCKED     : '#C9007A',
        EXCLUDED    : '#C7C7C7',
        RUNNING     : '#428BCA',
        ERROR       : '#F30021',
        KILLED      : '#42004A',
        UNKNOWN     : '#DB5C4A',
        INACTIVE    : '#f1f5f6',
        IDLE        : '#FFB505',
        NOT_RUNNING : '#757D75',

        getColor : function(color) {
            switch (color) {
                case Constants.Status.UNKNOWN       : return this.UNKNOWN;
                case Constants.Status.ABORTED       : return this.ABORTED;
                case Constants.Status.READY         : return this.READY;
                case Constants.Status.COMPLETED     : return this.COMPLETED;
                case Constants.Status.SUCCESS       : return this.SUCCESS;
                case Constants.Status.BLOCKED       : return this.BLOCKED;
                case Constants.Status.EXCLUDED      : return this.EXCLUDED;
                case Constants.Status.RUNNING       : return this.RUNNING;
                case Constants.Status.ERROR         : return this.ERROR;
                case Constants.Status.KILLED        : return this.KILLED;
                case Constants.Status.PAUSED        : return this.PAUSED;
                case Constants.Status.IDLE          : return this.IDLE;
                case Constants.Status.NOT_RUNNING   : return this.NOT_RUNNING;
                case 'DARKRED'       : return this.DARKRED;
                case 'BLUE'          : return this.BLUE;
                case 'BLACK'         : return this.BLACK;
                case 'PLAY'          : return this.PLAY;
                default              : return color;
            }
        },

        getColorByStatus : function(status, excluded) {

            if(excluded == true){
                return this.EXCLUDED;
            }

            switch (status) {
                case Constants.Status.UNKNOWN       : return this.UNKNOWN;
                case Constants.Status.ABORTED       : return this.ABORTED;
                case Constants.Status.READY         : return this.READY;
                case Constants.Status.COMPLETED     : return this.COMPLETED;
                case Constants.Status.SUCCESS       : return this.SUCCESS;
                case Constants.Status.BLOCKED       : return this.BLOCKED;
                case Constants.Status.EXCLUDED      : return this.EXCLUDED;
                case Constants.Status.RUNNING       : return this.RUNNING;
                case Constants.Status.ERROR         : return this.ERROR;
                case Constants.Status.KILLED        : return this.KILLED;
                case Constants.Status.PAUSED        : return this.PAUSED;
                case Constants.Status.IDLE          : return this.IDLE;
                case Constants.Status.NOT_RUNNING   : return this.NOT_RUNNING;
                default              : return this.BLACK;
            }
        },

        bold : function(text,bold) {
            bold = bold || true;
            return bold ? ('<b>' + text + '</b>') : text;
        },

        /**
         * colors a given text
         * @param text
         * @param clr color
         * @param bold true for bold
         * @returns {string}
         */
        color : function(text, clr, bold) {

            var result= text,
                color = this.getColor(clr);
            result = bold ? ('<b>' + result + '</b>') : result;

            if(clr === 'ASIS')
                return  result;

            return '<span style="color:' + color + ';">' + result + '</span>';
        }

    }

});
