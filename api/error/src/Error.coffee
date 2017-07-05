
module.exports=
class Error
    @me     = undefined
    @type   = undefined

    constructor: (@message) ->
        @me = this

    getMessage: ->
        @message

    setMessage: (@message) ->
        @me

    setData: (data) ->
        @data = data

    getData: ->
        @data

    getError: ->
        {} =
        date        : @date
        type        : @type
        message     : @message
        data        : @data