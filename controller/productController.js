import Product from "../model/productModel.js";

export const createProduct = async(req,res)=>{
    const user = req.user;
    if(!user) return res.status(201).json({message:"User not found"});
    try {
        const {logo,productName,productAbout,productLink} = req.body;
        if(!logo || !productName || !productLink) {
            return res.json({success:false,message:"Fields Missing"})
        }
        const product = new Product({ logo,productName,productLink,productAbout});
        await product.save();
        res.json({success:true,message:"Product added successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const getProduct = async (req,res) => {
    try {
        const product = await Product.find()
        res.json({success:true,product})
    } catch (error) {
         res.status(500).json({success:false,message:error.message})
    }
}

export const updateProduct = async(req,res) => {
    const user = req.user;
    if(!user) return res.status(201).json({message:"User not found"});
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product) return res.json({success:false,message:"Product not found"});
        const {logo,productName,productAbout,productLink} = req.body;
        if(!logo || !productName || !productLink) {
            return res.json({success:false,message:"Fields Missing"})
        }
        if (logo) product.logo = logo;
        if (productName) product.productName = productName;
        if (productAbout) product.productAbout = productAbout;
        if (productLink) product.productLink = productLink;
        await product.save()
        res.json({success:true,message:"Product Updated",product})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const deleteProduct = async (req,res) => {
    const user = req.user;
    if(!user) return res.status(201).json({message:"User not found"});
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) return res.json({success:false,message:"Product not found"});
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}