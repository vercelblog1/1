import express from "express"
import { login } from "../controller/loginController.js";
import { authMiddleware } from "../auth/authMiddle.js";

import { createBlog, deleteBlog, getAllBlogs, adminBlogBySlug, updateBlog } from "../controller/blogController.js";

import { deleteComment, getComments, postReply, updateReply } from "../controller/commentController.js";

import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";

const route = express.Router()
route.post("/login",login);
route.post("/create",authMiddleware,createBlog);
route.get("/getblogs",authMiddleware,getAllBlogs);
route.put("/update/:id",authMiddleware,updateBlog);
route.delete("/delete/:id",authMiddleware,deleteBlog);
route.get("/:slug",adminBlogBySlug);
route.get("/comments/get",authMiddleware,getComments);
route.post("/reply/:commentId",authMiddleware,postReply)
route.put("/comment/:commentId/reply/:replyId",authMiddleware,updateReply)
route.delete("/delete/comment/:commentId",authMiddleware,deleteComment);

//products 

route.post("/product/add",authMiddleware,createProduct);
route.put("/product/update/:id",authMiddleware,updateProduct);
route.delete("/product/delete/:id",authMiddleware,deleteProduct);
route.get("/product/get",getProduct);

export default route;