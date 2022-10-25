const mongoose = require("mongoose");

//define schema
const userAddressSchema = new mongoose.Schema({
    username:{type:String, required:true},
    address:[{
        addressLine_1:{type:String, required:[true, 'Address line 1 is required']},
        addressLine_2:{type:String, required:[true, 'Address line 2 is required']},
        city:{type:String, required:[true, 'city is required']},
        pincode:{type:Number, required:[true, 'pincode is required'], min:100000, max:999999},

    }]
}, {timestamps:true})

//create task model
const addressModel = mongoose.model('address', userAddressSchema);

//export
module.exports = addressModel;


// const mongoose = require("mongoose");

// //define schema
// const userAddressSchema = new mongoose.Schema({
//     username:{type:String, required:true},
//     address:[{
//         addressLine_1:{type:String, required:[true, 'Address line 1 is required']},
//         addressLine_2:{type:String, required:[true, 'Address line 2 is required']},
//         city:{type:String, required:[true, 'city is required']},
//         pincode:{type:Number, required:[true, 'pincode is required'], min:100000, max:999999},
//     }]
// }, {timestamps:true})

// //create task model
// const addressModel = mongoose.model('address', userAddressSchema);

// //export
// module.exports = addressModel;