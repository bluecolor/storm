/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.override(Ext.form.field.Text, { emptyText : ' ' });

Ext.override(Ext.grid.View, {
    loadingCls  : 'custom-loader'
});


/* support for grouping with chained stores */
Ext.define('Ext.overrides.data.AbstractStore', {
    override: 'Ext.data.AbstractStore',
    isLoadBlocked: Ext.emptyFn
});




Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    
    name: 'App',

    requires : [
        'App.lib.Constants',
        'App.lib.Util',
        'App.lib.Sound',
        'App.lib.Message',
        'App.lib.Ajax',
        'App.lib.ajax.Connection',
        'App.lib.ajax.Group',
        'App.lib.ajax.Parameter',
        'App.lib.ajax.Plan',
        'App.lib.ajax.Scheduler',
        'App.lib.ajax.Session',
        'App.lib.ajax.AppSettings',
        'App.lib.ajax.Task',
        'App.lib.ajax.TaskInstance',
        'App.lib.ajax.User',
        'App.lib.ajax.System',
        'App.lib.ajax.SQL',
        'App.lib.ajax.IssueTag',
        'App.lib.SQL',
        'App.lib.User',
        'App.lib.Session',
        'App.lib.Notify',
        'App.lib.SchedulerManager'
    ],

    stores: [
        'PlanStore',
        'TaskStore',
        'TaskInstanceStore',
        'UserStore',
        'ConnectionStore',
        'SchedulerStore',
        'GroupStore',
        'SessionStore',
        'ParameterStore',
        'IssueTagStore',
        'IssueStore'
    ],

    controllers : [
        'HelpController',
        'AppController',
        'PlanController',
        'SessionController',
        'GroupController',
        'TaskController',
        'UserController',
        'ConnectionController',
        'SchedulerController',
        'ParameterController',
        'OptionsController',
        'AppSettingsController',
        'TaskInstanceController',
        'TooltipController',
        'InterceptController',
        'ScriptEditorController',
        'SQLEditorController',
        'IssueController',
        'App.controller.IssueTagController'
    ],

    boot : function(){
        SchedulerManager.setScheduler();
    },

    init : function(){
        var me = this,s = this.getStore(Constants.Store.SCHEDULER);
        s.on('load',me.boot,me,{single:true});
        s.load();
    },

    launch : function () {

    }
});
