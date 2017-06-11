Template.ThumbnailPostFound.helpers({
  title: function() {
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
  }
});