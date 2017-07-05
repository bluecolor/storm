Ext.define('App.view.widget.clockpicker.ClockPicker',{
    extend: 'Ext.form.field.Text',
    xtype : 'clockpicker',

    editable: false,

    constructor: function(){
        var me = this;
        this.callParent(arguments);

        me.on('afterrender',function(){
            var input = $('#{0}'.format(me.getId()));
            var cp =
                input.clockpicker({
                    autoclose: false,
                    donetext : 'Done'
                });

            input.focusout(function(){
                setTimeout(function(){
                    input.clockpicker('hide');
                },200);
            });

        });
    }

});