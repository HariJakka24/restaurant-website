const exp = require("express")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const verifyToken = require("../src/middlewares/verifyToken");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler")
userApp.use(exp.json());
const User = require("../models/User");
// const Tasks = require("../models/Task");
const CartItem = require("../models/CartItem");
const Address = require("../models/Addresses");
const Order = require("../models/Order");
const Items = require("../models/Items");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//configure multer storage cloudinary
const clStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params: async(req, file)=>{
        return{
            folder: "CDB21DX064",
            public_id:file.fieldname + '-' + Date.now(),
        }
    }
})
//configure multer
const upload = multer({storage: clStorage})

//upload image and get image address
userApp.post("/getimageurl", upload.single('photo'), expressAsyncHandler(async (req, res)=>{
    let imgCdn = req.file.path;
    res.status(200).send({message:"image uploaded", url:imgCdn})
}))

//create user and store in database
userApp.post("/createuser", expressAsyncHandler(async (req, res)=>{
    //get userObj from client
    let userObjFromClient = req.body;
    //search for user by username
    let userByUsername = await User.findOne({username: userObjFromClient.username}).exec()
    //search for user by email id
    let userByEmailId = await User.findOne({email: userObjFromClient.email}).exec()
    //if user existed
    if(userByUsername != null){
        res.status(200).send({message:"username has already taken"})
    }else if(userByEmailId != null){
        res.status(200).send({message:"email id has already taken"})
    }
    //if user not found
    else{
        //create user document
        let newUser = new User({...userObjFromClient})
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 5)
        //replace plain password with hashed password
        newUser.password = hashedPassword;
        //save user
        let user = await newUser.save()
        //sending response
        res.status(201).send({message:"user created", payload:user})
    }
}))


//update password
userApp.put("/updatepassword/:username", verifyToken, expressAsyncHandler(async (req, res)=>{
    let username = req.params.username;
    let {password} = req.body;
    let hashedPassword = await bcryptjs.hash(password, 5);

    //find user and update password
    await User.findOneAndUpdate(
        {username:username},
        {$set: {password:hashedPassword}}
    )
    //send res
    res.status(200).send({message:"password updated"})
}))



//handle user login
userApp.post("/login", expressAsyncHandler(async (req, res)=>{
    //get user from client
    let userCredObj = req.body;
    //search for user by username
    let userFromDB = await User.findOne({username:userCredObj.username}).exec()
    //if user not found 
    if(userFromDB == null){
        res.status(200).send({message: "Invalid username"})
    }
    //if user is in deactivation mode
    else if(userFromDB.status == false){
        res.status(200).send({message:"User deactivated... contact admin"})
    }
    //if usertype is not matched
    // else if(userFromDB.usertype != userCredObj.usertype){
    //     res.status(200).send({message: "Invalid login credentials"})
    // }
    //if user found
    else{
        //compare passwords
        let status = await bcryptjs.compare(userCredObj.password, userFromDB.password)
        //if passwords not matched
        if(status == false){
            res.status(200).send({message:"Invalid password"})
        }
        //if passwords matched, create and send token
        else{
            let signedToken = jwt.sign({username:userFromDB.username}, process.env.SECRET_KEY, {expiresIn:20000})
            //send res
            res.status(200).send({message:"Login success", token:signedToken, user:userFromDB})
        }
    }
}))


//save edited user details
userApp.put("/save-editeduser", expressAsyncHandler(async(req, res) => {
    // let imgAddress = req.file.path;
    let editedObj = req.body;
    let username = editedObj.username;
    // editedObj.profileImage = imgAddress;
    console.log(editedObj);

    //get user obj
    let userObj = await User.findOneAndUpdate({username:username}, {...editedObj}, {new:true}).exec();

    res.status(200).send({message:"user details updated", payload:userObj})
}))


// //get user by username
// userApp.get("/getuser/:username", expressAsyncHandler(async (req, res)=>{
//     //get username from url
//     let usernameFromClient =req.params.username;
//     //find user by username
//     //findOne return null if user not existed
//     let userFromDB = await User.findOne({username: usernameFromClient}).exec()
//     if(userFromDB.status == false){
//         res.status(200).send({message:"User is in deactivation mode.. Contact Admin"})
//     }else{
//         //send res
//         res.status(200).send({message:"user", payload:userFromDB})
//     }
    
