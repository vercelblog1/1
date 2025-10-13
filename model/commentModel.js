import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema] // array of replies inside a comment
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
