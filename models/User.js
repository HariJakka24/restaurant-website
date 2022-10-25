const mongoose = require("mongoose")

//create user schema
let userSchema = new mongoose.Schema({
    usertype:{type:String, required:[true, "please select usertype.."], default:"user"},
    username: {type:String, required:[true, "Please add username.."], minLength:4, maxLength:25},
    name:{type:String, required:[true, "Please enter name"]},
    mobile:{type:Number, required:[true, 'Mobile Number is required']},
    password:{type:String, required:true, minLength:4},
    email:{type:String, required:[true, "Email is required"]},
    salary:{type:Number, min:20000, max:50000 },
    city:{type:String, required:[true, "City is required"]},
    profileImage: {type:String},
    // address:[{
    //     addressLine_1:{type:String, required:[true, 'Address line 1 is required']},
    //     addressLine_2:{type:String, required:[true, 'Address line 2 is required']},
    //     city:{type:String, required:[true, 'city is required']},
    //     pincode:{type:Number, required:[true, 'pincode is required'], min:100000, max:999999},

    // }],
    status:{type:Boolean, default:true}
}, {collection: 'userscollection'})

//create model
const userModel = mongoose.model('user', userSchema)

//export
module.exports = userModel


// const mongoose = require("mongoose")

// //create user schema
// let userSchema = new mongoose.Schema({
//     usertype:{type:String, required:[true, "please select usertype.."]},
//     username: {type:String, required:[true, "Please add username.."], minLength:4},
//     password:{type:String, required:true, minLength:4},
//     email:{type:String, required:[true, "Email is required"]},
//     salary:{type:Number, min:20000, max:50000 },
//     city:{type:String, required:[true, "City is required"]},
//     profileImage: {type:String},
//     address:[{
//         addressLine_1:{type:String},
//         addressLine_2:{type:String},
//         pin_code:{type:Number},

//     }],
//     status:{type:Boolean, default:true}
// }, {timestamps:true}, {collection: 'userscollection'})

// //create model
// const userModel = mongoose.model('user', userSchema)

// //export
// module.exports = userModel