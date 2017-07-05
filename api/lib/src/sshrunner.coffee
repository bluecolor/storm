SSHClient = require('ssh2').Client
Promise = require 'bluebird'
{EventEmitter} = require 'events'
_ = require 'lodash'
StringDecoder = require('string_decoder').StringDecoder


module.exports =
class SSHRunner extends EventEmitter

    @stream = undefined

    constructor: (@config) ->
        @ssh = new SSHClient()

    run: (script, params) ->
        me = this

        @connect().then ->
            me.ssh.shell (err,stream) ->
                me.stream = stream

                if err
                    me.emit 'error', err
                    me.emit 'stop'

                data    = ''
                decoder = new StringDecoder('utf8')

                stream.on 'close',(code,signal) ->
                    switch code
                        when 0   then me.emit 'success', data
                        when 1   then me.emit 'error'  , data
                        when 137 then me.emit 'error', "Killed #{data}"
                        else me.emit 'error', "Stream closed unexpectedly! #{data}"
                    me.emit 'stop'
                    me.end()

                stream.on 'data', (d)->
                    data += decoder.write(d)
                stream.stderr.on 'data', (d)->
                    data += decoder.write(d)


                _.each params,  (param) ->
                    if _.isString param
                        script = "#{script} \"#{param}\""
                    else
                        script = "#{script} #{param}"

                stream.end "#{script}\n exit\n"

    connect: ->
        me = this

        new Promise (resolve,reject) ->
            me.ssh.on 'ready',() ->
                me.emit 'connected'
                me.emit 'start'
                resolve me.ssh
            me.ssh.on 'error',(e)->
                me.emit 'connectionerror',e
                me.emit 'stop'
                reject e
            me.ssh.connect me.config

    kill: ->
        @ssh.end()
        this.emit 'killed'
        this.emit 'stop'

    end: ->
        @ssh.end()