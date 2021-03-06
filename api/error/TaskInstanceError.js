// Generated by CoffeeScript 1.10.0
(function() {
  var RuntimeError, TaskInstanceError,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  RuntimeError = require('./RuntimeError');

  module.exports = TaskInstanceError = (function(superClass) {
    extend(TaskInstanceError, superClass);

    TaskInstanceError.taskInstance = void 0;

    function TaskInstanceError(message, taskInstance1) {
      this.message = message;
      this.taskInstance = taskInstance1;
      TaskInstanceError.__super__.constructor.call(this, this.message);
      this.type = 'TASK_INSTANCE_ERROR';
      this.setData(this.taskInstance);
    }

    TaskInstanceError.prototype.setTaskInstance = function(taskInstance) {
      this.taskInstance = taskInstance;
      return this.me;
    };

    return TaskInstanceError;

  })(RuntimeError);

}).call(this);
