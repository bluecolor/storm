Error = require './Error'

module.exports =
class RuntimeError extends Error
    @date = undefined
    @type = 'RUNTIME_ERROR'

    constructor: (message) ->
        super(message)
        @date = new Date()

    getDate: ->
        @date

    setDate: (date) ->
        @date = date
        @me