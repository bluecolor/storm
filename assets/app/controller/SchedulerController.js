Ext.define('App.controller.SchedulerController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.widget.fileupload.FileUpload',
        'App.view.settings.scheduler.Scheduler'
    ],

    refs : [
        {
            ref         : 'scheduler',
            xtype       : 'scheduler',
            autoCreate  : true,
            selector    : 'scheduler'
        },
        {
            xtype       : 'fileupload',
            ref         : 'fileUpload',
            selector    : 'fileupload',
            autoCreate  : true,
            forceCreate : true
        }
    ],


    init: function() {

        this.listen({
            controller: {
                '*': {
                    'displayschedulerview'  : this.onDisplaySchedulerView,
                    'displayscheduleredit'  : this.onDisplaySchedulerEdit,
                    'displayschedulercreate': this.onDisplaySchedulerCreate,
                    'createscheduler'       : this.onCreateScheduler,
                    'updatescheduler'       : this.onUpdateScheduler,
                    'deletescheduler'       : this.onDeleteScheduler,
                    'downloadscheduler'     : this.onDownloadScheduler,
                    'uploadscheduler'       : this.onUploadScheduler,
                    'submitschedulerupload' : this.onSubmitSchedulerUpload
                }
            }
        });

        this.listenSocket();
    },

    onSubmitSchedulerUpload: function(form, w){
        if(form.isValid()){
            form.submit({
                url     : 'scheduler/upload',
                waitMsg : 'Uploading objects ...',
                success : function(f, r) {
                    try{
                        Message.growl.success('Uploaded completed')
                    }catch(e){
                        Message.growl.warning('Uploaded file with error in response!');
                        Message.growl.error(e);
                    }
                    if(w){
                        w.close();
                    }
                    location.reload();
                },
                failure: function(f, a){
                    Message.growl.error('Unable to upload file!');
                    console.log('error',a);
                }
            });
        }
    },

    onDownloadScheduler: function(o){
        var schedulerId = App.lib.Session.getSchedulerId();
        AsyncScheduler.download(schedulerId,o);
    },

    onUploadScheduler: function(){
        this.getFileUpload()
            .setContentType(Constants.FileContentType.SCHEDULER)
            .show();
    },

    onDisplaySchedulerView  : function(s){
        this.getScheduler().view(s);
    },
    onDisplaySchedulerEdit  : function(s){
        this.getScheduler().edit(s);
    },
    onDisplaySchedulerCreate: function() {
        this.getScheduler().create();
    },

    onCreateScheduler : function(s,o){
        var me= this,
            o = {
            cb : {
                success: function(schedulerId){
                    me.fireEvent('schedulercreated',schedulerId);
                }
            }
        };

        AsyncScheduler.create(s,o);
    },
    onUpdateScheduler : function(s,o){
        AsyncScheduler.update(s,o);
    },
    onDeleteScheduler : function(options){

        if(!options.force){
            var schName = Ext.getStore(Constants.Store.SCHEDULER).getById(options.id).get('name'),
                be = {
                    name        : 'deletescheduler',
                    objectType  : 'scheduler',
                    objectName  : schName,
                    options     : options
                };

            this.fireEvent('deleteintercept',be);
        }else{
            AsyncScheduler.destroy(options.id);
        }

    },

    listenSocket: function(){
        io.socket.on('SchedulerDestroyed', function (sch) {
            if(sch){
                var info = {
                    title: '{} Deleted'.format(sch.name),
                    body : '{} Deleted. Browser will reload in 15 seconds...'.format(sch.name)
                };
                Message.notify.info(info);
                setTimeout(function(){
                    location.reload();
                },15000);
            }
        });
    }



});
