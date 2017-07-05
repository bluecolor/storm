RuntimeMessage = require './RuntimeMessage'

module.exports=
class TaskInstanceStatusMessage extends RuntimeMessage
    # Array of task instance objects
    @instances = undefined

    constructor: (@instances,message) ->
        super(message)
        @setData(@instances)
        @setType('TASK_INSTANCE_STATUS_MESSAGE')