Ext.define('App.view.sqleditor.SQLEditorPage',{
    extend: 'Ext.panel.Panel',
    xtype : 'sqleditorpage',
    layout: 'border',
    title : 'Page 1',
    
    requires: [
        'App.view.widget.AceEditor',
        'App.view.sqleditor.SQLEditorPageConsole',
        'App.view.sqleditor.SQLEditorScriptParser'
    ],

    items : [
        {
            region: 'center',
            layout: 'fit',
            scrollable: true,
            flex  : 1,
            items : [
                {

                    flex  : 1,
                    xtype : 'aceeditor',
                    listeners: {

                        'editorready': function(ae){
                            var editor  = ae.editor,
                                commands= editor.commands;

                            ae.setMode(Constants.Technology.PLSQL);
                            commands.addCommand({
                                name    : 'execute',
                                bindKey : {
                                    win: 'Ctrl-Enter',
                                    mac: 'Command-Enter'
                                },
                                exec    : function() {
                                    ae.fireEvent('executequery', ae);
                                },
                                readOnly: true
                            });
                            commands.addCommand({
                                name    : 'descword',
                                bindKey : {
                                    win: 'F4',
                                    mac: 'F4'
                                },
                                exec    : function(editor) {
                                    ae.fireEvent('descword', ae);
                                },
                                readOnly: true
                            });
                            commands.addCommand({
                                name    : 'descquery',
                                bindKey : {
                                    win: 'F6',
                                    mac: 'F6'
                                },
                                exec    : function(editor) {
                                    ae.fireEvent('descquery', ae);
                                },
                                readOnly: true
                            });

                            editor.setOptions({
                                enableBasicAutocompletion: true,
                                enableSnippets: true,
                                enableLiveAutocompletion: true
                            });
                        },
                        'executequery': function(ae){
                            var q = ScriptParser.getQuery(ae.editor);
                            if(!q){
                                Message.growl.warn('Nothing to execute!');
                                return;
                            }
                            var page = this.up('sqleditorpage');

                            this.lookupController().onExecuteQuery(page, q);
                        }
                    }
                }
            ]
        },
        {
            region: 'south',
            xtype : 'sqleditorpageconsole',
            split : true
        }
    ],

    listeners: {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.height = 1;
            }
        }
    }

});