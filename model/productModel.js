import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    logo:{type:String,required:true},
    productName:{type:String,required:true},
    productAbout:{type:String},
    productLink:{type:String,required:true}
})

export default mongoose.model("Product",productSchema)