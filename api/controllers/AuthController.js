var passport = require('passport');

var AuthController = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    home : function(req,res){
        var b = req.isAuthenticated();
        if(!b){
            return res.view('login');
        }

        res.view('home');
    },

    process: function(req,res){
        passport.authenticate('local', function(err, user, info) {

            if (err || !user) {
                return res.serverError({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    res.redirect('/login');
                }

                return res.send(user);
            });

        })(req, res);
    },

    login: function (req, res) {
        req.logout();
        req.session.authenticated = false;
        res.view('login');
    },


    register: function (req, res) {
        res.view({
            errors: req.flash('error')
        });
    },


    provider: function (req, res) {
        passport.endpoint(req, res);
    },

    /**
     * Create a authentication callback endpoint
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param {Object} req
     * @param {Object} res
     */
    callback: function (req, res) {
        function tryAgain (err) {

            // Only certain error messages are returned via req.flash('error', someError)
            // because we shouldn't expose internal authorization errors to the user.
            // We do return a generic error and the original request body.
            var flashError = req.flash('error')[0];

            if (err && !flashError ) {
                req.flash('error', 'Error.Passport.Generic');
            } else if (flashError) {
                req.flash('error', flashError);
            }
            req.flash('form', req.body);

            // If an error was thrown, redirect the user to the
            // login, register or disconnect action initiator view.
            // These views should take care of rendering the error messages.
            var action = req.param('action');

            switch (action) {
                case 'register':
                    res.redirect('/register');
                    break;
                case 'disconnect':
                    res.redirect('back');
                    break;
                default:
                    res.redirect('/login');
            }
        }

        passport.callback(req, res, function (err, user, challenges, statuses) {
            if (err || !user) {
                return tryAgain(challenges);
            }

            req.login(user, function (err) {
                if (err) {
                    return tryAgain(err);
                }

                // Mark the session as authenticated to work with default Sails sessionAuth.js policy
                req.session.authenticated = true;

                // Upon successful login, send the user to the homepage were req.user
                // will be available.
                res.redirect('/');
            });
        });
    },

    disconnect: function (req, res) {
        passport.disconnect(req, res);
    }
};

module.exports = AuthController;
