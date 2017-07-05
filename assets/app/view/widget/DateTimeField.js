Ext.define('App.view.widget.DateTimeField', {

    extend : 'Ext.form.FieldContainer',
    xtype  : 'datetimefield',

    requires: [
        'App.view.widget.PaddedNumberField'
    ],

    layout  : 'hbox',
    defaults: {layout: '100%'},

    items: [
        {
            xtype       : 'datefield',
            anchor      : '100%',
            format      : 'Y.m.d',
            submitFormat: 'Ymd',
            name        : 'startDate',
            allowBlank  : true,
            editable    : false,
            flex : 1
        },
        {
            xtype       : "paddednumberfield",
            name        : 'hour',
            width       : 50,
            minValue    : -1,
            maxValue    : 24,
            listeners   : {
                spinup:function(h) {
                    if(h.getValue()===23 )
                        h.setValue(-1)
                },
                spindown:function(h) {
                    if(h.getValue()===0 || h.getValue() === null)
                        h.setValue(24)


                },
                validitychange: function( h,isValid) {
                    if(isValid===false)
                        h.setValue(0);
                }
            },

            validator : function() {
                var d = this.up('datetimefield').down('datefield').getValue();
                var h = this.getValue();

                if(!d && h ) {
                    return 'When date field is set Hour and Minute fields can not be empty';
                }

                return true;
            }
        },
        {
            xtype       : 'paddednumberfield',
            name        : 'minute',
            width       : 50,
            minValue    : -1,
            maxValue    : 60,
            listeners   : {
                spinup:function(m) {
                    if(m.getValue()===59)
                        m.setValue(-1)
                },
                spindown:function(m) {
                    if(m.getValue()=== 0 || m.getValue() === null)
                        m.setValue(60)
                }
            },
            validitychange: function( m,isValid) {
                if(isValid===false)
                    m.setValue(0);
            },

            validator : function() {
                var d = this.up('datetimefield').down('datefield').getValue();
                var m = this.getValue();

                if(!d && m) {
                    return 'When date field is set Hour and Minute fields can not be empty';
                }

                return true;
            }
        }
    ],

    isValid : function() {
        var h = this.down('paddednumberfield[name=hour]');
        var m = this.down('paddednumberfield[name=minute]');

        return h.isValid() && m.isValid();
    },


    setReadOnly:function(b) {
        this.down('datefield').setReadOnly(b);
        this.down('paddednumberfield[name=hour]').setReadOnly(b);
        this.down('paddednumberfield[name=minute]').setReadOnly(b);
    },


    reset : function() {
        this.down('datefield').reset();
        this.down('paddednumberfield[name=hour]').reset();
        this.down('paddednumberfield[name=minute]').reset();
    },

    initDateTime : function() {
        var d = this.down('datefield'),
            h = this.down('paddednumberfield[name=hour]'),
            m = this.down('paddednumberfield[name=minute]');

        if( !d.getValue() &&!h.getValue()&& !m.getValue()) {
            d.setValue(new Date());
            h.setValue(0);
            m.setValue(0);
        }

    },

    setValue : function(v) {

        if(!v) return;

        var date  = v.substring(0,10),
            hour  = v.substring(11,13),
            minute= v.substring(14,16);

        this.child('datefield').setValue(date);
        this.child('paddednumberfield[name=hour]').setValue(hour);
        this.child('paddednumberfield[name=minute]').setValue(minute);
    },

    getValue : function() {

        if(     this.child('datefield').getValue()===null
            ||  this.child('paddednumberfield[name=hour]').getValue()   === null
            ||  this.child('paddednumberfield[name=minute]').getValue() === null)
            return null;

        var v = Ext.Date.format( this.child('datefield').getValue(), 'Ymd')
            +  Ext.String.leftPad(this.child('paddednumberfield[name=hour]').getValue(), 2, '0')
            +  Ext.String.leftPad(this.child('paddednumberfield[name=minute]').getValue(), 2, '0');

        return v;
    }

});
