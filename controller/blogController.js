import Blog from "../model/blogModel.js";

export const createBlog = async(req,res)=>{
    const user = req.user;
    if(!user) return res.status(201).json({message:"User not found"});
   try {
    const { slug, blocks,category } = req.body;

    // check slug uniqueness
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }

    const blog = new Blog({
      slug,
      blocks,category,
      author: req.user.username // assuming you use auth middleware
    });

    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


export const getBlogBySlug = async (req,res) => {
    try {       
      const {slug} = req.params
    const blog = await Blog.findOne({ slug });
  
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
      //  Find related blogs
    const related = await Blog.find({
      category: blog.category,
      slug: { $ne: slug },
      isPublished: true
      }).select("slug blocks author")
      .limit(5);

      blog.views +=1;
      await blog.save();

    res.json({ success: true, blog,related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


export const adminBlogBySlug = async (req,res) => {
    try {       
      const {slug} = req.params
    const blog = await Blog.findOne({ slug });
  
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find()
       res.json({success:true,blogs})
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}

export const updateBlog = async(req,res)=>{
    try {
        const user = req.user;
        if(!user) return res.json({success:false,message:"User not found"})
        const {slug,blocks,isPublished,category} = req.body
        const blog = await Blog.findById(req.params.id)
        if(!blog) return res.json({success:false,message:"Blog not found"});
        if(slug) blog.slug = slug
        if(blocks) blog.blocks = blocks
        if(category) blog.category = category
        if(isPublished !== undefined) blog.isPublished = isPublished
        await blog.save();
        res.json({success:true,blog,message:"blog updated"})
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}
//admin delete blog 

export const deleteBlog = async(req,res)=>{
    try {
        const user = req.user;
        if(!user) return res.json({success:false,message:"User not found"})
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if(!blog) return res.json({success:false,message:"Blog not found"});
        res.json({ success: true, message: "Blog deleted" });
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}