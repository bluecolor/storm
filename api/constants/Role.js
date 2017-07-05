
exports.ADMIN   = 'Admin';
exports.OPERATOR= 'Operator';
exports.GUEST   = 'Guest';

exports.isAdmin = function(r){
  return this.ADMIN.toLowerCase() == r.toLowerCase();
};

exports.isOperator = function(r){
  return this.OPERATOR.toLowerCase() == r.toLowerCase();
};

exports.isGuest = function(r){
  return this.GUEST.toLowerCase() == r.toLowerCase();
};
