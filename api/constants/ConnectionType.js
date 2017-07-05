exports.types   = ['ssh','db','local']
exports.SSH     = exports.types[0];
exports.DB      = exports.types[1];
exports.Local   = exports.types[2];

exports.isValid = function(type){
    type = type ? type.toLowerCase() : 'local';
    return _.contains(this.types,type);
};