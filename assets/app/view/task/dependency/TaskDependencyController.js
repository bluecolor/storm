Ext.define('App.view.task.dependency.TaskDependencyController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.taskdependency',

    requires: [
        'App.view.task.dependency.TaskDependencyMenu'
    ],

    showTaskMenu : function(pos, taskId, nodes, svg){
        var me= this,
            m = Ext.create('App.view.task.dependency.TaskDependencyMenu').showAt(pos);

        m.on('click',function(m,item){
            switch(item.name){
                case 'include'   : me.onIncludeTask(taskId,nodes,svg);    break;
                case 'exclude'   : me.onExcludeTask(taskId, nodes, svg);    break;
                case 'activate'  : me.onActivateTask(taskId,nodes, svg);   break;
                case 'deactivate': me.onDeActivateTask(taskId, nodes, svg); break;
            }
        });
    },

    onIncludeTask: function(taskId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.taskId == taskId){
                            node.excluded = false;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('includetask',taskId,o);
    },

    onExcludeTask: function(taskId, nodes, svg){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.taskId == taskId){
                            node.excluded = true;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('excludetask',taskId,o);
    },

    onActivateTask: function(taskId){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.taskId == taskId){
                            node.active = true;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('activatetask',taskId,o);
    },

    onDeActivateTask: function(taskId){
        var me= this;
        var o = {
            cb: {
                success: function(d){
                    _.each(nodes,function(node){
                        if(node.taskId == taskId){
                            node.active = false;
                        }
                    });
                    me.updateGraph(svg);
                }
            }
        };

        this.fireEvent('deactivatetask',taskId,o);
    },

    updateGraph: function(svg){
        svg.selectAll("text")
            .style('fill', function(d){
                if(d.valid == false){ return "#F30021"; }
                if(d.excluded){ return "#F58F84"; }
                return "#FFB505";
            });
    }





});