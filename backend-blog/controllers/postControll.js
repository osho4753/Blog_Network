import PostSchema from '../components/post.js';


export const getLastTags = async (req,res) =>{
    try{
    
        const tags = await PostSchema.find();

        const lastTags = [...new Set(tags.map(tag => tag.tags).flat())].slice(0, 5);

        res.json(lastTags);
    
    }catch(err){
        console.log(err);
            res.status(500).json({
    
                message:'Cant find tags'
    
            });
    }
};

export const getAllPosts = async (req,res) =>{
try{

    const posts = await PostSchema.find().populate('user');
    res.json(posts);

}catch(err){
    console.log(err);
        res.status(500).json({

            message:'Cant find posts'

        });
}
};

export const getOnePost = async (req,res) =>{
    try{
        const post_id = req.params.id;
        const updatedDoc = await PostSchema.findOneAndUpdate(
        {
            _id:post_id,
        },
        {
            $inc:{viewsCount:1},
        },
        {
            returnDocument:'after'
        })
        .populate('user')
    
        if(!updatedDoc){
                return res.status(404).json({
                message:'Cant find post'
                })
        }
        
        res.json(updatedDoc);
        
    }catch(err){
        console.log(err);
            res.status(500).json({
    
                message:'Cant find exact post'
    
            });
    }
};

export const postCreate = async(req, res) => {
    try{
        const doc = new PostSchema({

            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            postUrl:req.body.postUrl,
            user:req.userId,
        })

        const post = await doc.save();
        res.json(post);
    }catch(err){

        console.log(err);
        res.status(500).json({

            message:'Error saving post'

        });
    }

};

export const deletePost = async (req,res) =>{
    try{

        const post_id = req.params.id;

        const deletedDoc = await PostSchema.findOneAndDelete(
        {
            _id:post_id,
        })

        if(!deletedDoc){
                return res.status(404).json({
                message:'Cant find post'
                })
        }
        
        res.json({
            message:'Post deleted'
        });
        
    }catch(err){
        console.log(err);
            res.status(500).json({
    
                message:'Cant find exact post'
    
            });
    }
};

export const updatePost = async (req,res) =>{
    try{

        const post_id = req.params.id;

        await PostSchema.updateOne(
        {
            _id:post_id,
        },{
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            postUrl:req.body.postUrl,
            user:req.userId,
        })
        
        res.json({
            message:'Post updated'
        });
        
    }catch(err){
        console.log(err);
            res.status(500).json({
    
                message:'Cant update exact post'
    
            });
    }
};

export const getPostsByTag = async (req,res) =>{
    try{
        const tagName = req.params.name;
        const tagsbyPost = await PostSchema.find({ tags: tagName }).populate('user').exec();
        res.json(tagsbyPost)
    }catch(err){
        console.log(err);
            res.status(500).json({
    
                message:'Cant find tags'
    
            });
    }
};
