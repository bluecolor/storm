
_ = require 'lodash'
winston = require 'winston'
spawn   = require('child_process').spawn
sleep   = require 'sleep'
mongoClient = require('mongodb').MongoClient
superPrompt = require './scripts/super-prompt'
Promise     = require 'bluebird',
ProgressBar = require 'progress'
minimist    = require 'minimist'
sync        = require 'synchronize'
SysConf     = require './.sysconf'

isWinows = /^win/.test(process.platform);


class Progress
    constructor: () ->
        white  = '\u001b[47m \u001b[0m';
        green  = '\u001b[42m \u001b[0m';
        options=
            complete    : green,
            incomplete  : white,
            total       : 60

        @pb = new ProgressBar('[:bar] :percent :etas', options)

    step : () ->
        @pb.tick()

    terminate: () ->
        while not @pb.complete
            @pb.tick()

        @pb.terminate()



MONGO_HOME= ''
REPO_BIN  = ''
DB_NAME   = 'storm'
REPO_URL  = ''


args = minimist process.argv.slice(2)
setsu= args._.indexOf('setsu') >= 0
lift = if args._.indexOf('debug') < 0 then 'lift' else 'debug'

process.stdin.resume()

mongoProcess = null
sailsProcess = null
repoConnectTry = 0
MAX_REPO_CONNECT_RETRY = 10


setMongoProps = ->
  superPrompt.getMongoProps().then (props)->
    # MONGO_HOME= props.path
    # REPO_BIN  = "#{MONGO_HOME}/bin"
    DB_NAME   = props.path || 'storm'
    REPO_URL  = "mongodb://localhost:27017/#{DB_NAME}?connectTimeoutMS=20000&socketTimeoutMS=20000"




# startRepo = ->
#     setMongoHome().then ->
#       winston.info 'Starting repository ...'
#       repod = "#{REPO_BIN}/mongod"
#       mongoProcess = spawn repod,['--dbpath', 'bin/repo/data', '--config', 'bin/repo/bin/mongo.conf','--profile=1', '--slowms=1']
#       mongoProcess.stdout.on "data", (data)->
#           winston.debug data.toString()
#       mongoProcess.stderr.on "data", (data)->
#           winston.error data.toString()

getSu = (db) ->
    winston.info 'Getting Super User'
    new Promise (resolve, reject) ->
        db.collection('user').find({superUser:true}).toArray (err, result) ->
            if err
                winston.info 'Unable to find super user!'
                resolve err
            else if result.length > 1
                winston.info "!!! Multiple super user exception !!!"
                resolve result[0]
            else
                resolve result[0]


setSu = (db, oldSu) ->
    winston.info 'Setting Super User'

    persist = (newSu) ->
        username = if oldSu then oldSu.username else undefined

        new Promise (resolve, reject) ->
            db.collection('user').update {username:username}, newSu, {upsert:true}, (err, result)->
                db.close()
                if err
                    winston.error err
                    reject err
                else
                    winston.info 'SuperUser is set'
                    resolve result

    superPrompt.getSuperUser().then((su)->
        if not oldSu
            winston.info 'Creating super user ...'
        else
            winston.info 'Resetting super user ...'
        winston.info """
            -------------------------------
            Username: #{su.username}
            Email   : #{su.email}
            Name    : #{su.name}
            -------------------------------
        """
        su.superUser = true
        su.active = true
        su.role = "ADMIN"
        su).then(persist)


checkSu = (db) ->
    winston.info 'Checking Super User'
    getSu(db).then (su)->
        promise = null
        if not _.isEmpty(su) and not setsu
            winston.info """
            Check Super User Ok.
            Done repository check.
            """
            promise = Promise.resolve()
        else
            promise = setSu(db, su).finally ()->
                winston.info 'Done repository check'
                db.close()
        return promise

setSysConf = (db) ->

    winston.info 'Checking System configuration ...'

    persist = ->
        return new Promise (resolve, reject) ->
            winston.info 'Setting system configuration'
            db.collection('sysconf').deleteMany {}, (err,result) ->
                if err
                    reject err
                else
                    db.collection('sysconf').insert SysConf.getConf(), (error,result)->
                        if error
                            reject error
                        else
                            winston.info 'Storm version ' + SysConf.getVersionNo()
                            resolve result

    findVersion = ->
        return new Promise (resolve, reject) ->
            winston.info 'Checking Storm version ...'
            db.collection('sysconf').find({parameter:'VERSION'}).toArray (err,result) ->
                if err
                    reject err
                else
                    resolve result[0]

    findVersion().then (conf)->
        if not _.isEmpty conf
            winston.info 'Storm version ' + conf.value.version

        if _.isEmpty(conf) or SysConf.RESET_CONF
            if SysConf.RESET_CONF == true
                winston.info 'System configuration reset requested!!!'
            return persist()


startSails = ()->
  winston.info 'Starting application ...'
  sails = 'node_modules/sails/bin/sails.js'
  node  = "node"
  sailsd= spawn node,[sails,lift]


  sailsd.stdout.on 'data', (data)->
      winston.info data.toString()
  sailsd.stderr.on 'data', (data)->
      winston.info data.toString()
  sailsProcess = sailsd


startInterruptListener = () ->
    kill = (process) ->
      process.kill()

    process.on 'exit', ()->
      winston.info 'TERMINATING ... !'
      kill mongoProcess
      kill sailsProcess

    process.on 'uncaughtException', (e) ->
        winston.error '\nInternal Exception'
        winston.error e
        process.exit()

    process.on 'SIGINT', () ->
      winston.info '\nSIGINT caught !'
      process.exit()

startInterruptListener()


connectRepo = ->
  sync mongoClient, 'connect'

  sync.fiber ()->
    connected = false
    repoCon = null

    winston.info "Initializing repository ..."
    pb = new Progress()
    while not connected
        if repoConnectTry > MAX_REPO_CONNECT_RETRY
          winston.error "Repository connection failed"
          winston.warn  "Have you started mongodb?" 
          pb.terminate()
          process.exit()
        try
          repoConnectTry += 1
          repoCon = mongoClient.connect REPO_URL
          if repoCon
              pb.terminate()
              winston.info 'Initialized repository'
              connected = true
        catch e
          pb.step()
          sleep.sleep(2)

    if repoCon
      winston.info 'Connected to repository'
      setSysConf(repoCon).then ->
        checkSu(repoCon).then(startSails)

setMongoProps().then ()->
  connectRepo()
