const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
            name:{
                type:String,
                required:true 
            },
            price:{
                type:Number,
                required:true 
            },
             featured:{
                type:Boolean,
            },
            rating:{
                type:Number,
                required:true 
            },
             Date:{
                type: Date,
                required:true,
                default:Date.now
            },
          company:  {
            type:String,
            }
            
});
module.exports = mongoose.model('productdata', ProductSchema);
