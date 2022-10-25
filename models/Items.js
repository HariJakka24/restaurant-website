const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


//define schema
const itemSchema = new mongoose.Schema({
    itemName:{type:String, required:[true, 'Item Name is required']},
    description:{type:String},
    price:{type:String,  required:[true, 'Price is required']},
    category:{type:String,  required:[true, 'Category is required']},
    itemImage:{type:String, required:[true, 'image is required']},
    quantity:{type:Number, required:[true, 'quantity is required']},
    itemType:{type:String, required:[true, 'item type is required']},
    itemStatus:{type:Boolean, default:true},
    ratingAverage:{type:Number, default:0},
    ratings: [
        {
          star: {type:Number},
          postedBy: { type: String }
        }
    ]
}, { timestamps: true })

//create task model
const itemModel = mongoose.model('item', itemSchema);

//export
module.exports = itemModel;