// }))





// //delete user
// userApp.put("/deleteuser", expressAsyncHandler(async (req, res)=>{
//     //get user from client
//     let userObjFromClient = req.body;
//     //find username and update status
//     await User.findOneAndUpdate(
//         {username:userObjFromClient.username},
//         {$set: {status:userObjFromClient.status}}
//     )
//     //send res
//     res.status(200).send({message:"user deleted"})
// }))


// //update user
// userApp.put("/updateuser", expressAsyncHandler(async (req, res)=>{
//     //get user from client
//     let userObjFromClient = req.body;
//     //find username and update status
//     await User.findOneAndUpdate(
//         {username:userObjFromClient.username},
//         {...userObjFromClient},
//         {new:true}
//     ).exec()
//     //send res
//     res.status(200).send({message:"user updated"})
// }))

// //user activation
// userApp.put("/activateuser/:username", expressAsyncHandler(async (req, res)=>{
//     let usernameFromClient =req.params.username;
//     //find username and update status
//     await User.findOneAndUpdate(
//         {username:usernameFromClient},
//         {$set: {status:true}}
//     )
//     //send res
//     res.status(200).send({message:"user activated"})
// }))



//Private Routes
//add item to cart
userApp.post("/addtocart", verifyToken, expressAsyncHandler(async(req, res)=>{
    //get item Obj from req
    let userCartObjFromClient = req.body;
    let {username, items} = {...userCartObjFromClient};
    //create user cart object
    let userItemDoc = new CartItem({...userCartObjFromClient});
    //find usercart obj
    let userItemObj = await CartItem.findOne({ username: username });
    
    //if it is first item of the usercart
    if(userItemObj == null){
        await userItemDoc.save();
        res.status(201).send({message:"new item added to cart"})
    }
    //if it is not first item of the usercart
    else{
        userItemObj.items.push(items[0]);
        await CartItem.findOneAndUpdate({ username: userItemObj.username }, {...userItemObj})
        res.status(201).send({message:"new item added to cart"})
    }
}))

//get cart items
userApp.get("/getcart/:username", verifyToken, expressAsyncHandler(async(req, res)=>{
    let usernameFromClient = req.params.username;
    let items = await CartItem.findOne({ username: usernameFromClient }).exec();
    if(items == undefined ){
        res.status(200).send({message: "No items",payload:[]})
    }else{
        res.status(200).send({message:"items found", payload:items.items})
    }
    
}))

//update cart items
userApp.post("/updatecartitem/:username", verifyToken, expressAsyncHandler(async(req, res)=>{
    let usernameFromClient = req.params.username;
    let userCartObj = await CartItem.findOne({ username: usernameFromClient }).exec();
    let itemObjIndex = userCartObj.items.findIndex(itemObj => itemObj._id == req.body._id)
    userCartObj.items[itemObjIndex] = req.body;
    let items = await CartItem.findOneAndUpdate({username:usernameFromClient}, {...userCartObj}, {new:true}).exec();
    res.status(200).send({message:"items", payload:items})
    
}))

//delete cart item
userApp.post("/deletecartitem/:username", verifyToken, expressAsyncHandler(async(req, res)=>{
    let usernameFromClient = req.params.username;
    let userCartObj = await CartItem.findOne({ username: usernameFromClient }).exec();
    console.log(userCartObj);
    let itemObjIndex = userCartObj.items.findIndex(itemObj => itemObj.itemName == req.body.itemName);
    let deletedItem = userCartObj.items.splice(itemObjIndex, 1);
    console.log(userCartObj);
    let items = await CartItem.findOneAndUpdate({username:usernameFromClient}, {...userCartObj}, {new:true}).exec();
    res.status(200).send({message:"item deleted", payload:deletedItem});
    
}))

//delete cart 
userApp.delete("/deletecart/:username", verifyToken, expressAsyncHandler(async(req, res)=>{
    let usernameFromClient = req.params.username;
    let userCartObj = await CartItem.findOneAndDelete({ username: usernameFromClient }).exec();
    res.status(200).send({message:"cart deleted", payload:userCartObj});
}))


