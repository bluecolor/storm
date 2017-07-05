module.exports = {

    RESET_CONF: false,

    VERSION : {
        "name"   : "Storm 2.0.0",
        "version": "2.0.0",
        "releaseDate"   : "2016.02.01",
        "major"         : false,
        "buildNo"       : "UI-216.1234",
        "buildDate"     : "March 03, 2016",
        "changes": [
            "Tip of the day",
            "Check for updates",
            "Welcome screen"
        ]
    },

    LATEST_VERSION_URL: 'https://raw.githubusercontent.com/blue-color/storm/master/version.json',

    getVersion: function(){
        return this.VERSION;
    },

    getVersionNo: function(){
        return this.VERSION.version;
    },

    getConf: function(){
        var me = this;
        return [
            {
                parameter: 'VERSION',
                value    : me.VERSION
            },
            {
                parameter: 'LATEST_VERSION_URL',
                value    : me.LATEST_VERSION_URL
            }
        ];
    }


};