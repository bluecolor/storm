Message = require './Message'

module.exports=
class RuntimeMessage extends Message
    @date = undefined

    constructor: (message) ->
        super(message)
        @date = new Date()
        @setType('RUNTIME_MESSAGE')

    getDate: ->
        @date

    setDate: (date) ->
        @date = date
        @me