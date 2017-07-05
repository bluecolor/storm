Ext.define('App.view.sqleditor.SQLEditorScriptParser',{
    singleton           : true,
    alternateClassName  : ['ScriptParser'],


    getWord: function(editor) {
        var object = '';
        var line = editor.getSession().getLine(editor.getCursorPosition().row);
        if(!line) {
            /* no error msg here */
            return;
        }
        var column = editor.getCursorPosition().column;

        if(!line || line.trim().length<1){
            return;
        }
        line = this.sanitize(line);
        return this.sanitize(this.parseWord(line.split(''),column,column));
    },



    getQuery: function(editor){
        var script = '',
            content= editor.getValue(),
            cursor = editor.getCursorPosition().row;

        if(!content){
            return;
        }

        script = this.parseQuery(content.split('\n'),cursor,cursor)

        if(script && script[script.length-1]==";") {
            script = script.substring(0,script.length-1);
        }
        return script;

    },

    privates: {
        parseWord : function(chars,currentColumn, column) {

            if(currentColumn>chars.length || currentColumn<0){
                return "";
            }
            if(currentColumn!=column && (!chars[currentColumn] || chars[currentColumn].trim()=="")){
                return "";
            }

            var chr = chars[currentColumn] ? chars[currentColumn] : "";

            if(currentColumn < column ) {
                return this.parseWord(chars,currentColumn-1,column) + chr;
            }else if(currentColumn > column ){
                return chr + this.parseWord(chars,currentColumn+1,column);
            }else{
                return '{0}{1}{2}'.format(
                    this.parseWord(chars,currentColumn-1,column),
                    chr,
                    this.parseWord(chars,currentColumn+1,column)
                );
            }
        },

        parseQuery: function(content, currentLineNo, cursorLineNo){
            var script = this.sanitize(content[currentLineNo]);

            if(currentLineNo >= content.length || currentLineNo < 0 ) {
                return script;
            }
            if(currentLineNo != cursorLineNo && ! this.sanitize(content[currentLineNo])) {
                return script;
            }


            if(currentLineNo < cursorLineNo) {
                return '{0}\n{1}'.format(this.parseQuery(content, currentLineNo-1, cursorLineNo),script);
            } else if (currentLineNo > cursorLineNo) {
                return '{0}\n{1}'.format(script, this.parseQuery(content, currentLineNo+1, cursorLineNo));
            } else {
                script = "{0}\n{1}\n{2}".format(
                    this.parseQuery(content, currentLineNo-1, cursorLineNo),
                    script,
                    this.parseQuery(content, currentLineNo+1, cursorLineNo));
                return script;
            }
        },

        sanitize : function(string) {
            var str = (string ? _.trim(string) : undefined);
            if(str){
                str = _.trimEnd(str,';');
            }
            return (str == "" ? undefined : str);
        }
    }



});