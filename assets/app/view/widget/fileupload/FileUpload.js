Ext.define('App.view.widget.fileupload.FileUpload',{

    extend      : 'Ext.window.Window',
    xtype       : 'fileupload',

    requires    : [
        'App.view.widget.fileupload.FileUploadController'
    ],

    controller  : 'fileupload',

    contentType : undefined,

    modal       : true,
    width       : 400,
    height      : 150,
    collapsible : false,
    animCollapse: false,
    maximizable : false,
    resizable   : false,
    layout      : 'fit',
    title       : 'Upload',
    bodyPadding : 10,


    items : [
        {
            layout      : 'form',
            xtype       : 'form',
            name        : 'fileUploadForm',
            reference   : 'FileUpload',
            defaults    : {
                anchor     : '100%',
                labelAlign : 'top'
            },
            items : [
                {
                    name       : 'file',
                    required   : true,
                    allowBlank : false,
                    xtype      : 'fileuploadfield',
                    fieldLabel : 'Select File',
                    msgTarget  : 'side'
                }]
        }],

    buttons: [
        {
            text:'Close',
            handler: 'onClose'
        },
        {
            text:'Save',
            listeners : {
                click : function(b) {
                    this.lookupController().upload();
                }
            }
        }
    ],

    setContentType: function(t){
        this.contentType = t;
        return this;
    },

    getContentType: function(){
        return this.contentType;
    }
});