Template.Post.onCreated(function(){
  this.editMode = new ReactiveVar(false);
});

Template.Post.helpers({
  updatePostId: function() {
    return this._id;
  },
  editMode: function(){
    return Template.instance().editMode.get();
  },
  isAuthor: function() {
    var user = Meteor.user();
    if (!user) { return false; };

    var post = Posts.findOne({_id: this._id});
    if (!post) { return false; };

    return post.author === Meteor.userId();
  }
});

Template.Post.events({

  'click .fa-trash' : function(){
    Meteor.call('deletePost', this._id);
  },
  'click .fa-pencil' : function(event, template){
    template.editMode.set(!template.editMode.get());
  }
});
