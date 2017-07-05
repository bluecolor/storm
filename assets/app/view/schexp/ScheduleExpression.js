Ext.define('App.view.schexp.ScheduleExpression',{
    extend: 'Ext.window.Window',
    xtype : 'scheduleexpression',

    requires: [
        'App.view.schexp.ScheduleExpressionController',
        'App.view.schexp.ScheduleExpressionModel',
        'App.view.pool.list.BasicList'
    ],

    viewModel   : 'scheduleexpression',
    controller  : 'scheduleexpression',

    modal       : false,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    maximized   : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    title       : 'Schedule Expression',

    layout      : 'fit',

    items: [
        {
            xtype      : 'tabpanel',
            bodyPadding: 20,
            items      : [
                {
                    title   : 'Try Expression',
                    layout  : 'form',
                    defaults: {
                        anchor : '100%'
                    },
                    tbar    : {
                        margin: '10 10 10 4',
                        items: [
                            {
                                reference: 'ExpressionType',
                                xtype: 'combobox',
                                valueField: 'name',
                                displayField: 'name',
                                editable: false,
                                width: 300,
                                bind: {
                                    store: '{expressionType}'
                                },
                                value: 'Text'
                            },
                            {
                                iconCls: 'test-tube',
                                handler: 'onTestExpression'
                            },
                            {
                                xtype    : 'displayfield',
                                reference: 'TestResult',
                                success  : function(v){
                                    this.setFieldStyle({
                                        color: '#26A65B',
                                        fontWeight: 'bold'
                                    });
                                    this.setValue(v);
                                },
                                error: function(v){
                                    this.setFieldStyle({
                                        color: '#D24D57',
                                        fontWeight: 'bold'
                                    });
                                    this.setValue(v);
                                }
                            }
                        ]
                    },
                    items: [
                        {
                            reference: 'Expression',
                            xtype : 'textarea',
                            grow  : true,
                            resizable: true
                        }
                    ]
                },
                {
                    title : 'Help - Text Expressions',
                    layout: {
                        type : 'hbox',
                        pack : 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            flex : 1,
                            xtype: 'tabpanel',
                            tabPosition: 'bottom',
                            tbar: {
                                name : 'tbar',
                                style: {
                                    backgroundColor: '#fffbca'
                                },
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        value: '<b>Click</b> on the <b>Rectangle</b>s for help!',
                                        fieldStyle: {
                                            color: '#807263'
                                        }
                                    }
                                ]
                            },
                            items: [
                                {
                                    title    : 'Schedule',
                                    height   : 500,
                                    scrollable: 'y',
                                    closable : false,
                                    listeners: {
                                        afterrender: function(me){
                                            var onthe   = function(){
                                                return Sequence('on the', Choice(0, 'first','last',NonTerminal('Number-Range')));
                                            };
                                            var every   = function(){
                                                return Sequence('every',
                                                    Choice(0,'weekend', 'weekday',
                                                        Sequence(
                                                            NonTerminal('Number'),
                                                            NonTerminal('Period'),
                                                            Choice(0,
                                                                Sequence('starting on the',NonTerminal('Number'),NonTerminal('Period')),
                                                                Sequence('between the',NonTerminal('Number'),'and', NonTerminal('Number')),
                                                                Skip()
                                                            )
                                                        )

                                                    )
                                                );
                                            };
                                            var after   = function(){
                                                return Sequence('after',
                                                    Choice(0,
                                                        Sequence(NonTerminal('Number'),NonTerminal('Period')),
                                                        NonTerminal('Time')
                                                    )
                                                );
                                            };
                                            var before  = function(){
                                                return Sequence('before',
                                                    Choice(0,
                                                        Sequence(NonTerminal('Number'),NonTerminal('Period')),
                                                        NonTerminal('Time')
                                                    )
                                                );
                                            };
                                            var at      = function(){
                                                return Sequence('at',
                                                    Choice(0,
                                                        'and',
                                                        NonTerminal('Time')
                                                    )
                                                );
                                            };
                                            var on      = function(){
                                                return Sequence('on',NonTerminal('Day'),
                                                    Choice(0,
                                                        NonTerminal('Day-Range'),
                                                        Skip()
                                                    )
                                                );
                                            };
                                            var _of     = function(){
                                                return Sequence('of',NonTerminal('Month'),
                                                    Choice(0,
                                                        NonTerminal('Month-Range'),
                                                        Skip()
                                                    )
                                                );
                                            };
                                            var _in     = function(){
                                                return Sequence('of',NonTerminal('Year'),
                                                    Choice(0,
                                                        NonTerminal('Year-Range'),
                                                        Skip()
                                                    )
                                                );
                                            };

                                            ComplexDiagram(
                                                Choice(0,onthe(),every(),after(), before(), at(),on(),_of(),_in())
                                            ).addTo( $('#{}-innerCt'.format(me.getId())).toArray()[0] );
                                        }
                                    }
                                },
                                {
                                    height   : 300,
                                    flex     : 1,
                                    title: 'Complex Schedule',
                                    listeners: {
                                        afterrender: function(me){
                                            ComplexDiagram(
                                                Sequence(
                                                    Choice(1,'also',NonTerminal('Schedule')),
                                                    Choice(0,Sequence(
                                                        'except',
                                                        Choice(1,'also',NonTerminal('Schedule'))
                                                    ),Skip())
                                                )
                                            ).addTo( $('#{}-innerCt'.format(me.getId())).toArray()[0] );
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            padding: '0 0 0 20',
                            flex  : 1,
                            layout: 'card',
                            items : [
                                {
                                    layout: {
                                        type : 'vbox',
                                        align: 'stretch',
                                        pack : 'start'
                                    },
                                    defaults: {
                                        cls  : 'scheduler-card',
                                        bodyPadding: 10
                                    },
                                    items : [
                                        {
                                            title: 'Period',
                                            items: [
                                                {
                                                    html: '<span class="expression-desc">s, sec, seconds, m, min, minutes, h, hours, day, day of ' +
                                                          'the month, day instance, day of the week, ' +
                                                          'day of the year, week, week of the year, month, year</span>'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Number',
                                            items: [
                                                {
                                                    html:
                                                    '<span class="expression-desc">' +
                                                    '1, 2, 3, ..., 1st, 2nd, 3rd, ...'+
                                                    '</span>'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Time',
                                            items: [
                                                {
                                                    html:
                                                    '<span class="expression-desc">' +
                                                    '8:00 am, 13:15, 6:00pm, ...'+
                                                    '</span>'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Day',
                                            items: [
                                                {
                                                    html:
                                                    '<span class="expression-desc">' +
                                                    'Sun, Sunday, Mon, Monday, ..., Sat, Saturday'+
                                                    '</span>'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Month',
                                            items: [
                                                {
                                                    html:
                                                    '<span class="expression-desc">' +
                                                    'Jan, January, Feb, February, ..., Dec, December'+
                                                    '</span>'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Year',
                                            items: [
                                                {
                                                    html:
                                                    '<span class="expression-desc">' +
                                                    '1970, 1971, ..., 2099'+
                                                    '</span>'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Help - Cron Expressions',
                    xtype: 'basiclist',
                    hideHeaders : false,
                    bind : {
                        store: '{cron}'
                    },
                    columns: [
                        {
                            text     : 'Field Name',
                            dataIndex: 'name'
                        },
                        {
                            text     : 'Required',
                            dataIndex: 'required',
                            renderer : function(v){
                                return v ? 'Yes':'No';
                            }
                        },
                        {
                            text     : 'Allowed Values',
                            dataIndex: 'allowedValues',
                            flex     : 1
                        },
                        {
                            text     : 'Allowed Special Characters',
                            dataIndex: 'allowedSpecialChars',
                            flex     : 1
                        }
                    ],
                    bbar: [
                        {
                            xtype: 'displayfield',
                            fieldCls: 'emph',
                            value: 'Cron expressions can be as simple as this: * * * * ? *<br>' +
                            'or more complex, like this: 0/5 14,18,3-39,52 * ? JAN,MAR,SEP MON-FRI 2002-2010'
                        }
                    ]
                }
            ]

        }
    ]




});