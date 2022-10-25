const mongoose = require("mongoose");

//define schema
const orderDetailsSchema = new mongoose.Schema({
    username:{type:String, required:true},
    mobile:{type:Number, required:true},
    items:[{
        itemName:{type:String, required:[true, 'Item Name is required']},
        description:{type:String},
        price:{type:String,  required:[true, 'Price is required']},
        category:{type:String,  required:[true, 'Category is required']},
        itemImage:{type:String, required:[true, 'image is required']},
        quantity:{type:Number, required:[true, 'quantity is required']},
        itemType:{type:String, required:[true, 'item type is required']},
        itemStatus:{type:Boolean, required:true},
        cartQuantity:{type:Number},
    }],
    totalAmount:{type:Number, required:true},
    deliveryCharges:{type:Number},
    discount:{type:Number, default:0},
    billTotal:{type:Number},
    paymentmethod:{type:String},
    paymentMode:{type:String, required:true},
    deliveryMode:{type:String, required:true},
    orderStatus:{type:Boolean, default:true},
    isCancelled:{type:Boolean, default:false},
    trackingStatus:[
        {type:String, default:"order placed"}
    ],
    presentStatus:{type:String, default:"order placed"},
    deliveryAddress:{
        addressLine_1:{type:String},
        addressLine_2:{type:String},
        city:{type:String},
        pincode:{type:Number, min:100000, max:999999}
    },
    rating:{
        deliveryEffectiveness:{type:Number},
        easeOfOrdering:{type:Number},
        qualityOfFood:{type:Number},
        feedback:{type:String}
    },
    canCancel:{type:Boolean, default:true},
    isDelivered:{type:Boolean, default:false},
    expectedDeliveryTime:{type:Number, default:30}
}, {timestamps:true})

//create task model
const orderModel = mongoose.model('order', orderDetailsSchema);

//export
module.exports = orderModel;


