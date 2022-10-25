import React from 'react';
import './PaymentPage.css';
import {useForm} from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {Form, Button} from 'react-bootstrap';

import { updatePaymentStatus, getCartItems } from '../../slices/userCartSlice';
import axios from 'axios';
import { setAddressForDelivery } from '../../slices/userAddressSlice';

function PaymentPage(props) {
    let {register, handleSubmit, formState:{errors}}=useForm()
    let {usercart, cartPrice, isPaid} = useSelector(state=>state.cart)
    let {userObj} = useSelector(state=>state.user)
    let {addressForDelivery} = useSelector(state=>state.address)
    let {addressList} = useSelector(state => state.address);


    let navigate = useNavigate()
    let dispatch = useDispatch();
    const [paymenttype, setpaymenttype] = useState(null);
    const [discount, setdiscount] = useState(0);
    const [deliveryCharges, setdeliveryCharges] = useState(0);
    const [billTotal, setbillTotal] = useState(0);
    const [deliverymode, setdeliverymode] = useState(null);
    const [isOnline, setisOnline] = useState(false);


    // useEffect(() => {
    //     if(addressForDelivery != null){
    //         setdeliverymode("door delivery");
    //     }else{
    //         setdeliverymode("take away");
    //     }
    // }, [addressForDelivery]);

    useEffect(() => {
        setdeliveryCharges( (cartPrice - discount) >= 500 ? 0 : 50)
    }, [cartPrice, discount]);

    useEffect(() => {
        setbillTotal( cartPrice +  deliveryCharges - discount )
    }, [cartPrice, discount, deliveryCharges]);

    const handlePayment=async (data)=>{
        console.log(data);
        let orderDetailsObj;
        data.deliveryAddress ? 
         orderDetailsObj = {username:userObj.username, mobile:userObj.mobile, items:usercart, totalAmount:cartPrice, discount:discount, deliveryCharges:deliveryCharges, billTotal:billTotal, ...data, deliveryAddress:JSON.parse(data.deliveryAddress)}
         : 
         orderDetailsObj = {username:userObj.username, mobile:userObj.mobile, items:usercart, totalAmount:cartPrice, discount:discount, deliveryCharges:deliveryCharges, billTotal:billTotal, ...data}

        console.log(orderDetailsObj);
        // get token
        let token = localStorage.getItem("token");
        let res = await axios.post("http://localhost:5003/user/addorder", orderDetailsObj, {
            headers:{ Authorization:"Bearer " + token}
        })
        // dispatch(updatePaymentStatus(true));
        dispatch(getCartItems(userObj));
        alert(res.data.message);
        if(res.data.message == "order placed"){
            navigate("/trackorder");
        }
        
        
    }
    const updatePaymentType=(e)=>{
        setpaymenttype(e.target.value)
    }
    useEffect(() => {
        if(paymenttype=="debitcard" || paymenttype=="creditcard"){
            setdiscount(cartPrice * 0.1)
        }else{
            setdiscount(0)
        }
    }, [paymenttype]);
    // useEffect(() => {
    //     if(isPaid){
    //         dispatch(updateUserCart(null));
    //     }
    // }, [isPaid]);

    const handlePaymentMode = (e) => {
        e.target.value == "online" ? setisOnline(true) : setisOnline(false);
    }

    const handleDeliveryType = (e) => {
        setdeliverymode(e.target.value)
    }

    return (
        <div className='payment-page'>
            <div className="row pt-5 ms-1">
                <div className='col-10 col-md-6 mx-auto price-details'>
                    <h3 className='fw-bold text-center border-bottom border-success'>Order Details:</h3>
                    <div className="ms-5 d-flex justify-content-between">
                        <p className=''>{`Price( ${usercart.length} items ) `}</p>
                        <p>₹ {cartPrice.toFixed(2)}</p>
                    </div>
                    <div className="ms-5 d-flex justify-content-between">
                        <p className=''>Discount</p>
                        <p>₹ {discount.toFixed(2)}</p>
                    </div>
                    <div className="ms-5 d-flex justify-content-between">
                        <p>Delivery Charges</p>
                        
                        <p>₹ {deliveryCharges}</p>
                    </div>     
                    <div className="ms-4 d-flex justify-content-between">
                        <h4>Total Payable</h4>
                        <p>₹ {billTotal.toFixed(2)}</p>
                    </div>
                    <p className="text-primary text-center"><i className="fas fa-tags"></i> Free Delivery on orders above ₹ 500</p>  
                    <p className="text-primary text-center pb-3 border-bottom border-success"><i className="fas fa-tags"></i> Get 10% instant discount using any Credit & Debit Cards</p>
                              
                </div>
                {/* <div className="payment-page-image mx-auto col-10 col-md-6 bg-info">
                </div> */}
            </div> 

            <form onSubmit={handleSubmit(handlePayment)} className='row'>
                    <Form.Group className="mb-3 col-10 col-md-7 mx-auto border mt-4">
                        <Form.Label className='text-center d-block mx-auto'>Select delivery Mode:</Form.Label>
                        <div className="d-flex justify-content-around">
                            <Form.Check type="radio" label= 'Take Away' value="take away" onClick={handleDeliveryType} {...register("deliveryMode", {required:true})}/> 
                            <Form.Check type="radio" label= 'Door Delivery' value="door delivery" onClick={handleDeliveryType} {...register("deliveryMode", {required:true})}/>
                        </div>
                    </Form.Group>
                    {errors.deliveryMode?.type=="required" && <p className="text-danger fw-bold">* Please Select delivery mode</p>}


                    {deliverymode == "door delivery" && <div>
                        {addressList && addressList != "" ? <div>
                            {/* {addressList.length != 0 ? <div> */}
                                {/* <Form onSubmit={handleSubmit(navigateToPaymentPage)} className="mx-auto" style={{width:"80%"}}> */}
                                    <Form.Group className="mb-3 col-10 col-md-7 mx-auto border mt-4">
                                        <Form.Label className='text-center d-block mx-auto p-3'>Select delivery Address:</Form.Label>
                                        {
                                            addressList.map(addressObj => <Form.Check label={(Object.values({...addressObj, _id:""})).toString()} name="address" type="radio" value={JSON.stringify(addressObj)} {...register("deliveryAddress", {required:true})} onClick={(e) => dispatch(setAddressForDelivery(e.target.value))}/>)
                                        }
                                        {errors.deliveryAddress?.type=="required" && <p className="text-danger fw-bold">* Please Select Address</p>}

                                        <Button className='d-block mx-auto' onClick={() => navigate("/addaddress")}>
                                            add new address
                                        </Button>
                                    </Form.Group>

                        </div> : <div>
                                <Button variant="primary" className='d-block mx-auto' onClick={() => navigate("/addaddress")}>
                                    add new address
                                </Button>
                            </div> 
                        }
                        </div>  
                    }


                    {(addressForDelivery || deliverymode == "take away") && <div>
                    <Form.Group className="mb-3 col-10 col-md-7 mx-auto border mt-4">
                        <Form.Label className='text-center d-block mx-auto'>Select Payment Mode</Form.Label>
                        <div className="d-flex justify-content-around">
                            <Form.Check type="radio" label= 'Cash on Delivery' value="cod" onClick={handlePaymentMode} {...register("paymentMode", {required:true})}/> 
                            <Form.Check type="radio" label= 'Online Payment' value="online" onClick={handlePaymentMode} {...register("paymentMode", {required:true})}/>
                        </div>
                        {errors.paymentMode?.type=="required" && <p className="text-danger fw-bold">* Please Select Payment Mode</p>}

                    </Form.Group>

                    {!isOnline ? <div>
                        </div> : <div>
                        <div className="mb-3 col-10 col-md-7 mx-auto border mt-4">
                            <label className='d-block fw-bold display-6 text-center'>select Payment type:</label>
                            <div className="form-check ms-4 mt-3">
                                <input type="radio" value="debitcard" onClick={updatePaymentType} {...register("paymentmethod", {required:true})} className='form-check-input' />
                                <label className='fw-bold' htmlFor="debitcard"><i className="fas fa-credit-card"></i>Debit Card</label>
                            </div>
                            {paymenttype=="debitcard" && <div className="ms-5">
                                <input className='form-control border-primary w-50' placeholder='cvv'{...register("debitcarddetails", {required:true})}/>
                                {errors.debitcarddetails?.type==="required" && <p className="text-danger fw-bold">* Enter Card Details</p>}
                            </div> }
                            
                            <div className="form-check ms-4 mt-3">
                                <input type="radio" value="creditcard" onClick={updatePaymentType} {...register("paymentmethod", {required:true})} className='form-check-input' />
                                <label className='fw-bold' htmlFor="creditcard">Credit Card</label>
                            </div> 
                            {paymenttype=="creditcard" && <div className="ms-5">
                                <input className='form-control w-50 border-primary' placeholder='cvv'{...register("creditcarddetails", {required:true})} />
                                {errors.creditcarddetails?.type==="required" && <p className="text-danger fw-bold">* Enter OTP</p>}
                            </div> }

                            <div className="form-check ms-4 mt-3">
                                <input type="radio" value="wallet" onClick={updatePaymentType} {...register("paymentmethod", {required:true})} className='form-check-input' />
                                <label className='fw-bold' htmlFor="wallet">Wallets</label>
                            </div>
                            {paymenttype=="wallet" && <div className="mb-3">
                                <div className="form-check ms-5 mt-3 mb-4">
                                    <input type="radio"  value="phonepe" {...register("wallettype", {required:true})} className='form-check-input' />
                                    <label className='phonepe-icon ms-1' htmlFor="phonepe">
                                        PhonePe
                                    </label>
                                </div>

                                <div className="form-check ms-5">
                                    <input type="radio" value="paytm" {...register("wallettype", {required:true})} className='form-check-input' />
                                    <label htmlFor="paytm">
                                        <img className='paytm-image' src="https://cdn2.iconfinder.com/data/icons/social-icons-color/512/paytm-512.png" alt="" />
                                    </label>
                                </div> 

                                {errors.wallettype?.type==="required" && <p className="text-danger fw-bold ms-5">* Select wallet</p>}
                            </div> }
                            
                            <div className="form-check ms-4 mt-3 mx-auto">
                                <input type="radio" value="upi" onClick={updatePaymentType} {...register("paymentmethod", {required:true})} className='form-check-input' />
                                <label className='fw-bold' htmlFor="upi">UPI Payment</label>
                            </div>
                            {paymenttype=="upi" && <div className="mb-3">
                                <div className="form-check ms-5 mt-3">
                                    <input type="radio" value="phonepe" {...register("wallettype", {required:true})} className='form-check-input' />
                                    <label className='phonepe-icon ms-1' htmlFor="phonepe">
                                        PhonePe
                                    </label>
                                </div>
                                
                                <div className="form-check ms-5 mt-4">
                                    <input type="radio"  value="googlepay" {...register("wallettype", {required:true})} className='form-check-input' />
                                    <label htmlFor="googlepay"><i className="fab fa-google-pay google-pay-icon ms-1"></i></label>
                                </div>  

                                <div className="form-check ms-5 mt-4">
                                    <input type="radio" value="amazonpay" {...register("wallettype", {required:true})} className='form-check-input' />
                                    <label htmlFor="amazonpay" className='d-flex'>
                                        <img className='amazon-image' src="https://cdn4.iconfinder.com/data/icons/circle-payment/32/payment_006-amazon-512.png" alt="" />
                                        <i className="fab fa-cc-amazon-pay amazon"></i>
                                    </label>
                                </div>

                                <div className="form-check ms-5 mt-4">
                                    <input type="radio" value="paytm" {...register("wallettype", {required:true})} className='form-check-input' />
                                    <label htmlFor="paytm">
                                        <img className='paytm-image' src="https://cdn2.iconfinder.com/data/icons/social-icons-color/512/paytm-512.png" alt="" />
                                    </label>
                                </div>

                                {errors.wallettype?.type==="required" && <p className="text-danger fw-bold ms-5">* Select UPI</p>}
                            </div> }

                            {errors.paymentmethod?.type==="required" && <p className="text-danger fw-bold">* Select Payment type</p>}
                        </div>   
                        </div> }  
                        <div className="pb-5">
                            <button type='submit' className="btn btn-success d-block mx-auto">Order</button>
                        </div> 
                    </div> }                
            </form>   
        </div>
    );
}

export default PaymentPage;