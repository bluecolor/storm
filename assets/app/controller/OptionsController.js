Ext.define('App.controller.OptionsController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.settings.options.Options'
    ],

    refs : [
        {
            ref         : 'options',
            xtype       : 'options',
            selector    : 'options',
            autoCreate  : true
        }
    ],


    init: function() {

        this.control({
            'mainoptionstool' : {
                'openscheduler' : function(sch){
                    var u = window.location.href;
                    if(u.indexOf('#') > -1) {
                        u = u.substring(0,u.indexOf('#'));
                    }

                    window.open('{0}#{1}'.format(u, sch), '_blank').focus();
                }
            }
        });

        this.listen({
            controller: {
                '*': {
                    'saveoptions'   : this.onSaveOptions,
                    'displayoptions': this.onDisplayOptions
                }
            }
        });
    },

    onSaveOptions : function(o){
        AsyncUser.saveOptions(o);
    },

    onDisplayOptions : function(){
        this.getOptions().display();
    }


});