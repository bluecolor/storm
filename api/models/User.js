
var crypto = require ('../lib/crypto');


var User = {

    attributes: {
        username    : { type: 'string', unique: true },
        password    : { type: 'string', required: true},
        email       : { type: 'email',  unique: true },
        role        : { type: 'string', required: true},
        name        : { type: 'string'},
        options     : { type: 'json'  },
        superUser   : { type: 'boolean',defaultsTo:false},
        active      : { type: 'boolean',defaultsTo:true},

        hasAdminRole: function(){
            return this.isAdmin();
        },

        hasOperatorRole: function(){
            return this.isAdmin()||this.isOperator();
        },

        hasGuestRole: function(){
            return this.isAdmin()||this.isOperator()||this.hasGuestRole();
        },

        isAdmin: function(){
            return this.role&&this.role.toLowerCase() == 'admin';
        },
        isOperator: function(){
            return this.role&&this.role.toLowerCase() == 'operator';
        },
        isGuest: function(){
            return this.role&&this.role.toLowerCase() == 'guest';
        }
    },

    beforeCreate: function(u, cb) {
        u.password = crypto.hash(u.password);
        cb();
    },

    beforeDestroy: function(u, cb) {
        cb();
    }


};

module.exports = User;
