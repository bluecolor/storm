Ext.define('App.view.taskinstance.dependency.TaskInstanceDependencyController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.taskinstancedependency',


    requires: [
        'App.view.taskinstance.dependency.TaskInstanceDependencyMenu'
    ],

    showTaskMenu : function(pos, instanceId, nodes, svg){
        var me= this,
            m = Ext.create('App.view.taskinstance.dependency.TaskInstanceDependencyMenu')
                .showAt(pos);

        m.on('click',function(m,item){
            switch(item.name){
                case 'include'  : me.onIncludeInstance(instanceId,nodes,svg);    break;
                case 'exclude'  : me.onExcludeInstance(instanceId, nodes, svg);  break;
                case 'block'    : me.onBlockInstance(instanceId, nodes, svg);  break;
                case 'makeReady': me.onMakeReadyInstance(instanceId, nodes, svg);  break;
                case 'kill'     : me.onKillInstance(instanceId, nodes, svg);  break;
            }
        });
    },

    onKillInstance: function(instanceId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){

                        console.log(instanceId);
                        console.log(node.instanceId);
                        if(node.instanceId == instanceId){
                            node.status = Constants.Status.KILLED;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('killtaskinstance',instanceId,o);
    },

    onMakeReadyInstance: function(instanceId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.instanceId == instanceId){
                            node.status = Constants.Status.READY;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('makereadytaskinstance',instanceId,o);
    },


    onBlockInstance: function(instanceId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.instanceId == instanceId){
                            node.status = Constants.Status.BLOCKED;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('blocktaskinstance',instanceId,o);
    },

    onIncludeInstance: function(instanceId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.instanceId == instanceId){
                            node.excluded = false;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('includetaskinstance',instanceId,o);
    },

    onExcludeInstance: function(instanceId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.instanceId == instanceId){
                            node.excluded = true;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('excludetaskinstance',instanceId,o);
    },

    updateGraph: function(svg){
        svg.selectAll("text")
            .style('fill', function(d){
                return Constants.Color.getColorByStatus(d.status, d.excluded);
            });
    }





});