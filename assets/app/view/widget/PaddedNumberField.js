Ext.define('App.view.widget.PaddedNumberField', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.paddednumberfield',

    zeroPadding: 2,

    initComponent: function(){
        this.callParent();
    },

    rawToValue: function(rawValue) {
        var value = this.callParent([rawValue]);
        return  value;
    },

    valueToRaw: function(value) {
        value = this.callParent([value]);
        if(this.zeroPadding){
            if(value)
                value = Ext.String.leftPad(value, this.zeroPadding, '0');
        }
        return value;
    },

    getSubmitValue: function() {
        var value = this.callParent();
        /*if(this.zeroPadding && typeof(value) == 'string'){
         value = value.replace(/^0+/g, '');
         }*/
        return value;
    }

});
