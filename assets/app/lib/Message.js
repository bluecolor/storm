/**
 *  Contains feedback messages
 *  */
Ext.define('App.lib.Message',{
    singleton : true,
    alternateClassName : ['Message'],

    requires: [
        'App.lib.Notify'
    ],

    notify: {
        error: function(error){
            _Notify.error(error);
            Sound.error();
        },
        info: function(info){
            _Notify.info(info);
            Sound.info();
        }
    },


    /* ext-js based messages are managed here */
    ext  : {

        progress : function(msg,icon){
            this.showWait(msg,icon);
        },
        showWait : function(msg,icon){
            icon = !icon ? 'save-32' : icon;

            if(msg === undefined||msg===null)
                msg = 'Processing your request, please wait...';

            var mb=
                Ext.MessageBox.show({
                    msg         : msg,
                    progressText: 'Processing...',
                    width       : 300,
                    wait        : true,
                    waitConfig  : {interval:200},
                    icon        : icon
                });
            return mb;
        },

        errorDetailed :function(message,data) {
            var me = this;
            var mb = Ext.create('Ext.window.MessageBox');

            mb.show({
                title   : 'Error',
                msg     : message + '<br>'
                + 'Click "Details" button for more information',
                buttonText  : {yes: 'Details',no: 'Close'},
                buttons     : Ext.MessageBox.YESNO,
                icon        : 'error-red-32',
                fn: function(b){
                    if(b === 'yes') {
                        me.showMessageDetail(data);
                    }

                }
            });
        },

        showMessageDetail : function(data) {
            var w=Ext.create('App.view.plugin.AjaxResponseWindow');
            var g = w.down('ajaxresponsegrid');

            try {
                var json = JSON.parse(data.info);
                g.loadData(json);
            }catch (e){
                g.store.loadRawData(data);
            }

            w.show();
        },

        success : function(message) {
            var mb = Ext.create('Ext.window.MessageBox');
            mb.show({
                title   : 'Success',
                msg     : message,
                buttons : Ext.MessageBox.OK,
                icon    : 'success-32'
            });
            return mb;
        },

        ask : function(cb, msg){

            msg = msg ? msg : 'Save Changes?';

            return Ext.MessageBox.show({
                title   : 'Confirm',
                msg     : msg,
                buttons : Ext.MessageBox.OKCANCEL,
                fn      : cb,
                icon    : Ext.MessageBox.QUESTION
            });
        }

    },

    /* growl messages are managed here */
    growl: {

        settings: {
            type    : 'success',
            z_index : 999999,
            position: 'top-center',
            allow_dismiss: false,
            placement: {
                from : "top",
                align: "center"
            },
            delay: 5000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            }
        },

        success : function(message) {
            var me = this;
            if(!message) {message = "Success";}

            this.settings['type'] = 'success';

            $.growl({
                message : message
            },me.settings);
        },

        info : function(message) {
            var me = this;
            if(!message) {message = "Info";}

            this.settings['type'] = 'info';

            $.growl({
                message : message
            },me.settings);
        },

        error : function(message) {
            var me = this;
            if(!message) {message = "Error!";}

            me.settings['type'] = 'danger';
            $.growl({
                message : message
            },me.settings);
        },

        warn: function(message){
            this.warning(message);
        },

        warning : function(message) {
            var me = this;
            if(!message) {message = "Warning";}

            me.settings['type'] = 'warning';
            $.growl({
                message : message
            },me.settings);
        }

    }

});