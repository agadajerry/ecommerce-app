import mongoose from 'mongoose';


export const inv_schema = new mongoose.Schema({
    
    product_name: { type: String },
   product_price: { type: Number, required: true },
   product_qtty: { type: String, required: true },
   product_size: { type: String },
   product_category: { type: String },
   product_photo_url: { type: String },
   cloudinary_id: {type:String},
   date_inserted: { type: Date, default: new Date() },
   description: { type: String }
 });

   const product  = mongoose.model("newproducts",inv_schema);


   
 
 export default product