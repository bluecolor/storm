module.exports=
class Message
    @me     = undefined
    @type   = undefined
    @data   = undefined

    constructor: (@data,@message) ->
        @me = this

    setMessage: (@message) ->
        @me

    getMessage: ->
        @message

    setType: (type) ->
        @type = type
        @me

    getType: ->
        @type

    setData: (data) ->
        @data = data
        @me

    getData: ->
        @data

    getMessage: ->
        {}=
            message : @message
            data    : @data