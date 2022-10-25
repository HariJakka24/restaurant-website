const exp = require("express")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const verifyToken = require("../src/middlewares/verifyToken");
const itemsApp = exp.Router();
const expressAsyncHandler = require("express-async-handler")
itemsApp.use(exp.json());
const Items = require("../models/Items");
const User = require("../models/User");


itemsApp.post("/createitem", expressAsyncHandler(async (req, res)=>{
    //search for user by username
    let itemByName = await Items.findOne({itemName: req.body.itemName}).exec()
    //if item existed
    if(itemByName != null){
        res.status(200).send({message:"item name has already taken"})
    }
    //if item not exists
    else{
        //create item document
        let newItem = new Items({...req.body});
        //save
        let item = await newItem.save()
        //send res
        res.status(201).send({message:"item created", payload:item})
    }
}))


// itemsApp.put("/itemoutofstock", expressAsyncHandler(async (req, res)=>{
//     //get item from client
//     let itemObjFromClient = req.body;
//     //find username and update status
//     await Items.findOneAndUpdate(
//         {_id:itemObjFromClient._id},
//         {$set: {status:itemObjFromClient.status}}
//     )
//     //send res
//     res.status(200).send({message:"item added to out of stock"})
// }))


//delete item
itemsApp.put("/deleteitem", expressAsyncHandler(async (req, res)=>{
    //get item from client
    let itemObjFromClient = req.body;
    //find itemId and update status
    await Items.findOneAndUpdate(
        {_id:itemObjFromClient._id},
        {$set: {itemStatus:false}}
    )
    //send res
    res.status(200).send({message:"item deleted"})
}))



// //update item
// itemsApp.put("/updateitem", expressAsyncHandler(async (req, res)=>{
//     //get item from client
//     let itemObjFromClient = req.body;
//     //find item and update status
//     let updatedItem = await Items.findOneAndUpdate(
//         {_id:itemObjFromClient._id},
//         {...itemObjFromClient},
//         {new:true}
//     ).exec()
//     //send res
//     res.status(200).send({message:"item updated", payload:updatedItem})
// }))


//get items 
itemsApp.get("/getitems", expressAsyncHandler(async (req, res)=>{

    let itemsFromDB = await Items.find({itemStatus:true}).exec()
    if(itemsFromDB != null){
        res.status(200).send({message:"items found", payload:itemsFromDB});
    }else{
        res.status(200).send({message:"items not found"});
    }
    
}))


//save edited item
itemsApp.put("/save-editeditem", expressAsyncHandler(async(req, res) => {
    let items = await Items.findOneAndUpdate({_id:req.body._id}, {...req.body}, {new:true}).exec();
    res.status(200).send({message:"item updated", payload:items})
}))


// // add or create rating
// itemsApp.put("addrating/:productId", verifyToken, expressAsyncHandler(async (req, res) => {
//   const item = await Items.findById(req.params.productId).exec();
//   const user = await User.findOne({ username: req.body.username }).exec();
//   const { star } = req.body;

//   // who is updating?
//   // check if currently logged in user have already added rating to this product?
//   let existingRatingObject = item.ratings.find(
//     (ele) => ele.postedBy === user._id
//   );

//   // if user haven't left rating yet, push it
//   if (existingRatingObject === undefined) {
//     let ratingAdded = await Product.findByIdAndUpdate(
//       product._id,
//       {
//         $push: { ratings: { star, postedBy: user._id } },
//       },
//       { new: true }
//     ).exec();
//     console.log("ratingAdded", ratingAdded);
//     res.json(ratingAdded);
//   } else {
//     // if user have already left rating, update it
//     const ratingUpdated = await Product.updateOne(
//       {
//         ratings: { $elemMatch: existingRatingObject },
//       },
//       { $set: { "ratings.$.star": star } },
//       { new: true }
//     ).exec();
//     console.log("ratingUpdated", ratingUpdated);
//     res.json(ratingUpdated);
//   }
// }))




//err handling middleware
itemsApp.use((err, req, res, next) => {
    console.log(err);
    res.send({message:err.message})
})


module.exports = itemsApp;