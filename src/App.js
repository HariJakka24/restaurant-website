import './App.css';
import Navbarcomponent from './components/Navbarcomponent';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Home/Home';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import UserProfile from './components/userProfile/UserProfile';
import UserView from './components/adminprofile/UserView/UserView';
import AdminProfile from './components/adminprofile/AdminProfile';
import AddItem from './components/adminprofile/AddItem/AddItem';
import Biryanis from './components/Categories-bar/Categories/Biryanis/Biryanis';
import Desserts from './components/Categories-bar/Categories/Desserts/Desserts';
import Beverages from './components/Categories-bar/Categories/Beverages/Beverages';
import MainCourse from './components/Categories-bar/Categories/MainCourse/MainCourse';
import Recommended from './components/Categories-bar/Categories/Recommended/Recommended';
import Soups from './components/Categories-bar/Categories/Soups/Soups';
import Starters from './components/Categories-bar/Categories/Starters/Starters';
import Cart from './components/Cart/Cart';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { itemDetails } from './slices/itemSlice';
import { getCartItems } from './slices/userCartSlice';
import {useState} from 'react';
import AddAddress from './components/AddAddress/AddAddress';
import PaymentPage from './components/PaymentPage/PaymentPage';
import TrackOrder from './components/TrackOrder/TrackOrder';
import ActiveOrders from './components/adminprofile/ActiveOrders/ActiveOrders';
import { useNavigate } from 'react-router-dom';
import OrderHistory from './components/OrderHistory/OrderHistory';
import Footer from './components/footer/Footer';
import ViewAddress from './components/ViewAddress/ViewAddress';
import AllItems from './components/Categories-bar/Categories/AllItems/AllItems';
import Breakfast from './components/Categories-bar/Categories/Breakfast/Breakfast';

