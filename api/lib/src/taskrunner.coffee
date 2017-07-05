SSHRunner   = require './sshrunner'
DBRunner    = require './dbrunner'
LocalRunner = require './localrunner'

JDBC    = require '../constants/JDBC.js'
Promise = require 'bluebird'
{EventEmitter} = require 'events'
fs = require 'fs'

module.exports =
class TaskRunner extends EventEmitter

    @runner = undefined 

    constructor: (@task) ->


    run: ->
        me = this

        @getConfig().then (config) ->
            if config.type is 'db'
                me.runner = new DBRunner(config)
            else if config.type is 'ssh'
                me.runner = new SSHRunner (config)
            else if config.type is 'local'
                me.runner = new LocalRunner()

            me.runner.on 'start', ->
                me.emit 'start'
            me.runner.on 'error', (data) ->
                me.emit 'error', data
                me.emit 'stop'
            me.runner.on 'success', ->
                me.emit 'success'
                me.emit 'stop'
            me.runner.on 'killed' , ->
                me.emit 'killed'
                me.emit 'stop'

            script = me.getScript()
            me.runner.run script


    getScript: ->
        me = this
        sv = me.task.scriptValue
        command = me.getCommand(me.task.technology)
        script  = ""
        if not command
            return sv
        script = sv.replace(/"/g, '\\"');
        "#{command} \"#{script}\""
        

    getCommand: (tech)->
        if not tech
            return
        cmd =
            'OS'            : undefined
            'PLSQL'         : undefined
            'JAVA_SCRIPT'   : 'node -e'
            'COFFEE_SCRIPT' : 'coffee -e'
            'RUBY'          : 'ruby -e'
            'PYTHON'        : 'python -c'
        cmd[tech.toUpperCase()]
        
            
            
    getConfig: ->
        @getConnectionConfig().then (connection) =>
            @getRunnerConfig(connection)


    getRunnerConfig: (connection) ->
        if connection.connectionType is 'DB'
            return @getDBConnectionConfig connection
        else if connection.connectionType is 'SSH'
            return @getSSHConnectionConfig connection
        else if connection.connectionType is 'Local'
            config=
                type: 'local'
            return config


    getConnectionConfig: ->
        me = this
        
        if ! _.isEmpty @task.connection
             return Promise.resolve me.task.connection
        else
            return Scheduler
            .findOne(@task.session.plan.scheduler)
            .populateAll()
            .then (scheduler) ->
                scheduler.connection


    getDBConnectionConfig: (c) ->
        JDBC.getDriver().then (libs)->
            if _.isEmpty(c.className) and !JDBC.Vendor.findByUrl(c.url)
                throw 'Can not resolve className for '+c.url;

            className  = c.className

            if  _.isEmpty className
                vendor = JDBC.Vendor.findByUrl c.url
                className = _.first vendor.className if vendor

            config =
                url: c.url
                username : c.username
                password : c.password
                className: className
                type: 'db'

            new Promise (resolve,reject)->
                fs.readdir 'driver', (err,data)->
                    if err
                        reject err
                    else
                        config.libs = _.map(data,(d)->"driver/#{d}")
                        resolve config



    getSSHConnectionConfig: (c) ->
        config=
            host: c.host
            port: c.port
            username: c.username
            password: c.password
            type: 'ssh'

        Promise.resolve config

    kill: ->
        # todo kill