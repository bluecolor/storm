NodeJDBC = require 'nodejdbc'
_ = require 'lodash'
{EventEmitter} = require 'events'

module.exports =
class DBRunner extends EventEmitter

    @connection = undefined

    constructor: (@config) ->
        @db = new NodeJDBC(@config)


    getCall: (script, params)->
        proc = ""
        vars = ""
        parameters = []
        _.each script.trim().split(' '), (item,index)->
            if index == 0
                proc = item
            else
                vars = "#{vars},?"
                parameters.push item

        _.each params, (param, index) ->
            parameters.push param
            vars = "#{vars},?"

        vars = vars.substr 1
        ["{call #{proc}(#{vars}) }", parameters]

    # @param script script to run
    # @param params parameters to set
    run: (script, params) ->
        me = this
        if !script
            me.emit 'success'
            return

        @db.getConnection().then((connection) ->
            vars = ""
            me.connection = connection
            [call, params] = me.getCall script, params

            me.emit 'start'
            connection.prepareCall(call).then (statement) ->
                me.statement = statement

                _.each params, (param, index) ->
                    if _.isString param
                        statement.setString index+1,param
                    if _.isNumber param
                        statement.setInt index+1,param

                statement.executeUpdate().then ->
                    connection.close()
                    me.emit 'success'
        ).catch (e)->
            me.emit 'error', e

    kill: ->
        me = this

        @statement.close().then ()->
            me.connection.close()