//add address
userApp.post("/add_address", verifyToken, expressAsyncHandler(async(req, res)=>{
    //get address Obj from req
    let userAddressObjFromClient = req.body;
    let {username, address} = {...userAddressObjFromClient};
    //create user address object
    let userAddressDoc = new Address({...userAddressObjFromClient});
    //find user address obj
    let userAddressObj = await Address.findOne({ username: username });
    
    //if it is first address of the user
    if(userAddressObj == null){
        await userAddressDoc.save();
        res.status(201).send({message:"new address added"})
    }
    //if it is not first address of the user
    else{
        userAddressObj.address.push(address[0]);
        await Address.findOneAndUpdate({ username: userAddressObj.username }, {...userAddressObj})
        res.status(201).send({message:"new address added"})
    }
}))

//get addresses 
userApp.get("/getaddress/:username", verifyToken, expressAsyncHandler(async(req, res)=>{
    let usernameFromClient = req.params.username;
    let addresses = await Address.findOne({ username: usernameFromClient }).exec();
    if(addresses == undefined ){
        res.status(200).send({message: "No addresses found",payload:[]})
    }else{
        res.status(200).send({message:"address found", payload:addresses.address})
    }
    
}))

//delete address of the user
userApp.put("/deleteaddress/:username", verifyToken, expressAsyncHandler(async(req, res)=>{
    let usernameFromClient = req.params.username;
    let userAddressObj = await Address.findOne({ username: usernameFromClient }).exec();
    let addressObjIndex = userAddressObj.address.findIndex(addressObj => addressObj._id == req.body._id);
    let deletedAddress = userAddressObj.address.splice(addressObjIndex, 1);
    let items = await Address.findOneAndUpdate({username:usernameFromClient}, {...userAddressObj}, {new:true}).exec();
    res.status(200).send({message:"address deleted", payload:deletedAddress});
}))

//save edited address details
userApp.put("/save-editedaddress/:username", verifyToken, expressAsyncHandler(async(req, res) => {
    let username = req.params.username;
    let userAddressObj = await Address.findOne({ username: username }).exec();
    let addressObjIndex = userAddressObj.address.findIndex(addressObj => addressObj._id == req.body._id)
    userAddressObj.address[addressObjIndex] = req.body;
    let addresses = await Address.findOneAndUpdate({username:username}, {...userAddressObj}, {new:true}).exec();
    res.status(200).send({message:"address updated", payload:addresses})
}))



//add order details
userApp.post("/addorder", verifyToken, expressAsyncHandler(async(req, res)=>{
    //get order details from req
    let orderObjFromClient = req.body;
    let {items} = {...orderObjFromClient};
    //update item quantity
    items.map(async (item) => {
        let originalItem = await Items.findOne({_id:item._id});
        let updatedQuantity = (originalItem.quantity) - (item.cartQuantity);
        // originalItem.quantity = updatedQuantity;
        let updatedItem = await Items.findOneAndUpdate({ _id: item._id }, {$set:{quantity: updatedQuantity}}, {new:true}).exec();
    })
    //delete cart items
    let userCartObj = await CartItem.findOneAndDelete({ username: req.body.username }).exec();
    //create order  object
    let orderDoc = new Order({...orderObjFromClient});
    await orderDoc.save();
    res.status(201).send({message:"order placed"});

}))

//get orders 
userApp.get("/getorders", verifyToken, expressAsyncHandler(async (req, res)=>{

    let ordersFromDB = await Order.find({}).exec()
    if(ordersFromDB != null){
        res.status(200).send({message:"active orders found", payload:ordersFromDB});
    }else{
        res.status(200).send({message:"No active orders"});
    }
    
}))
//get user order 
userApp.get("/getorder/:username", verifyToken, expressAsyncHandler(async (req, res)=>{
    let userFromClient = req.params.username;
    let ordersFromDB = await Order.find({username:userFromClient}).exec()
    if(ordersFromDB != null){
        res.status(200).send({message:"active order found", payload:ordersFromDB});
    }else{
        res.status(200).send({message:"No active orders"});
    } 
}))

