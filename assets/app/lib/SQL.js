Ext.define('App.lib.SQL',{
    singleton           : true,
    alternateClassName  : ['SQL'],

    /**
     * @deprecated use getStatement
     * @param query
     * @returns {*}
     */
    getStatementType : function(query){
        if(!query){
            return Constants.SQL.Statement.type.UNKNOWN;
        }
        query = _.trim(query).toLowerCase();

        if(_.startsWith(query,'select')){
            return Constants.SQL.Statement.type.DML.SELECT;
        }
        if(_.startsWith(query,'update')){
            return Constants.SQL.Statement.type.DML.UPDATE;
        }
        if(_.startsWith(query,'delete')){
            return Constants.SQL.Statement.type.DML.DELETE;
        }
        if(_.startsWith(query,'insert')){
            return Constants.SQL.Statement.type.DML.INSERT;
        }
        if(_.startsWith(query,'create')){
            return Constants.SQL.Statement.type.DDL.CREATE;
        }
        if(_.startsWith(query,'drop'))  {
            return Constants.SQL.Statement.type.DDL.DROP;
        }
        if(_.startsWith(query,'alter')) {
            return Constants.SQL.Statement.type.DDL.ALTER;
        }
    }


});