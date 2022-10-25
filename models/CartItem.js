const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


//define schema
const cartItemSchema = new mongoose.Schema({
    username:{type:String, required:true},
    items:[{
        itemName:{type:String, required:[true, 'Item Name is required']},
        description:{type:String},
        price:{type:String,  required:[true, 'Price is required']},
        category:{type:String,  required:[true, 'Category is required']},
        itemImage:{type:String, required:[true, 'image is required']},
        quantity:{type:Number, required:[true, 'quantity is required']},
        itemType:{type:String, required:[true, 'item type is required']},
        itemStatus:{type:Boolean, required:true},
        ratingAverage:{type:Number, default:0},
        cartQuantity:{type:Number},
    }], 
}, {timestamps:true})

//create task model
const itemModel = mongoose.model('cart', cartItemSchema);

//export
module.exports = itemModel;



// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;


// //define schema
// const cartItemSchema = new mongoose.Schema({
//     username:{type:String, required:true},
//     items:[{
//         item:{type:ObjectId, ref:"item"},
//         priceTotal:{type:Number},
//     }], 
//     cartQuantity:{type:Number},
//     cartTotal:{type:Number},

// }, {timestamps:true})

// //create task model
// const itemModel = mongoose.model('cart', cartItemSchema);

// //export
// module.exports = itemModel;