function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {userObj, isUserLogin} = useSelector(state => state.user);
  let {usercart} = useSelector(state => state.cart);
  let {itemsList} = useSelector(state => state.items);



  const [modalShow, setmodalShow] = useState(false);
  const [editItemObj, seteditItemObj] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  const [searchResults, setsearchResults] = useState(null);
  const [searchInput, setsearchInput] = useState(null);

  const [vegOnly, setvegOnly] = useState(null);



  const removeitem= async (item)=>{
      console.log(item);
      let res = await axios.put("http://localhost:5003/item/deleteitem", item);
    //   if(res.data.message == "item deleted"){
          
    //   }
      dispatch(itemDetails());
  } 

  const addItemToCart = async (item) => {
      if(isUserLogin){
        if(usercart){
            let resultItem = usercart.filter(cartitem => cartitem._id == item._id);
            console.log(resultItem);
            if(resultItem.length == 0){
                let userCartObj = {username:userObj.username, items:[{...item, cartQuantity:1}]};
                try{
                    //get token
                    let token = localStorage.getItem("token");
                    let res = await axios.post("http://localhost:5003/user/addtocart", userCartObj, {
                        headers:{ Authorization:"Bearer " + token}
                    })
                    dispatch(getCartItems(userObj));
                    alert("item added to cart");
                    navigate('/cart');
                }
                catch(err){
                    console.log(err);
                }
            }else{
                console.log(resultItem[0].cartQuantity);
                let cartQuantity = resultItem[0].cartQuantity + 1;
                console.log(cartQuantity);
                let itemObj = {...item, cartQuantity: cartQuantity}
                console.log(itemObj);
                //get token
                let token = localStorage.getItem("token");
                let res = await axios.post(`http://localhost:5003/user/updatecartitem/${userObj.username}`, itemObj, {
                    headers:{ Authorization:"Bearer " + token}
                });
                dispatch(getCartItems(userObj))
                alert("item added to cart");
                navigate('/cart');
            }
        }
      }else{
          console.log("login");
          navigate('/login')
      } 
  }

  

    const setEditObj = async(itemObj)=>{
        setmodalShow(true)
        seteditItemObj({...editItemObj, ...itemObj})
    }

    //on completion of edit
    const afterEdit = async (editedObj) =>{
        console.log(editedObj);
        setmodalShow(false)
        seteditItemObj(null)
        if(editedObj != undefined){
            let updatedItem = {...editItemObj, ...editedObj, itemImage:imageUrl};
            // editedObj.username = userObj.username;
            // editedObj.email = userObj.email;
            //create formdata object
            // let formData = new FormData();
            //append file
            // formData.append("image", file, file.name);
            //append userObj
            // formData.append("editedObj", JSON.stringify(editedObj))
            let res = await axios.put('http://localhost:5003/item/save-editeditem', updatedItem);
            if(res.data.message == "item updated"){
                dispatch(itemDetails());
                alert(res.data.message);
            }else{
                alert(res.data.message);
            }
            
        } 
        
    }

    const handleSearch = (e, searchInput) => {
        e.preventDefault();
        let res = itemsList.filter(item => {
            console.log(searchInput.toLowerCase());
            if( item.itemName.toLowerCase().includes(searchInput.toLowerCase()) || item.category.toLowerCase().includes(searchInput.toLowerCase())){
                return true;
            }else{
                return false;
            }
        });
        setsearchResults(res);
    }
    const handleChangeInInput = (e) => {
        if(e.target.value == ""){
            setsearchResults(null)
        }else{
            setsearchInput(e.target.value);
            let res = itemsList.filter(item => {
                console.log(searchInput.toLowerCase());
                if( item.itemName.toLowerCase().includes(e.target.value.toLowerCase()) || item.itemType.toLowerCase().includes(e.target.value.toLowerCase()) || item.category.toLowerCase().includes(e.target.value.toLowerCase())){
                    return true;
                }else{
                    return false;
                }
            });
            setsearchResults(res);
        }
    }



  return (
    <>
      <Navbarcomponent addItemToCart={addItemToCart}/>
      
      <Routes>
        <Route path="" element={<Home addItemToCart={addItemToCart} searchInput={searchInput} searchResults={searchResults} handleSearch ={handleSearch} handleChangeInInput={handleChangeInInput}/>} >
            <Route path="" element={<AllItems addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="allitems" element={<AllItems addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="biryanis" element={<Biryanis vegOnly={vegOnly} setvegOnly={setvegOnly} addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="desserts" element={<Desserts addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="beverages" element={<Beverages addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="maincourse" element={<MainCourse addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="recommended" element={<Recommended addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="soups" element={<Soups addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="starters" element={<Starters addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
            <Route path="breakfast" element={<Breakfast addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
        </Route>
        <Route path="signup" element={<SignUp/>} />
        <Route path="orderhistory" element={<OrderHistory/>} />
        <Route path="paymentpage" element={<PaymentPage/>} />
        <Route path="trackorder" element={<TrackOrder/>} />
        <Route path="login" element={<Login/>} />
        <Route path="addaddress" element={<AddAddress/>} />
        <Route path="viewaddress" element={<ViewAddress/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="activeorders" element={<ActiveOrders/>} />
        <Route path="adminprofile/:username" element={<Home addItemToCart={addItemToCart} searchInput={searchInput} searchResults={searchResults} handleSearch ={handleSearch} handleChangeInInput={handleChangeInInput}/>}>
                <Route path="" element={<AllItems addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="allitems" element={<AllItems addItemToCart={addItemToCart} removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="biryanis" element={<Biryanis removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="desserts" element={<Desserts removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="beverages" element={<Beverages removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="maincourse" element={<MainCourse removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="recommended" element={<Recommended removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="soups" element={<Soups removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="starters" element={<Starters removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />
                <Route path="breakfast" element={<Breakfast removeitem = {removeitem} setEditObj={setEditObj} afterEdit={afterEdit} editItemObj={editItemObj} setImageUrl={setImageUrl} imageUrl={imageUrl} modalShow={modalShow}/>} />

        </Route>
        <Route path="addproduct" element={<AddItem/>} />

        <Route path="userprofile/:username" element={<Home addItemToCart={addItemToCart} searchInput={searchInput} searchResults={searchResults} handleSearch={handleSearch} handleChangeInInput={handleChangeInInput}/>} >
            <Route path="" element={<AllItems addItemToCart={addItemToCart}/>} />
            <Route path="allitems" element={<AllItems addItemToCart={addItemToCart}/>} />
            <Route path="biryanis" element={<Biryanis addItemToCart={addItemToCart}/>} />
            <Route path="desserts" element={<Desserts addItemToCart={addItemToCart}/>} />
            <Route path="beverages" element={<Beverages addItemToCart={addItemToCart}/>} />
            <Route path="maincourse" element={<MainCourse addItemToCart={addItemToCart}/>} />
            <Route path="recommended" element={<Recommended addItemToCart={addItemToCart}/>} />
            <Route path="soups" element={<Soups addItemToCart={addItemToCart}/>} />
            <Route path="starters" element={<Starters addItemToCart={addItemToCart}/>} />
            <Route path="breakfast" element={<Breakfast addItemToCart={addItemToCart}/>} />
        </Route>
      </Routes>

      <Footer/>

    </>
  );
}

export default App;
