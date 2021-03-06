// Generated by CoffeeScript 1.10.0
(function() {
  var DB_NAME, MAX_REPO_CONNECT_RETRY, MONGO_HOME, Progress, ProgressBar, Promise, REPO_BIN, REPO_URL, SysConf, _, args, checkSu, connectRepo, getSu, isWinows, lift, minimist, mongoClient, mongoProcess, repoConnectTry, sailsProcess, setMongoProps, setSu, setSysConf, setsu, sleep, spawn, startInterruptListener, startSails, superPrompt, sync, winston;

  _ = require('lodash');

  winston = require('winston');

  spawn = require('child_process').spawn;

  sleep = require('sleep');

  mongoClient = require('mongodb').MongoClient;

  superPrompt = require('./scripts/super-prompt');

  Promise = require('bluebird', ProgressBar = require('progress'));

  minimist = require('minimist');

  sync = require('synchronize');

  SysConf = require('./.sysconf');

  isWinows = /^win/.test(process.platform);

  Progress = (function() {
    function Progress() {
      var green, options, white;
      white = '\u001b[47m \u001b[0m';
      green = '\u001b[42m \u001b[0m';
      options = {
        complete: green,
        incomplete: white,
        total: 60
      };
      this.pb = new ProgressBar('[:bar] :percent :etas', options);
    }

    Progress.prototype.step = function() {
      return this.pb.tick();
    };

    Progress.prototype.terminate = function() {
      while (!this.pb.complete) {
        this.pb.tick();
      }
      return this.pb.terminate();
    };

    return Progress;

  })();

  MONGO_HOME = '';

  REPO_BIN = '';

  DB_NAME = 'storm';

  REPO_URL = '';

  args = minimist(process.argv.slice(2));

  setsu = args._.indexOf('setsu') >= 0;

  lift = args._.indexOf('debug') < 0 ? 'lift' : 'debug';

  process.stdin.resume();

  mongoProcess = null;

  sailsProcess = null;

  repoConnectTry = 0;

  MAX_REPO_CONNECT_RETRY = 10;

  setMongoProps = function() {
    return superPrompt.getMongoProps().then(function(props) {
      DB_NAME = props.path || 'storm';
      return REPO_URL = "mongodb://localhost:27017/" + DB_NAME + "?connectTimeoutMS=20000&socketTimeoutMS=20000";
    });
  };

  getSu = function(db) {
    winston.info('Getting Super User');
    return new Promise(function(resolve, reject) {
      return db.collection('user').find({
        superUser: true
      }).toArray(function(err, result) {
        if (err) {
          winston.info('Unable to find super user!');
          return resolve(err);
        } else if (result.length > 1) {
          winston.info("!!! Multiple super user exception !!!");
          return resolve(result[0]);
        } else {
          return resolve(result[0]);
        }
      });
    });
  };

  setSu = function(db, oldSu) {
    var persist;
    winston.info('Setting Super User');
    persist = function(newSu) {
      var username;
      username = oldSu ? oldSu.username : void 0;
      return new Promise(function(resolve, reject) {
        return db.collection('user').update({
          username: username
        }, newSu, {
          upsert: true
        }, function(err, result) {
          db.close();
          if (err) {
            winston.error(err);
            return reject(err);
          } else {
            winston.info('SuperUser is set');
            return resolve(result);
          }
        });
      });
    };
    return superPrompt.getSuperUser().then(function(su) {
      if (!oldSu) {
        winston.info('Creating super user ...');
      } else {
        winston.info('Resetting super user ...');
      }
      winston.info("-------------------------------\nUsername: " + su.username + "\nEmail   : " + su.email + "\nName    : " + su.name + "\n-------------------------------");
      su.superUser = true;
      su.active = true;
      su.role = "ADMIN";
      return su;
    }).then(persist);
  };

  checkSu = function(db) {
    winston.info('Checking Super User');
    return getSu(db).then(function(su) {
      var promise;
      promise = null;
      if (!_.isEmpty(su) && !setsu) {
        winston.info("Check Super User Ok.\nDone repository check.");
        promise = Promise.resolve();
      } else {
        promise = setSu(db, su)["finally"](function() {
          winston.info('Done repository check');
          return db.close();
        });
      }
      return promise;
    });
  };

  setSysConf = function(db) {
    var findVersion, persist;
    winston.info('Checking System configuration ...');
    persist = function() {
      return new Promise(function(resolve, reject) {
        winston.info('Setting system configuration');
        return db.collection('sysconf').deleteMany({}, function(err, result) {
          if (err) {
            return reject(err);
          } else {
            return db.collection('sysconf').insert(SysConf.getConf(), function(error, result) {
              if (error) {
                return reject(error);
              } else {
                winston.info('Storm version ' + SysConf.getVersionNo());
                return resolve(result);
              }
            });
          }
        });
      });
    };
    findVersion = function() {
      return new Promise(function(resolve, reject) {
        winston.info('Checking Storm version ...');
        return db.collection('sysconf').find({
          parameter: 'VERSION'
        }).toArray(function(err, result) {
          if (err) {
            return reject(err);
          } else {
            return resolve(result[0]);
          }
        });
      });
    };
    return findVersion().then(function(conf) {
      if (!_.isEmpty(conf)) {
        winston.info('Storm version ' + conf.value.version);
      }
      if (_.isEmpty(conf) || SysConf.RESET_CONF) {
        if (SysConf.RESET_CONF === true) {
          winston.info('System configuration reset requested!!!');
        }
        return persist();
      }
    });
  };

  startSails = function() {
    var node, sails, sailsd;
    winston.info('Starting application ...');
    sails = 'node_modules/sails/bin/sails.js';
    node = "node";
    sailsd = spawn(node, [sails, lift]);
    sailsd.stdout.on('data', function(data) {
      return winston.info(data.toString());
    });
    sailsd.stderr.on('data', function(data) {
      return winston.info(data.toString());
    });
    return sailsProcess = sailsd;
  };

  startInterruptListener = function() {
    var kill;
    kill = function(process) {
      return process.kill();
    };
    process.on('exit', function() {
      winston.info('TERMINATING ... !');
      kill(mongoProcess);
      return kill(sailsProcess);
    });
    process.on('uncaughtException', function(e) {
      winston.error('\nInternal Exception');
      winston.error(e);
      return process.exit();
    });
    return process.on('SIGINT', function() {
      winston.info('\nSIGINT caught !');
      return process.exit();
    });
  };

  startInterruptListener();

  connectRepo = function() {
    sync(mongoClient, 'connect');
    return sync.fiber(function() {
      var connected, e, error1, pb, repoCon;
      connected = false;
      repoCon = null;
      winston.info("Initializing repository ...");
      pb = new Progress();
      while (!connected) {
        if (repoConnectTry > MAX_REPO_CONNECT_RETRY) {
          winston.error("Repository connection failed");
          winston.warn("Have you started mongodb?");
          pb.terminate();
          process.exit();
        }
        try {
          repoConnectTry += 1;
          repoCon = mongoClient.connect(REPO_URL);
          if (repoCon) {
            pb.terminate();
            winston.info('Initialized repository');
            connected = true;
          }
        } catch (error1) {
          e = error1;
          pb.step();
          sleep.sleep(2);
        }
      }
      if (repoCon) {
        winston.info('Connected to repository');
        return setSysConf(repoCon).then(function() {
          return checkSu(repoCon).then(startSails);
        });
      }
    });
  };

  setMongoProps().then(function() {
    return connectRepo();
  });

}).call(this);
