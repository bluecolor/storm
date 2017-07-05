Ext.define('App.view.home.scheduler.SchedulerCard',{
    extend: 'Ext.panel.Panel',
    xtype : 'schedulercard'  ,

    title : 'Scheduler Name',
    layout: {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },
    cls   : 'scheduler-card',
    bodyPadding: 10,
    frame: true,
    margin: '0 0 10 0',

    schedulerId: undefined,

    tools   :[
        {
            type    : 'gear-tool',
            handler : function(e){
                var schedulerId= this.up('schedulercard').schedulerId;
                this.lookupController().onSchedulerCardMenu(e,schedulerId);
            }
        }
    ],

    items : [
        {
            xtype : 'container',
            layout: {
                type    : 'hbox',
                pack    : 'start',
                align   : 'stretch'
            },
            items: [
                {
                    padding : '0 20 20 0',
                    name    : 'clock',
                    xtype   : 'image',
                    src     : 'resources/img/status/clock/clock-running-48.png',
                    width   : 48,
                    height  : 48
                },
                {
                    xtype   : 'displayfield',
                    name    : 'status',
                    value   : 'RUNNING',
                    fieldCls: 'sch-status-text'
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type    : 'hbox',
                pack    : 'start',
                align   : 'stretch'
            },
            items: [
                {
                    name : 'progress',
                    xtype: 'progressbar',
                    value: 0.3,
                    flex : 1
                }
            ]
        }
    ],

    setClockImgByStatus: function(status){
        var img;

        switch (status){
            case Constants.Status.IDLE:
                img = 'resources/img/status/clock/clock-idle-48.png';
                break;
            case Constants.Status.RUNNING:
                img = 'resources/img/status/clock/clock-running-48.png';
                break;
            case Constants.Status.NOT_RUNNING:
                img = 'resources/img/status/clock/clock-not-running-48.png';
                break;
            default:
                img = 'resources/img/status/clock/clock-unknown-48.png';
        }

        this.down('image[name=clock]').setSrc(img);

    },

    setStatus: function(status){
        var color;
        this.down('displayfield[name=status]').setValue(status);
        this.setClockImgByStatus(status);

        if(status == Constants.Status.NOT_RUNNING){
            color = '#757D75';
        }else if(status == Constants.Status.RUNNING){
            color = '#428BCA';
        }else if(status == Constants.Status.IDLE){
            color = '#FFB505';
        }else if(status == Constants.Status.ERROR){
            color = '#F30021';
        }

        this.down('displayfield[name=status]')
            .setFieldStyle({
                fontWeight: 'bold',
                color     : color
            });
    },

    setProgress: function(progress){
        this.down('[name=progress]').setValue(progress);
    },

    constructor: function(){
        var me = this;
        me.callParent(arguments);


        me.on('afterrender', function(){
            var id = me.getId();
            $('#{}'.format(id)).on('click',function(e){
                if($(e.target).attr('data-ref') != 'toolEl'){
                    me.fireEvent('schedulercardclick',me);
                }
            });
        });
    }



});