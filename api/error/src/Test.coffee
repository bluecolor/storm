
TaskInstanceError = require './TaskInstanceError'

taskInstance =
    name: 'Task_1'
    excluded: false

e = new TaskInstanceError("Task Instance Error", taskInstance)

console.log e.getError()