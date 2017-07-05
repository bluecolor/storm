_       = require 'lodash'
exec   = require('child_process').exec;
{EventEmitter} = require 'events'

module.exports =
class LocalRunner extends EventEmitter

    constructor: ->

    run: (script, params) ->
        me = this

        if _.isEmpty(params)
            process = exec script, params
        else
            process = exec script

        me.emit 'start'

        data = ''

        process.stdout.on 'data', (_data)->
            data += _data
        process.stderr.on 'data', (_data)->
            data += _data

        process.on 'close', (code, signal)->
            switch code
                when 0   then me.emit 'success', data
                when 1   then me.emit 'error'  , data
                when 137 then me.emit 'error', "Killed #{data}"
                else me.emit 'error', "Stream closed unexpectedly! #{data}"
            me.emit 'stop'

            process.stdin.end()

        process.on 'error', (err)->
            console.log err