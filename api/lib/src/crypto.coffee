crypto = require 'crypto'

module.exports= {
    hash : (text)->
        salt = "I'll make you famous!"
        text ?= @text
        crypto.createHmac('sha256', salt).update(text).digest 'hex'

    compare : (pass, hpass) ->
        this.hash(pass) == hpass
}

