module.exports = {

    find: function (id) {
        return IssueTag.find(id);
    },

    findByTag: function (tag) {
        return IssueTag.find({tag:tag});
    },

    create: function(tag){
        return IssueTag.create(tag);
    },

    update: function(id, tag){
        return Issuetag.update(id,tag).then(function(tag){
            return tag;
        });
    },

    destroy: function(id) {
        return IssueTag.destroy(id);
    }



};