import express from "express";
import { getComments, getCommentsBySlug, postComments } from "../controller/commentController.js";
import { getAllBlogs, getBlogBySlug } from "../controller/blogController.js";

const route = express.Router()
route.get("/all",getAllBlogs);
route.get("/:slug",getBlogBySlug);
route.post("/comments/:slug",postComments);
route.get("/comments/:slug",getCommentsBySlug);

export default route