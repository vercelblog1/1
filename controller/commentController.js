import Blog from "../model/blogModel.js";
import Comment from "../model/commentModel.js";
export const postComments = async(req,res)=>{
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({slug})
        if(!blog) return res.json({success:false,message:"Blog not found"});
        const {username , email , text} = req.body
        if(!username || !email || !text) return res.json({success:false,message:"Missing fields"});
       const comment = new Comment({blog:blog._id,username,email,text});
       await comment.save()
        res.json({success:true,message:"Comment added",comment})
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const postReply = async(req,res)=>{
    const user = req.user;
    if(!user) return res.status(201).json({message:"User not found"});
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const comment = await Comment.findById(commentId);
        if(!comment) return res.status(404).json({success:false,message:"Comment not found"});
        if(!text) return res.json({success:false,message:"Missing fields"});
        comment.replies.push({username:user.username,text});
        await comment.save();
        res.json({ success: true, message: "Reply added", comment });
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const updateReply = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  try {
    const { commentId, replyId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: "Reply text is required" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    const reply = comment.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ success: false, message: "Reply not found" });
    }
    if (reply.username !== user.username) {
      return res.status(403).json({ success: false, message: "Not authorized to edit this reply" });
    }
    reply.text = text;
    await comment.save();
    res.json({ success: true, message: "Reply updated successfully", reply });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req,res) => {
    const user = req.user;
    if (!user) {
    return res.status(401).json({ success: false, message: "User  not found" });
    }
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
        } 
        await Comment.findByIdAndDelete(commentId)
        res.json({ success: true, message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getCommentsBySlug = async (req,res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({slug});
        if(!blog) return res.json({success:false,message:"Blog not found"})
        const comments = await Comment.find({blog:blog._id}).sort({ createdAt: -1 })
       res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getComments = async (req,res) => {
    try {
        const comments =  await Comment.find().sort({createdAt: -1 })
        res.json({success:true,comments})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}