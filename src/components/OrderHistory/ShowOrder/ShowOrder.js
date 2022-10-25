import React, {useState, useEffect} from 'react';
import StarRating from 'react-star-ratings';
import {Form, Button, Modal} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import RatingModal from './RatingModal';
import './ShowOrder.css';
import { getActiveOrders } from '../../../slices/activeOrderSlice';
import { itemDetails } from '../../../slices/itemSlice';




function ShowOrder({pastorder, setModalVisible, ...props}) {

    let {pastOrders} = useSelector(state => state.activeorders);
    let {userObj} = useSelector(state => state.user);
    let dispatch = useDispatch();


    let {register, handleSubmit, formState:{errors}} = useForm();

    const [easeOfOrdering, seteaseOfOrdering] = useState(0);
    const [qualityOfFood, setqualityOfFood] = useState(0);
    const [deliveryEffectiveness, setdeliveryEffectiveness] = useState(0);
    const [isRated, setisRated] = useState(false);
    
    const onFeedBackSubmit = async (data) => {
        let updatedOrderObj = {...pastorder, rating:{easeOfOrdering:easeOfOrdering, qualityOfFood:qualityOfFood, deliveryEffectiveness:deliveryEffectiveness, ...data}};
        console.log(updatedOrderObj)
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.put(`http://localhost:5003/user/updateorderfeedback`, updatedOrderObj, {
            headers:{ Authorization:"Bearer " + token}
        });
        if(res.data.message == "feedback Submitted"){
            dispatch(getActiveOrders(userObj));
            dispatch(itemDetails());
            seteaseOfOrdering(0);
            setqualityOfFood(0);
            setdeliveryEffectiveness(0);
            setisRated(true)
        }else{
            alert(res.data.message)
        }
        
    }
    useEffect(() => {
        if(pastorder.rating){
            setisRated(true)
        }
    }, []);


    
    return (
        <div className='container'>
            <Modal centered {...props} ClassName = "" fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title> <h1 className="text-center fw-bold mx-auto d-block">Order Details</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <p className='ms-3 me-3'>
                        Delivered on {new Date(pastorder.date).toUTCString()} 
                        <i className="fa-solid fa-circle-check text-success"></i>
                    </p> */}
                    <div className='d-flex justify-content-between past_orders_footer'>
                        <p className='ms-3 me-3'>
                            Delivered on {new Date(pastorder.createdAt).toLocaleString()} 
                            <i className="fa-solid fa-circle-check text-success"></i>
                        </p>  
                        <h6 className='mt-3 mb-3 me-3' >Paid: {pastorder.paymentMode}</h6>
                    </div>
                    <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                    {pastorder.items.map(item => <div className='d-flex justify-content-between past_orders_footer'>
                        <h6 className='mt-3 mb-3 ms-3' >{item.itemName} x {item.cartQuantity}</h6>
                        <h6 className='mt-3 mb-3 me-3' > 
                            ₹ {(+item.cartQuantity) * item.price}
                            <img src={item.itemImage} alt="" className='order_items_image_styling'/>
                        </h6>
                    </div>)}
                    <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                    <div className='d-flex justify-content-between past_orders_footer'>
                        <h6 className='mt-3 mb-3 ms-3' >Item Total:</h6>
                        <h6 className='mt-3 mb-3 me-3' > ₹ {pastorder.totalAmount}</h6>
                    </div>
                    <div className='d-flex justify-content-between past_orders_footer'>
                        <h6 className='mt-3 mb-3 ms-3' >Discount:</h6>
                        <h6 className='mt-3 mb-3 me-3' > ₹ {pastorder.discount}</h6>
                    </div>
                    <div className='d-flex justify-content-between past_orders_footer'>
                        <h6 className='mt-3 mb-3 ms-3' >Delivery Charges:</h6>
                        <h6 className='mt-3 mb-3 me-3' > ₹ {pastorder.deliveryCharges}</h6>
                    </div>
                    <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                    <div className='d-flex justify-content-between past_orders_footer'>
                        <h6 className='mt-3 mb-3 ms-3' >Bill Total:</h6>
                        <h6 className='mt-3 mb-3 me-3' > ₹ {pastorder.billTotal}</h6>
                    </div>
                    {/* <div className='d-flex justify-content-between past_orders_footer'>
                        <h6 className='mt-3 mb-3 ms-auto' > Paid: {pastorder.paymentMode}</h6>
                    </div> */}
                    <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                    
                        {!isRated ? <Form onSubmit={handleSubmit((data) => onFeedBackSubmit(data,pastorder))}>
                            <h3 className="text-center">RATE</h3>
                            <Form.Group className="mb-3">
                                <Form.Label className='fw-bold'>Ease of Ordering:</Form.Label>
                                    <br />
                                    <StarRating
                                        rating={easeOfOrdering}
                                        starRatedColor="red"
                                        changeRating={(NewRating, name) => seteaseOfOrdering(NewRating)}
                                        numberOfStars={5}
                                        name={props.name}
                                    />
                                </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='fw-bold'>Quality of food:</Form.Label>
                                <br />
                                    <StarRating
                                        rating={qualityOfFood}
                                        starRatedColor="red"
                                        changeRating={(NewRating, name) => setqualityOfFood(NewRating)}
                                        numberOfStars={5}
                                        name={props.name}
                                    />
                                </Form.Group> 
                            
                            {pastorder.deliveryMode == 'door delivery' && <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='fw-bold'>Delivery Effectiveness:</Form.Label>
                                    <br />
                                    <StarRating
                                        rating={deliveryEffectiveness}
                                        starRatedColor="red"
                                        changeRating={(NewRating, name) => setdeliveryEffectiveness(NewRating)}
                                        numberOfStars={5}
                                        name={props.name}
                                    />

                                </Form.Group>}

                                <Form.Group className="mb-3">
                                    <Form.Label>FeedBack:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        {...register("feedback", {required:true})}
                                    />
                                    {errors.feedback?.type=="required" && <p className="text-danger fw-bold">* Please give feedback</p>}

                                </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form> : <p className="text-success text-center fw-bold"> Rated <i className="fa-solid fa-circle-check text-success"></i></p> }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowOrder;