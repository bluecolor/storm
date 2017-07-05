Ext.define('App.view.task.dependency.TaskGraph',{
    extend: 'Ext.panel.Panel',
    xtype : 'taskgraph',
    id    : 'task-graph',

    root  : undefined,
    tree  : undefined,
    vis   : undefined,

    convertToNode: function(task){

        var t = {
            id      : "{}$${}".format(task.id, Ext.id()),
            taskId  : task.id,
            name    : task.name,
            excluded: task.excluded
        };

        t.children = _.map(task.predecessors,function(p){
            return {
                id      : "{}$${}".format(p.id, Ext.id()),
                taskId  : p.id,
                name    : p.name,
                excluded: p.excluded
            };
        });

        return t;
    },


    convertTaskToNode: function(task){

        var node = {
            name    : task.name,
            excluded: task.excluded,
            valid   : task.valid,
            taskId  : task.id
        };

        node.children = _.map(task.predecessors,function(p){
            return {
                name    : p.name,
                excluded: p.excluded,
                valid   : p.valid,
                taskId  : p.id
            };
        });

        return node;

    },


    init  : function(task){

        var me = this;

        var margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = window.innerWidth,
            height = window.innerHeight;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y, d.x];
            });


        var svg  = d3.select("#task-graph-innerCt").append("svg:svg")
            .attr("class","svg_container")
            .attr("width",  width)
            .attr("height", height)
            .style("overflow", "scroll")
            .append("svg:g")
            .attr("class","drawarea")
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        function zoom() {

            var scale = d3.event.scale,
                translation = d3.event.translate,
                tbound = -height * scale,
                bbound = height * scale,
                lbound = (-width + margin.right) * scale,
                rbound = (width - margin.left) * scale;
            // limit translation to thresholds
            translation = [
                Math.max(Math.min(translation[0], rbound), lbound),
                Math.max(Math.min(translation[1], bbound), tbound)
            ];
            d3.select(".drawarea")
                .attr("transform", "translate(" + translation + ")" +
                " scale(" + scale + ")");
        }

        d3.select("svg")
            .call(d3.behavior.zoom()
                .scaleExtent([0.5, 5])
                .on("zoom", zoom));

        root = me.convertTaskToNode(task);
        root.x0 = height / 2;
        root.y0 = 0;

        function update(source) {

            //Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            nodes.forEach(function(d) { d.y = d.depth * 350; });

            var node = svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click)
                .on('contextmenu',function(d){
                    var nodes = tree.nodes(root).reverse();
                    d3.event.preventDefault();
                    me.lookupController()
                        .showTaskMenu([d3.event.x,d3.event.y],d.taskId,nodes,svg);
                });


            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6)
                .style("font-size", "14px")
                .style('fill', function(d){

                    if(d.valid == false){
                        return "#F30021";
                    }
                    if(d.excluded){
                        return "#F58F84";
                    }

                    return "#FFB505";

                });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1)
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; });

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        function click(d) {

            if(_.isEmpty(d.children) && _.isEmpty(d._children)){
                AsyncTask.find(d.taskId).success(function(data){
                    if(! _.isEmpty(data) ){
                        d.children = me.convertTaskToNode(data).children;
                        if( _.isEmpty(d.children) ){
                            Message.growl.warn("{} does not have dependency".format(d.name));
                        }else{
                            update(d);
                        }
                    }
                });
            }else{
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        }

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        root.children.forEach(collapse);
        update(root);

        d3.select(self.frameElement).style("height", "800px");


    }


});