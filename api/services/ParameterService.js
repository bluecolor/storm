var moment = require('moment');

module.exports = {


    find : function(id){
        return Parameter.find(id);
    },

    create : function(p){
        return Parameter.create(p);
    },

    update : function(id,p){
        return Parameter.update(id,p);
    },

    destroy: function(id){
        return Parameter.destroy(id);
    },

    findEvalByName: function(name, d){
        var me = this;
        return me.findEval(d).then((parameters)=>{
            return _.find(parameters,{name:name});
        });
    },

    findEval: function(d){
        var date,me = this;

        if(d){
            date = 'moment('+ d +', "YYYY.MM.DD")';
        }else{
            date = 'moment()';
        }

        var parse= (parameter,p) => {

            var refs,match = parameter.match(/\#\{(.*?)\}/g);

            if(match){
                refs =
                    match.map(ref => {
                        return {
                            ref  : ref,
                            param: ref.replace((/[\#\{\}/]+/g),'')
                        };
                    });
            }

            if(_.isEmpty(refs)){
                parameter = parameter.replace(/##/g,  date);
                return eval(parameter);
            }else{
                _.chain(refs).each((ref)=>{
                    var refParam = _.find(p, {name:ref.param});
                    if(refParam){
                        parameter = parameter.replace(ref.ref, refParam.value);
                    }
                });

                return parse(parameter,p);
            }
        };

        var _eval = (p)=> {
            return p.map((parameter)=>{

                var value = parse(parameter.value,p);
                if(value._isMomentObject){
                    value = value.format('YYYY.MM.DD')
                }
                return {
                    id   : parameter.id,
                    name : parameter.name,
                    value: value
                };
            });
        };

        return me.find().then(_eval);
    },

    format : function(s,d){
        var me = this;

        if(_.isEmpty(s)){
            return s;
        }

        return me.findEval(d).then(parameters=>{
            _.each(parameters,parameter=>{
                if(!_.isEmpty(s)){
                    s = s.replace('#{'+parameter.name+'}',parameter.value,'g');
                }
            });
            console.log(s);
            return s;
        });
    },
    save: function(parameters){
        return Parameter.find().then((_parameters)=>{
            return Promise.all(_.map(parameters,function(parameter){

                var p = _.find(_parameter,{name:parameter.name});

                if(p){
                    return Parameter.update(p.id,parameter).then(()=>{
                        return Parameter.findOne(c.id);
                    });
                }else{
                    return Parameter.create(parameter);
                }
            }));
        });
    }

};