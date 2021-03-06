Template.PostLost.onRendered(function() {
  $('.tooltipped').tooltip({delay: 50});
  $('.modal').modal();
});

Template.PostLost.onCreated(function(){
  this.editMode = new ReactiveVar(false);
  Session.set("deletePostLostId", "");
});

Template.PostLost.helpers({
  showImage: function(){
    var post = PostsLost.findOne({_id: this._id});
    var imgId = post.file._id;
    var image = Images.findOne({_id: imgId});
    return image;
  },
  updatePostId: function() {
    return this._id;
  },
  editMode: function(){
    return Template.instance().editMode.get();
  },
  isAuthor: function() {
    var user = Meteor.user();
    if (!user) { return false; };

    var post = PostsLost.findOne({_id: this._id});
    if (!post) { return false; };

    return post.author === Meteor.userId();
  },
  changeStatus: function(){
    return this.status === "waiting"? false : true;
  }
});

Template.PostLost.events({
  'click .fa-trash' : function(){
    Meteor.call('deletePostLost', this._id);
  },
  'click .fa-pencil' : function(event, template){
    template.editMode.set(!template.editMode.get());
  },

  'click #updateStatus': function(){
    PostsLost.update(this._id, {
      $set: {
        status: "Found"
      }
    });
  },

  'click #redoStatus': function(){
    PostsLost.update(this._id, {
      $set: {
        status: "waiting"
      }
    });
  },

  'click .delete-post-lost-btn' : function() {
    Session.set("deletePostLostId", this._id);
  },
  'click .confirm-delete' : function() {
    var postId = Session.get("deletePostLostId");
    Meteor.call('deletePostLost', postId);
    FlowRouter.reload();
  }
});
