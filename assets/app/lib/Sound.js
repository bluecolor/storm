Ext.define('App.lib.Sound', {
    singleton: true,
    alternateClassName: ['Sound'],

    soundOn : true,

    isOn: function(){
        return this.soundOn;
    },

    turnOn: function(){
        this.soundOn = true;
    },

    turnOff: function(){
        this.soundOn = false;
    },

    setSoundOn: function(b){
        this.soundOn = b;
    },

    error : function(){
        if(this.isOn()){
            createjs.Sound.play(Constants.Sound.ERROR);
        }
    },

    success: function(){

    },

    warn: function(){

    },

    info: function(){
        if(this.isOn()){
            createjs.Sound.play(Constants.Sound.INFO);
        }
    },

    constructor: function(){
        createjs.Sound.registerSound("resources/sound/message.ogg", Constants.Sound.ERROR);
        createjs.Sound.registerSound("resources/sound/message.ogg", Constants.Sound.INFO);
        this.callParent(arguments);
    }

});