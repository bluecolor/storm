Ext.define('App.view.help.tips.TipsModel',{
    extend: 'Ext.app.ViewModel',
    alias : 'viewmodel.tips',

    stores: {
        tips: {
            fields:[
                {name:'text',type:'string'},
                {name:'img', type: 'auto'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },

            loadStore: function(){
                var data= [
                    {
                        text: 'Use <span class="emph">Settings</span> menu to manage application preferences.',
                        img : {
                            src: 'settings-menu.png',
                            width : 225,
                            height: 200
                        }
                    },
                    {
                        text: 'You can use <img src="resources/img/help-corn-16.png"/>' +
                        ' <span class="emph">Help</span> menu to find documentation, updates and other resources <br> about the application',
                        img : {
                            src: 'help-menu.png',
                            width : 160,
                            height: 160
                        }
                    },
                    {
                        text: 'To sign out and display account info, use ' +
                        '<img src="resources/img/user-blue-16.png"/>' +
                        ' <span class="emph">Account</span> menu on the top<br> navigation bar',
                        img : {
                            src: 'account-menu.png',
                            width : 300,
                            height: 200
                        }
                    }
                ];

                this.removeAll();
                this.loadRawData(_.shuffle(data));
            }
        }
    }
});