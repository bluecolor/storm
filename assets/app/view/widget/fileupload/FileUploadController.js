Ext.define('App.view.widget.fileupload.FileUploadController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.fileupload',

    upload: function(){

        var form = this.lookupReference('FileUpload').getForm(),
            contentType= this.getView().getContentType(),
            w = this.getView();

        switch (contentType){
            case Constants.FileContentType.TASK:
                this.fireEvent('submittaskupload',form, w);
                break;
            case Constants.FileContentType.SCHEDULER:
                this.fireEvent('submitschedulerupload',form,w);
                break;
        }
    },

    onClose: function(){
        this.getView().close();
    }

});