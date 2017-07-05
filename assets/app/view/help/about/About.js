Ext.define('App.view.help.about.About',{
    extend: 'Ext.window.Window',
    xtype : 'about',

    modal       : true,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    width       : 300,
    height      : 170,
    bodyPadding : 20,
    header      : false,

    items: [
        {
            xtype: 'displayfield',
            name : 'version',
            value: ''
        },
        {
            xtype: 'displayfield',
            name : 'build',
            value: ''
        },
        {
            xtype: 'displayfield',
            name : 'poweredBy',
            value: 'Powered by <a href="">Open Source Software</a>'
        }
    ],

    bbar: [
        {
            xtype: 'displayfield',
            name : 'tradeMark',
            value: '&reg; 20016 - 2017 bluecolor inc.'
        },
        '->',
        {
            text    : 'close',
            handler : function(){
                this.up('window').close();
            }
        }
    ],

    display: function(v){
        var build = "Build #{} built on {}".format(v.buildNo,v.buildDate);
        this.down('[name=version]').setValue(v.name);
        this.down('[name=build]').setValue(build);
        return this.show();
    }

});