RuntimeError = require './RuntimeError'

module.exports=
class TaskInstanceError extends RuntimeError

    @taskInstance = undefined

    constructor: (@message, @taskInstance) ->
        super(@message)
        @type = 'TASK_INSTANCE_ERROR'
        @setData(@taskInstance)

    setTaskInstance: (taskInstance) ->
        @taskInstance = taskInstance
        @me


