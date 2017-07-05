Ext.define('App.view.widget.AceEditor',{
    extend: 'Ext.container.Container',
    xtype : 'aceeditor',

    editor: undefined,

    cls   : 'ace-editor',

    constructor: function(config){
        var me = this;

        me.callParent(arguments);
        me.on('afterrender', function(){

            var id = this.getId();

            ace.require("ace/ext/language_tools");
            me.editor = ace.edit(id);
            me.editor.$blockScrolling = Infinity;
            me.setFontSize(17);
            me.editor.getSession().on('change',function(e){
                var o = {
                    cursor: me.editor.selection.getCursor()
                };
                me.fireEvent('change',me.getValue(),o);
            });
            if(config.gutter != undefined){
                me.setShowGutter(config.gutter);
            }
            me.editor.setOptions({
                blockScrolling: Infinity
            });

            me.on('resize',function(){
                me.editor.resize();
            });

            me.fireEvent('editorready',me);
        });
    },

    setValue: function(v){
        this.editor.getSession().setValue(v);
        return this;
    },

    getValue: function(){
        try{
            return this.editor.getSession().getValue();
        }catch (e){
            throw 'NotRendered';
        }
        
    },

    setFontSize: function(s){
        var me = this;
        document.getElementById(me.getId()).style.fontSize='{}px'.format(s);
        return me;
    },

    setTabSize: function(s){
        var me = this;
        me.editor.getSession().setTabSize(s);
        return me;
    },

    setUseSoftTabs: function(b){
        this.editor.getSession().setUseSoftTabs(b);
    },

    setUseWrapMode: function(b){
        this.editor.getSession().setUseWrapMode(b);
        return this;
    },

    setHighlightActiveLine: function(b){
        this.editor.setHighlightActiveLine(b);
        return this;
    },

    setAutoComplete: function(b){
        this.editor.setOptions({
            enableBasicAutocompletion: b
        });
        return this;
    },

    setShowLineNumbers: function(b){
        this.editor.renderer.setOption('showLineNumbers', b);
        return this;
    },

    setShowGutter: function(b){
        this.editor.renderer.setShowGutter(b);
        return this;
    },


    setMode: function(m){
        var me=this, Mode;
        switch (m){
            case Constants.Technology.OS:
                Mode = ace.require("ace/mode/sh").Mode;
                break;
            case Constants.Technology.COFFEE_SCRIPT :
                Mode = ace.require("ace/mode/coffee").Mode;
                break;
            case Constants.Technology.JAVA_SCRIPT:
                Mode = ace.require("ace/mode/javascript").Mode;
                break;
            case Constants.Technology.PYTHON :
                Mode = ace.require("ace/mode/python").Mode;
                break;
            case Constants.Technology.RUBY :
                Mode = ace.require("ace/mode/ruby").Mode;
                break;
            case Constants.Technology.PLSQL:
                Mode = ace.require("ace/mode/sql").Mode;
                break;
            default :
                Mode = ace.require("ace/mode/text").Mode;
                break;
        }

        me.editor.session.setMode(new Mode());
    },

    setTheme: function(t){
        this.editor.setTheme('ace/theme/{}'.format(t));
    }


});