Ext.define('App.view.pool.textfield.SearchTextField',{

    extend   : 'Ext.form.field.Text',
    xtype    : 'searchtextfield',


    emptyText: 'Search...',

    width    : 300,

    listeners : {
        afterrender: function (f) {
            f.inputEl.setStyle({
                'background-image':    'url(resources/img/search-gray-16.png)',
                'background-repeat':   'no-repeat',
                'background-position': '3px center',
                'padding-left':        '25px'
            });
        }
    }

});
