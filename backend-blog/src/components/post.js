import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
title:{
    type : String,
    required: true
},
text:{
    type : String,
    required: true,
    unique : true
},
tags:{
    type : Array,
    default: [],
},

viewsCount:{
    type:Number,
    default: 0,
},

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    },
  ],

  
postUrl: String


},{
    timestamps: true,
},
);

PostSchema.statics.getPopularTags = async function(){ 
  const tags = await this.find();

	const lastTags = [...new Set(tags.map(tag => tag.tags).flat())].slice(0, 5);
  
  return lastTags;
};

PostSchema.statics.updatePost = async function(postId){ 
  return await this.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $inc: { viewsCount: 1 },
    },
    {
      returnDocument: 'after'
    })
    .populate('user')
    .populate({
      path: 'comments.user',
      model: 'User',
    });
};

export default mongoose.model('Post',PostSchema);