Ext.define('App.view.messagebox.CreateSchedulerMessage',{
  extend: 'Ext.window.Window',
  xtype : 'createschedulermessage',

  modal       : true,
  resizable   : false,
  collapsible : false,
  animCollapse: false,
  maximizable : false,
  width       : 435,
  height      : 185,
  bodyPadding : 20,
  title       : 'No Scheduler Found!',

  layout: {
    type  : 'vbox',
    pack  : 'start',
    align : 'stretch'
  },

  bbar: {
    name    : 'bbar',
    margin  : '0 10 10 10',
    items   : [
      {
        xtype : 'button',
        name  : 'createButton',
        flex  : 1,
        scale : 'medium',
        cls   : 'blue-text',
        text  : 'Create Scheduler'
      }
    ]
  },

  items: [
    {
      name : 'message',
      xtype: 'displayfield',
      fieldStyle: {
        fontSize: "14px",
        color   : "#3F3F3F"
      }
    }
  ],

  display : function(cb){

    var me = this
    message =
      'There is no <b>Scheduler</b>. You must create a scheduler first.';


    this.down('displayfield[name=message]').setValue(message);

    this.down('button').on('click',function(){
      me.close();
      cb();
    });

    return this.show()
  }

});
