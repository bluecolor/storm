/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

    //'*':true

    '*': ['authenticated'],

    'AuthController' : {
        '*' : true
    },

    'AppController' : {
        'saveConfs' : ['authenticated','hasAdminRole']
    },


    'SchedulerController' : {
        'create' : ['authenticated','hasAdminRole'],
        'update' : ['authenticated','hasAdminRole'],
        'destroy': ['authenticated','hasAdminRole'],
        'upload' : ['authenticated','hasAdminRole']
    },

    'ConnectionController': {
        'create' : ['authenticated','hasAdminRole'],
        'update' : ['authenticated','hasAdminRole'],
        'destroy': ['authenticated','hasAdminRole']
    },

    'GroupController' : {
        'create' : ['authenticated','hasOperatorRole'],
        'update' : ['authenticated','hasOperatorRole'],
        'destroy': ['authenticated','hasOperatorRole']
    },

    'ParameterController' : {
        'create' : ['authenticated','hasOperatorRole'],
        'update' : ['authenticated','hasOperatorRole'],
        'destroy': ['authenticated','hasOperatorRole']
    },

    'PlanController' : {
        'create'    : ['authenticated','hasOperatorRole'],
        'update'    : ['authenticated','hasOperatorRole'],
        'destroy'   : ['authenticated','hasOperatorRole'],
        'deactivate': ['authenticated','hasOperatorRole'],
        'activate'  : ['authenticated','hasOperatorRole'],
        'protect'   : ['authenticated','hasOperatorRole'],
        'unprotect' : ['authenticated','hasOperatorRole']
    },

    'SessionController' : {
        'play'      : ['authenticated','hasOperatorRole'],
        'replay'    : ['authenticated','hasOperatorRole'],
        'destroy'   : ['authenticated','hasOperatorRole'],
        'setParallel' : ['authenticated','hasOperatorRole']
    },

    'TaskController': {
        'update'            : ['authenticated','hasOperatorRole'],
        'destroy'           : ['authenticated','hasOperatorRole'],
        'include'           : ['authenticated','hasOperatorRole'],
        'exclude'           : ['authenticated','hasOperatorRole'],
        'upload'            : ['authenticated','hasOperatorRole'],
        'destroyByPlan'     : ['authenticated','hasOperatorRole']
    },

    'TaskInstanceController': {
        'destroy'           : ['authenticated','hasOperatorRole'],
        'destroyBySession'  : ['authenticated','hasOperatorRole'],
        'makeReady'         : ['authenticated','hasOperatorRole'],
        'block'             : ['authenticated','hasOperatorRole'],
        'unblock'           : ['authenticated','hasOperatorRole'],
        'include'           : ['authenticated','hasOperatorRole'],
        'exclude'           : ['authenticated','hasOperatorRole'],
        'update'            : ['authenticated','hasOperatorRole'],
        'kill'              : ['authenticated','hasOperatorRole']
    },

    'UserController' : {
        'create' : ['authenticated','hasAdminRole'],
        'update' : ['authenticated','hasAdminRole'],
        'destroy': ['authenticated','hasAdminRole']
    }
};
