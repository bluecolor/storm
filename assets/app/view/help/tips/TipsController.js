Ext.define('App.view.help.tips.TipsController',{
    extend: 'Ext.app.ViewController',
    alias : 'controller.tips',

    onTipsRender: function(){
        var c = this.lookupReference('ShowTipsOnStartup')
        c.suspendEvent('change');
        c.setValue(App.lib.User.options.tipsOnStart);
        c.resumeEvent('change');

        this.getViewModel().getStore('tips').loadStore();
        this.onNextTip();
    },

    onNextTip: function(){
        var vw= this.getView(),
            s = this.getViewModel().getStore('tips'),
            tipCount = s.getCount();
        if(tipCount==0){
            return;
        }
        vw.currentTip++;
        this.onDisplayTip(vw.currentTip);

    },

    onPreviousTip: function(){
        var vw= this.getView(),
            s = this.getViewModel().getStore('tips'),
            tipCount = s.getCount();
        if(tipCount==0){
            return;
        }

        vw.currentTip--;
        this.onDisplayTip(vw.currentTip);
    },

    onDisplayTip: function(index){

        var  s = this.getViewModel().getStore('tips'),
            tipCount = s.getCount(),
            tip   = s.getAt(index),
            text  = tip.get('text'),
            img   = tip.get('img'),
            src   = 'resources/img/tips/{}'.format(img.src);

        this.lookupReference('PreviousTipButton')
            .setDisabled(index<=0);
        this.lookupReference('NextTipButton')
            .setDisabled(index>=tipCount-1);

        this.lookupReference('TipText').setValue(text);

        if(img){
            var i = this.lookupReference('TipImg');
            i.setSrc(src);
            i.setVisible(true);
            i.setWidth(img.width);
            i.setHeight(img.height);
        }else{
            i.setVisible(false);
        }
    },

    onShowTipsOnStartup: function(c,nv,ov){
        if(nv != ov){
            App.lib.User.options.tipsOnStart=nv;
            this.fireEvent('saveoptions');
        }
    }

});