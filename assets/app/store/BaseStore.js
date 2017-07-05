Ext.define('App.store.BaseStore',{
    extend  : 'Ext.data.Store',
    autoLoad: false,
    autoSync: false,
    storeFilters : [],

    proxy: {
        type: 'rest',
        reader  : {
            type  : 'json'
        },
        writer  : {
            type  : 'json'
        },
        actionMethods: {
            create  : 'POST',
            read    : 'GET',
            update  : 'PUT',
            destroy : 'DELETE'
        },
        api: {
            create  : '',
            read    : '',
            update  : '',
            destroy : ''
        }
    },

    constructor:function() {
        var me = this;
        me.callParent(arguments);
        me.proxy.on('exception',function(){
            me.rejectChanges();
        });
    },

    createAndSync : function(data, options){
        var me = this;

        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        var error = function(r, o){
            Message.growl.error(me.getCreateError());
            me.rejectChanges();
        };

        var success = function(r, o){
            me.loadRawData(r,true);
            Message.growl.success(me.getCreateSuccess());
            try {
                if(options && options.callback && options.callback.success){
                    options.callback.success();
                }
            }catch(e){
                console.log(e)
            }
        };


        return $.ajax({
            type    : 'POST',
            url     : me.proxy.api.create,
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(data),
            success     : success,
            error       : error,
            always      : always});
    },

    updateAndSync : function(data, options){
        var me = this;

        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        var error = function(r, o){
            Message.growl.error(me.getUpdateError());
            me.rejectChanges();
        };

        var success = function(r, o){
            me.remove(me.findRecords([r]));
            me.loadRawData(r,true);
            Message.growl.success(me.getUpdateSuccess());
        };


        return $.ajax({
            type        : 'PUT',
            url         : me.proxy.api.update.format(data['id']),
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(data),
            success     : success,
            error       : error,
            always      : always});
    },

    destroyAndSync : function(data, options){
        var me = this;

        var always = function(){
            try {
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        };

        var error = function(r, o){
            Message.growl.error(me.getDeleteError());
            me.rejectChanges();
        };

        var success = function(res){
            var p = me.getModel().idProperty;
            _.each(res,function(r){
                me.removeAt(me.findExact(p,r[p]));
            });
            Message.growl.success(me.getDeleteSuccess());
        };

        var url = me.proxy.api.destroy + '/' + data;

        return $.ajax({
            type    : 'DELETE',
            url     : url,
            contentType : 'application/json',
            success     : success,
            error       : error,
            always      : always});
    },

    findRecords : function(data){
        var me = this;
        var idProperty = me.getModel().idProperty;

        var map = function(id){
            return me.getAt(me.findExact(idProperty,id));
        };

        return _.map(data,map);
    },

    getRawData : function() {
        var d = (this.data || this.snapshot).items ;
        return _.map(d, 'data');
    },

    findExactBy : function(p, v) {

        var i = this.findExact(p, v);
        if(i > -1){
            return this.getAt(i).data;
        }
        return undefined;
    },


    listeners: {
        load :function(){
            var me = this;
            var name = Ext.getClassName(me);
            console.log('Loaded {0} ({1})'.format(name, me.getCount()) );
        },
        exception: function (proxy, response, operation) {
            console.log('Exception');
            this.rejectChanges();
        }
    },



    /* Message ----------------------------------------------------------------------------*/

    displayField    : 'name',
    createSuccess   : 'Created record',
    createError     : 'Failed to create record!',

    updateSuccess   : 'Updated record',
    updateError     : 'Failed to update record!',

    deleteSuccess   : 'Deleted record',
    deleteError     : 'Failed to delete record!',

    /* Create Success */
    getCreateSuccess : function(d){
        return (!d || !this.displayField) ?
            this.createSuccess : '{0} {1}'.format(this.createSuccess,d[this.displayField]);
    },

    /* Create Error */
    getCreateError : function(d){
        return (!d || !this.displayField) ?
            this.createError : '{0} {1}'.format(this.createError,d[this.displayField]);
    },

    /* Update Success */
    getUpdateSuccess : function(d){
        return (!d || !this.displayField) ?
            this.updateSuccess : '{0} {1}'.format(this.updateSuccess,d[this.displayField]);
    },

    /* Update Error */
    getUpdateError : function(d){
        return (!d || !this.displayField) ?
            this.updateError : '{0} {1}'.format(this.updateError,d[this.displayField]);
    },

    /* Delete Success */
    getDeleteSuccess : function(d){
        return (!d || !this.displayField) ?
            this.deleteSuccess : '{0} {1}'.format(this.deleteSuccess,d[this.displayField]);
    },

    /* Delete Error */
    getDeleteError : function(d){
        return (!d || !this.displayField) ?
            this.deleteError : '{0} {1}'.format(this.deleteError,d[this.displayField]);
    },

    /* ---------------------------------------------------------------------------------- */

    sync : function(){}

});