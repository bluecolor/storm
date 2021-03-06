Ext.define('App.view.home.session.HomeSessionsModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.homesessions',

    stores: {
        sessions : {
            source: Constants.Store.SESSION,
            listeners: {
                load: function(s){
                    s.clearFilter();
                    var data = _.map(s.data.items, 'data');
                    var latest = [];

                    var g = _.groupBy(data,'plan.id');
                    _.forOwn(g,function(v,k){
                        latest.push(_.chain(v).orderBy('date',['desc']).first().value())
                    });

                    var filter = function(r){
                        var i = [
                            Constants.Status.RUNNING,
                            Constants.Status.READY,
                            Constants.Status.ABORTED,
                            Constants.Status.ERROR
                        ].indexOf(r.get('status'));

                        if(i>-1){
                            return true;
                        }

                        return _.map(latest, 'id').indexOf(r.get('id')) > -1;
                    };
                    s.filterBy(filter);
                }
            }
        }
    }


});