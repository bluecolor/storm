/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    //'/': {
    //    view: 'home'
    //},

    'get /login' : {
        view: 'login'
    },

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    /* AUTH */
    'GET  /'                  : 'AuthController.home',
    'GET  /login'             : 'AuthController.login',
    'POST /login'             : 'AuthController.process',
    'GET  /logout'            : 'AuthController.login',

    /* user */
    'GET    /user/super'                : 'UserController.findSuperUser',
    'GET    /user/username/:username'   : 'UserController.findByUsername',
    'GET    /user'                      : 'UserController.find',
    'GET    /user/me'                   : 'UserController.me',
    'GET    /user/taskOwners'           : 'UserController.findTaskOwners',
    'GET    /user/:id/tasks/:status'    : 'UserController.findTasksByStatus',
    'GET    /user/:id/tasks'            : 'UserController.findTasksByStatus',
    'GET    /user/:id'                  : 'UserController.find',
    'POST   /user/password'             : 'UserController.changePassword',
    'POST   /user'                      : 'UserController.create',
    'POST   /user/options'              : 'UserController.saveOptions',
    'PUT    /user'                      : 'UserController.update',
    'DELETE /user'                      : 'UserController.destroy',
    'DELETE /user/exceptsu'             : 'UserController.destroyExceptSu',
    'DELETE /user/:id'                  : 'UserController.destroy',


    /* connection */
    'GET    /connection'            : 'ConnectionController.find',
    'GET    /connection/name/:name' : 'ConnectionController.findByName',
    'GET    /connection/:id'        : 'ConnectionController.find',
    'PUT    /connection'            : 'ConnectionController.update',
    'PUT    /connection/:id'        : 'ConnectionController.update',
    'POST   /connection'            : 'ConnectionController.create',
    'POST   /connection/test'       : 'ConnectionController.test',
    'DELETE /connection'            : 'ConnectionController.destroy',
    'DELETE /connection/:id'        : 'ConnectionController.destroy',


    /* scheduler */
    'GET    /scheduler/name/:name'  : 'SchedulerController.findByName',
    'GET    /scheduler/planTaskStatusStats/:schedulerId' : 'SchedulerController.planTaskStatusStats',
    'GET    /scheduler'             : 'SchedulerController.find',
    'GET    /scheduler/:id'         : 'SchedulerController.find',
    'POST   /scheduler'             : 'SchedulerController.create',
    'DELETE /scheduler'             : 'SchedulerController.destroy',
    'DELETE /scheduler/:id'         : 'SchedulerController.destroy',
    'PUT    /scheduler'             : 'SchedulerController.update',
    'PUT    /scheduler/:id'         : 'SchedulerController.update',
    'GET    /scheduler/download/:id/options/:options': 'SchedulerController.download',
    'POST   /scheduler/upload'      : 'SchedulerController.upload',


    /* plan */
    'GET    /plan/name/:name'               : 'PlanController.findByName',
    'GET    /plan/scheduler/:schedulerId'   : 'PlanController.findByScheduler',
    'GET    /plan/validate/:id'             : 'PlanController.validate',
    'GET    /plan'                          : 'PlanController.findAll',
    'GET    /plan/:id/stats/taskStatus'     : 'PlanController.taskStatusStats',
    'GET    /plan/:id/tasks/:status'        : 'PlanController.findTasksByStatus',
    'GET    /plan/:id/tasks'                : 'PlanController.findTasksByStatus',
    'GET    /plan/:id'                      : 'PlanController.find',
    'POST   /plan'                          : 'PlanController.create',
    'PUT    /plan'                          : 'PlanController.update',
    'PUT    /plan/:id'                      : 'PlanController.update',
    'PUT    /plan/deactivate/:id'           : 'PlanController.deactivate',
    'PUT    /plan/activate/:id'             : 'PlanController.activate',
    'PUT    /plan/protect/:id'              : 'PlanController.protect',
    'PUT    /plan/unprotect/:id'            : 'PlanController.unprotect',
    'DELETE /plan'                          : 'PlanController.destroy',
    'DELETE /plan/:id'                      : 'PlanController.destroy',


    /* group */
    'GET    /group/name/:name'  : 'GroupController.findByName',
    'GET    /group/:id/tasks'   : 'GroupController.findTasks',
    'GET    /group'             : 'GroupController.find',
    'GET    /group/:id'         : 'GroupController.find',
    'POST   /group'             : 'GroupController.create',
    'PUT    /group/:id'         : 'GroupController.update',
    'PUT    /group'             : 'GroupController.update',
    'DELETE /group'             : 'GroupController.destroy',
    'DELETE /group/:id'         : 'GroupController.destroy',
    'GET    /group/scheduler/:schedulerId': 'GroupController.findByScheduler',

    /* task */
    'GET    /task/owner/:ownerId'   : 'TaskController.findByOwner',
    'GET    /task/name/:name'       : 'TaskController.findByName',
    'GET    /task/searchByName'     : 'TaskController.searchByName',
    'GET    /task/group/:gid'       : 'TaskController.findByGroup',
    'GET    /task/primaryGroup/:gid': 'TaskController.findByPrimaryGroup',
    'GET    /task/:id'                  : 'TaskController.find',
    'POST   /task'                      : 'TaskController.create',
    'POST   /task/upload'               : 'TaskController.upload',
    'PUT    /task/exclude/:id'          : 'TaskController.exclude',
    'PUT    /task/include/:id'          : 'TaskController.include',
    'PUT    /task/exclude'              : 'TaskController.exclude',
    'PUT    /task/include'              : 'TaskController.include',
    'DELETE /task/:id'                  : 'TaskController.destroy',
    'DELETE /task'                      : 'TaskController.destroy',
    'DELETE /task/plan/:planId'         : 'TaskController.destroyByPlan',
    'GET    /task/plan/:planId'         : 'TaskController.findByPlan',
    'PUT    /task/deactivate'           : 'TaskController.deactivate',
    'PUT    /task/activate'             : 'TaskController.activate',
    'PUT    /task/deactivate/:id'       : 'TaskController.deactivate',
    'PUT    /task/activate/:id'         : 'TaskController.activate',
    'PUT    /task/:id'                  : 'TaskController.update',
    'GET    /task/download/plan/:id'    : 'TaskController.downloadByPlan',
    'GET    /task/download/:tasks'      : 'TaskController.downloadByTasks',


    /* task instance */
    'GET    /taskInstance'               : 'TaskInstanceController.find',
    'GET    /taskInstance/errors'        : 'TaskInstanceController.findErrors',
    'GET    /taskInstance/status/:status': 'TaskInstanceController.findByStatus',
    'GET    /taskInstance/session/:sid'  : 'TaskInstanceController.findBySession',
    'GET    /taskInstance/searchLatestByName': 'TaskInstanceController.searchLatestByName',
    'GET    /taskInstance/:id'           : 'TaskInstanceController.find',
    'DELETE /taskInstance'               : 'TaskInstanceController.destroy',
    'DELETE /taskInstance/session/:sid'  : 'TaskInstanceController.destroyBySession',
    'PUT    /taskInstance/makeReady'     : 'TaskInstanceController.makeReady',
    'PUT    /taskInstance/makeReady/:id' : 'TaskInstanceController.makeReady',
    'PUT    /taskInstance/block'         : 'TaskInstanceController.block',
    'PUT    /taskInstance/block/:id'     : 'TaskInstanceController.block',
    'PUT    /taskInstance/exclude'       : 'TaskInstanceController.exclude',
    'PUT    /taskInstance/exclude/:id'   : 'TaskInstanceController.exclude',
    'PUT    /taskInstance/include'       : 'TaskInstanceController.include',
    'PUT    /taskInstance/include/:id'   : 'TaskInstanceController.include',
    'PUT    /taskInstance/kill'          : 'TaskInstanceController.kill',
    'PUT    /taskInstance/kill/:id'      : 'TaskInstanceController.kill',
    'PUT    /taskInstance/:id'           : 'TaskInstanceController.update',

    /* logs */
    'GET    /log'                   : 'LogController.find',
    'GET    /log/:id'               : 'LogController.find',
    'GET    /log/taskInstance/'     : 'LogController.findByTaskInstance',
    'GET    /log/taskInstance/:id'  : 'LogController.findByTaskInstance',
    'DELETE /log'                   : 'LogController.destroy',

    /* session */
    'GET    /session/:id/tasks'         : 'SessionController.findTasksByStatus',
    'GET    /session/:id/tasks/:status' : 'SessionController.findTasksByStatus',
    'GET    /session'                   : 'SessionController.find',
    'GET    /session/live'              : 'SessionController.findLiveSessions',
    'GET    /session/live/:sid'         : 'SessionController.findLiveSessions',
    'GET    /session/last/plan/:pid'        : 'SessionController.findLastSessionOfPlan',
    'GET    /session/scheduler/:scheduler'  : 'SessionController.findSchedulerSessions',
    'DELETE /session/:id'           : 'SessionController.destroy',
    'DELETE /session'               : 'SessionController.destroy',
    'PUT    /session/play/:id'      : 'SessionController.play',
    'PUT    /session/replay/:id'    : 'SessionController.replay',
    'PUT    /session/pause/:id'     : 'SessionController.pause',
    'PUT    /session/parallel/:id'  : 'SessionController.setParallel',
    'PUT    /session/parallel'      : 'SessionController.setParallel',

    /* parameter */
    'POST   /parameter'                 : 'ParameterController.create',
    'PUT    /parameter'                 : 'ParameterController.update',
    'PUT    /parameter/:id'             : 'ParameterController.update',
    'GET    /parameter/eval/:name'      : 'ParameterController.findEvalByName',
    'GET    /parameter/eval'            : 'ParameterController.findEval',
    'GET    /parameter'                 : 'ParameterController.find',
    'GET    /parameter/:id'             : 'ParameterController.find',
    'DELETE /parameter'                 : 'ParameterController.destroy',
    'DELETE /parameter/:id'             : 'ParameterController.destroy',


    /* issue */
    'GET    /issue'                     : 'IssueController.find',
    'POST   /issue'                     : 'IssueController.create',
    'PUT    /issue/:id'                 : 'IssueController.update',
    'DELETE /issue/:id'                 : 'IssueController.destroy',


    /* issueTag */
    'GET    /issueTag'                  : 'IssueTagController.find',
    'POST   /issueTag'                  : 'IssueTagController.create',
    'PUT    /issueTag/:id'              : 'IssueTagController.update',
    'DELETE /issueTag/:id'              : 'IssueTagController.destroy',

    /* app - general */
    'GET    /app/test/cron/:exp'        : 'AppController.testCronExp',
    'GET    /app/objectsFlat'           : 'AppController.findObjectsFlat',
    'GET    /app/conf/:name'            : 'AppController.findConf',
    'GET    /app/conf'                  : 'AppController.findAllConf',
    'PUT    /app/conf'                  : 'AppController.saveConfs',
    'PUT    /app/conf/:name'            : 'AppController.saveConf',


    /* sql */
    'GET    /sql/connection/:id/test'   : 'SQLController.testConnection',
    'POST   /sql/query/describe'        : 'SQLController.describeQuery',
    



    /* mail */
    //'POST   /mail/test'                 : 'MailController.testMailServer',

    /* system */
    'GET    /system/config/:name'       : 'SystemController.getConfig',
    'GET    /system/version'            : 'SystemController.getVersion',



    /* test */
    'GET    /test/createPlanSession/:id'    : 'TestController.createPlanSession',
    'GET    /test/createApple'              : 'TestController.createApple',
    'GET    /test/findApples'               : 'TestController.findApples',
    'GET    /test/linkAppleToTask/:taskId'  : 'TestController.linkAppleToTask',
    'GET    /test/parameter'                : 'TestController.testParameters'
};
