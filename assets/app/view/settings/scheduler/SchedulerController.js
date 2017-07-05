Ext.define('App.view.settings.scheduler.SchedulerController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.scheduler',


    onConnectionRender: function(c){
        var s = this.getViewModel().getStore('connections'),
            cnt = s.getCount();

        if(cnt>0){
            c.setValue(s.getAt(0).get('id'));
        }
    },

    onDisplayAddSchedulerTip: function(b){
        var o ={
            target: b
        };
        this.fireEvent('addschedulertip',o);
    },

    onDisplayAddConnectionTip: function(b){
        var o ={
            target: b
        };
        this.fireEvent('addconnectiontip',o);
    },


    onShowScheduler   : function(){
        var s = Ext.getStore(Constants.Store.SCHEDULER);
        if(s.count() == 0){
            var b = this.lookupReference('AddSchedulerButton').getId();
            $("#{}".format(b)).addClass('animated bounceOut')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated bounceOut');
                });
        }

        this.onDisplayAddSchedulerTip(this.lookupReference('AddSchedulerButton'));
    },

    onConnectionFocus : function(){
        var me = this;
        var c = this.lookupReference('Connection');
        var s = Ext.getStore(Constants.Store.CONNECTION);
        if(s.count() == 0){
            s.load({
                scope : this,
                callback: function(records, operation, success) {
                    if(success && records.length == 0){
                        me.onDisplayAddConnectionTip(c.down('button'));
                        var b = c.down('button').getId();
                        $("#{}".format(b)).addClass('animated bounceOut')
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('animated bounceOut');
                        });
                    }
                }
            });
        }
    },

    onDisplayConnections : function(){
        this.fireEvent('displayconnectioncreate');
    },

    onSearchScheduler : function(f,v) {
        var text = v.toUpperCase(),
            store= this.getView().getViewModel().getStore('schedulers');

        try {
            store.removeFilter('searchFilter');
        } catch (except){
            console.log(except);
        }

        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(
                    !text ||
                    reg.test((rec.get('name')).toUpperCase())
                ) {
                    return true;
                }
                return false;
            }});
    },

    onSideMenuToggle : function(b,s){
        this.lookupReference('SchedulerList').setVisible(s);
    },
    onClear : function(){
        this.lookupReference('SchedulerDetail').clear();
    },
    onDisplaySchedulerView: function(s) {
        this.fireEvent('displayschedulerview',s);
    },
    onDisplaySchedulerCreate : function(){
        this.fireEvent('displayschedulercreate');
    },
    onDeleteScheduler : function(s){
        this.fireEvent('deletescheduler',s);
    },
    onEditScheduler: function(s){
        this.fireEvent('displayscheduleredit',s);
    },
    onReloadSchedulers : function(){
        Ext.getStore(Constants.Store.SCHEDULER).load();
    },

    onSaveScheduler : function(){
        var s = this.getView().getValues();
        if(s.id){
            this.fireEvent('updatescheduler',s);
        }else{
            this.fireEvent('createscheduler',s);
        }
    }


});
