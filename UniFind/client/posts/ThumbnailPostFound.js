Template.ThumbnailPostFound.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe('images');
  });
});

Template.ThumbnailPostFound.helpers({
  showImage: function(){
    // var post = PostsFound.findOne({_id: this._id});
    var imgId = this.file._id;
    var image = Images.findOne({_id: imgId});
    return image;
  },

  changeStatus: function(){
    return this.status === "waiting"? false : true;
  },
  username: function() {
    var post = PostsFound.findOne({_id: this._id});
    var userid = post.author;
    const user = Meteor.users.findOne(userid);
    return user.username;
  }
  /*title: function() {
    var post = PostsFound.findOne({_id: this._id});
    return post.summary;
  },
  category: function() {
    var post = PostsFound.findOne({_id: this._id});
    return post.category;
  },
  colour: function() {
    var post = PostsFound.findOne({_id: this._id});
    return post.colour;
  },
  desc: function(){
    var post = PostsFound.findOne({_id: this._id});
    return post.desc;
  },
  date: function(){
    var post = PostsFound.findOne({_id: this._id});
    return post.createdAt;
  }*/
});
