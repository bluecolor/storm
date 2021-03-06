// Generated by CoffeeScript 1.10.0
(function() {
  var Error;

  module.exports = Error = (function() {
    Error.me = void 0;

    Error.type = void 0;

    function Error(message) {
      this.message = message;
      this.me = this;
    }

    Error.prototype.getMessage = function() {
      return this.message;
    };

    Error.prototype.setMessage = function(message) {
      this.message = message;
      return this.me;
    };

    Error.prototype.setData = function(data) {
      return this.data = data;
    };

    Error.prototype.getData = function() {
      return this.data;
    };

    Error.prototype.getError = function() {
      return {
        date: this.date,
        type: this.type,
        message: this.message,
        data: this.data
      };
    };

    return Error;

  })();

}).call(this);
