import mongoose from "mongoose";

//cart model

   const CartSchema = new mongoose.Schema(
     {
       userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "newusers",
       },
       products: Array,
       active: {
         type: Boolean,
         default: true,
       },
       modifiedOn: {
         type: Date,
         default: Date.now,
       },
     },
     { timestamps: true }
   );

const cart = mongoose.model("productcart", CartSchema);
 
export default cart




