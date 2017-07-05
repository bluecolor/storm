var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require ('../api/lib/crypto');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {

        var process = function(u){
            var user = u[0];
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            var passOk = crypto.compare(password, user.password);


            if (!passOk){
                return done(null, false, {message: 'Invalid Password'});
            }else{
                var returnUser = {
                    email    : user.email,
                    createdAt: user.createdAt,
                    id       : user.id
                };
                return done(null, returnUser, {message: 'Logged In Successfully'});
            }

        };
        return User.find({username:username}).then(process);
    }
));
