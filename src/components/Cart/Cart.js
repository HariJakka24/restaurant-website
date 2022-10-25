import React from 'react';
import { getCartItems, updateCartPrice, updateUserCart } from '../../slices/userCartSlice';
import './Cart.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Card, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { setAddressForDelivery } from '../../slices/userAddressSlice';


function Cart(props) {
    let {usercart} = useSelector(state => state.cart);
    let {userObj} = useSelector(state => state.user);
    let {addressList} = useSelector(state => state.address);
    const [cartPrice, setcartPrice] = useState(0);
    const [cartLength, setcartLength] = useState(0);
    let {register, handleSubmit, formState:{errors}} = useForm();
    const [deliveryMode, setDeliveryMode] = useState(null);
    // const [selectedAddress, setselectedAddress] = useState(null);

    // console.log(selectedAddress);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        let sum = 0;
        if(usercart != null){
            setcartLength(usercart.length);
            usercart.map((item)=>{
                sum = sum+(+item.price)*(+item.cartQuantity);
            })
            setcartPrice(sum);
            dispatch(updateCartPrice(sum))
        }
    }, [usercart]);



    const decreaseQuantity =async (item)=>{
        if(item.cartQuantity == 1){
            removeCartItem(item);
            
        }else{
            let itemObj = {...item, cartQuantity: item.cartQuantity - 1}
            //get token
            let token = localStorage.getItem("token");
            let res = await axios.post(`http://localhost:5003/user/updatecartitem/${userObj.username}`, itemObj, {
                headers:{ Authorization:"Bearer " + token}
            });
            dispatch(getCartItems(userObj))
        }
    }
    const increaseQuantity =async (item)=>{
        if(item.quantity >= item.cartQuantity + 1){
            let itemObj = {...item, cartQuantity: item.cartQuantity + 1}
            //get token
            let token = localStorage.getItem("token");
            let res = await axios.post(`http://localhost:5003/user/updatecartitem/${userObj.username}`, itemObj, {
                headers:{ Authorization:"Bearer " + token}
            });
            dispatch(getCartItems(userObj))
        }else{
            if(item.quantity > 1){
                alert(`Only ${item.quantity} items left`)
            }else{
                alert(`Only ${item.quantity} item left`)
            }
        }
        
    }

    const removeCartItem = async (item) => {
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.post(`http://localhost:5003/user/deletecartitem/${userObj.username}`, item, {
            headers:{ Authorization:"Bearer " + token}
        })
        dispatch(getCartItems(userObj))
    }
    const navigateToPaymentPage = (data) => {
        // setselectedAddress(data.address);
        dispatch(setAddressForDelivery(data.address));
        navigate('/paymentpage');
    }

    const handleDeliveryType = (e) => {
        setDeliveryMode(e.target.value)
    }
    console.log(usercart);

    return (
        <div>
            {usercart && <div>
                {usercart.length != 0 ? <div className="popular">
                   <div class="box-container">
                        {
                            usercart.map(item => <div class="box">
                                <span class="price"><i class="fas fa-star"></i> {item.ratingAverage} </span>
                                <span class="veg_display">
                                    {item.itemType == 'veg' ?
                                        <i class="fa-regular fa-square-caret-up text-success"></i> : 
                                        <i class="fa-regular fa-square-caret-up text-danger"></i>
                                    }
                                </span>
                                <img src={item.itemImage} alt=""/>
                                <h3>{item.itemName}</h3>
                                <span class="text-primary">₹ {item.price} <br /> </span>
                                    {(item.ratingAverage <= 3 && item.ratingAverage > 2) && <StarRatings
                                        rating={item.ratingAverage}
                                        starRatedColor='yellow'
                                        numberOfStars={5}
                                        isSelectable={true}
                                        isAggregateRating={true}
                                        starDimension="20px"
                                        starSpacing='0'
                                    /> }
                                    {item.ratingAverage > 3 && <StarRatings
                                        rating={item.ratingAverage}
                                        starRatedColor='green'
                                        numberOfStars={5}
                                        isSelectable={true}
                                        isAggregateRating={true}
                                        starDimension="20px"
                                        starSpacing='0'
                                    /> }
                                    {item.ratingAverage <= 2 && <StarRatings
                                        rating={item.ratingAverage}
                                        starRatedColor='red'
                                        numberOfStars={5}
                                        isSelectable={true}
                                        isAggregateRating={true}
                                        starDimension="20px"
                                        starSpacing='0'
                                    /> }
                                    <br />

                                {/* <p className='item-description text-muted'>{item.description}</p> */}
                                {/* <div href="#" class="button">order now</div> */}
                                 {item.quantity > 0 ? 
                                        <div className="d-flex">
                                            
                                            <p className="text-success fw-bold text-center">Available</p>
                                            <button className="btn ms-auto" onClick={()=>decreaseQuantity(item)}>-</button>
                                            <button className='btn'>{item.cartQuantity}</button>
                                            <button className="btn" onClick={()=>increaseQuantity(item)}>+</button>
                                        </div> : <p className="text-danger fw-bold text-center">Item not available</p> 
                                } 
                                <div className="ms-auto fw-bold text-danger remove-button" onClick={()=>removeCartItem(item)}><i className="fas fa-trash-alt"></i>remove</div> 
                            </div>)
                        }
                    </div>

                   

                   </div> : <div>
                       <p className="text-danger display-6 text-center">Cart is Empty</p>
                   </div>
                   
                }

                {usercart.length != 0 && <div>
                    {/* <div className="mt-5 fw-bold shadow total-price text-center">Total price: <span className="text-dark fw-normal">{cartPrice}</span></div> */}
                    <div className="display-6 mt-5 fw-bold shadow text-center">Total price: <span className="fw-normal text-primary">₹ {cartPrice}</span></div>
                    <Button className='d-block mx-auto text-success mt-3' style={{backgroundColor:"transparent", color:"green"}} onClick={() => navigate("/paymentpage")}>
                        Checkout
                    </Button>
                    
                </div> }

            </div> }
            
            {/* <button className="btn btn-success mt-3 mb-5 d-block mx-auto ps-4 pe-4 fw-bold" >Place Order</button>   */}
            {/* {deliveryMode == "doorDelivery" && <div>
                    {addressList != "" ? <div>
                            <Form onSubmit={handleSubmit(navigateToPaymentPage)} className="mx-auto" style={{width:"80%"}}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select delivery Mode:</Form.Label>
                                    {
                                        addressList.map(addressObj => <Form.Check label={(Object.values({...addressObj, _id:""})).toString()} name="address" type="radio" value={JSON.stringify(addressObj)} {...register("address")} />)
                                    }
                                </Form.Group>
                                <div className="d-flex justify-content-around">
                                    <Button variant="primary" onClick={() => navigate("/addaddress")}>
                                        add new address
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Deliver to this address
                                    </Button>
                                </div>
                            </Form>
                    </div> : <div>
                            <Button variant="primary" onClick={() => navigate("/addaddress")}>
                                add new address
                            </Button>
                        </div> 
                    }
                </div>  
            }  */}
            {/* {deliveryMode == "takeAway" && <div>
                        <Button variant="primary" onClick={() => navigate("/paymentpage")}>
                            Checkout
                        </Button>
                </div> } */}

                {/* <Button variant="primary" onClick={() => navigate("/paymentpage")}>
                            Checkout
                        </Button> */}
            
        </div>
    );
}

export default Cart;