//update order
userApp.put("/updateorderfeedback", expressAsyncHandler(async (req, res)=>{
    //find order and update feedback
    let orderObj = await Order.findOneAndUpdate({_id:req.body._id}, {...req.body}, {new:true}).exec();
    let {items} = req.body;
    items.map(async (item) => {
        await Items.updateOne(
            {_id:item._id},
            {$push: {ratings:{star:req.body.rating.qualityOfFood, postedBy:req.body.username}}},
            {new:true}
        ).exec();
        let updatedItem = await Items.findOne({_id:item._id});
        let sum=0;
        updatedItem.ratings.map(ele => sum = sum+(+ele.star));
        let average = sum/updatedItem.ratings.length;
        await Items.findOneAndUpdate({_id:item._id},{$set:{ratingAverage:average}})
    })
    //send response
    res.status(200).send({message:"feedback Submitted"})
}))

//update order tracking status
userApp.put("/updateorderstatus/:username", expressAsyncHandler(async (req, res)=>{
    //get username 
    let username = req.params.username;
    //find username and update tracking status
    await Order.findOneAndUpdate(
        {username:username, orderStatus:true},
        {$set: {presentStatus:req.body.trackingStatus}}
    )
    if(req.body.trackingStatus == "Order preparation in progress"){
        await Order.findOneAndUpdate(
            {username:username, orderStatus:true},
            {$set: {canCancel:false}}
        )
    }
    if(req.body.trackingStatus == "Payment received and Delivered" || "Delivered"){
        await Order.findOneAndUpdate(
            {username:username, orderStatus:true},
            {$set: {isDelivered:true}}
        )
    }
    let orderObj = await Order.updateOne(
        {username:username, orderStatus:true},
        {$push: {trackingStatus:req.body.trackingStatus}}
    )
    //send res
    res.status(200).send({message:"trackingStatus updated"})
}))

//update order items
userApp.put("/updateorderitems/:id", expressAsyncHandler(async (req, res)=>{
    //get username 
    let id = req.params.id;
    //find order and update items
    let orderObj = await Order.findOneAndUpdate(
        {_id:id},
        {$set: {items:req.body}}
    )
    //send res
    res.status(200).send({message:"items updated"})
}))

//close order
userApp.put("/update_expectedtime/:id", expressAsyncHandler(async (req, res)=>{
    //get order id 
    let id = req.params.id;
    //find order and update status to false
    let orderObj = await Order.findOneAndUpdate(
        {_id:id},
        {$set: {expectedDeliveryTime:req.body.expectedTime}}
    )
    //send res
    res.status(200).send({message:"Expected Delivery Time Updated "});
    
}))

//close order
userApp.put("/closeorder/:id", expressAsyncHandler(async (req, res)=>{
    //get order id 
    let id = req.params.id;
    //find order and update status to false
    let orderObj = await Order.findOneAndUpdate(
        {_id:id},
        {$set: {orderStatus:false}}
    )
    //send res
    res.status(200).send({message:"order closed "});
    
}))

//cancel order
userApp.put("/cancelorder/:id", expressAsyncHandler(async (req, res)=>{
    //get order id 
    let id = req.params.id;
    //find username and update status to false
    let orderObj = await Order.findOneAndUpdate(
        {_id:id},
        {$set: {isCancelled:true, orderStatus:false, presentStatus:req.body.message}},
        {new:true}
    ).exec();
    console.log(orderObj);
    //update items quantity
    orderObj.items.map(async (item) => {
        let originalItem = await Items.findOne({_id:item._id});
        let updatedQuantity = (originalItem.quantity) + (item.cartQuantity);
        // originalItem.quantity = updatedQuantity;
        let updatedItem = await Items.findOneAndUpdate({ _id: item._id }, {$set:{quantity: updatedQuantity}}, {new:true}).exec();
        console.log(updatedItem);
    })
    //send res
    res.status(200).send({message:"order cancelled "})
    
}))

// //save edited order details
// userApp.put("/save-editedorder", expressAsyncHandler(async(req, res) => {
//     let editedObj = req.body;
//     let username = editedObj.username;

//     //get order obj
//     let orderObj = await Order.findOneAndUpdate({username:username}, {...editedObj}, {new:true}).exec();

//     res.status(200).send({message:"order details updated", payload:orderObj})
// }))




//err handling middleware
userApp.use((err, req, res, next) => {
    console.log(err);
    res.send({message:err.message})
})


module.exports = userApp;