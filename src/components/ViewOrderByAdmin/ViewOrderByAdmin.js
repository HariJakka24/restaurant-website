import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';import './ViewOrderByAdmin.css';
import { getActiveOrders } from '../../slices/activeOrderSlice';

function ViewOrderByAdmin({order,updateTrackStatus, closeOrder, ...props}) {

    let {userObj} = useSelector(state => state.user);
    let {register, handleSubmit, formState:{errors}} = useForm();
    let dispatch = useDispatch();

    const [expectedTime, setexpectedTime] = useState(order.expectedDeliveryTime);
    const [time, settime] = useState(order.expectedDeliveryTime);

    const [message, setmessage] = useState(null);
    const [show, setshow] = useState(false);
    const [isCancel, setisCancel] = useState(false);

    const onHide = () =>{
        setisCancel(false)
        setshow(false)
    }


    useEffect(() => {
        settime(expectedTime);
    }, [expectedTime]);

    setTimeout(async ()=>{
        if(expectedTime > 0){
          setexpectedTime(expectedTime - 1)
          await axios.put(`http://localhost:5003/user/update_expectedtime/${order._id}`, {expectedTime:(expectedTime-1)});
        }
    }, 60000);

    console.log("expectedTime", expectedTime);

    const updateExpectedTime =async (id) => {
        console.log(expectedTime);
        setexpectedTime(time);
        let res = await axios.put(`http://localhost:5003/user/update_expectedtime/${order._id}`, {expectedTime:time});
        alert(res.data.message);
        // dispatch(getActiveOrders(userObj));
    }

    const handleExpectedInput = (time) => {
        console.log(time);
        settime(time)
    }

    const cancelOrder = async (id) => {
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.put(`http://localhost:5003/user/cancelorder/${id}`, {reason:message}, {
            headers:{ Authorization:"Bearer " + token}
        });
        alert(res.data.message);
        dispatch(getActiveOrders(userObj));
    }

    return (
        <div>
            <Modal {...props} centered fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Order# {order._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row" key={order._id}>
                            <div className='col-12 col-md-6'>
                                <div className='d-flex justify-content-between past_orders_footer'>
                                    <p className='ms-3 me-3'>
                                        Ordered on {new Date(order.createdAt).toLocaleString()} 
                                    </p>  
                                    <h6 className='mt-3 mb-3 me-3' >Payment: {order.paymentMode}</h6>
                                </div>
                                <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                                {order.items.map(item => <div className='d-flex justify-content-between past_orders_footer'>
                                    <h6 className='mt-3 mb-3 ms-3' >{item.itemName} x {item.cartQuantity}</h6>
                                    <h6 className='mt-3 mb-3 me-3' > 
                                        ₹ {(+item.cartQuantity) * item.price}
                                        <img src={item.itemImage} alt="" className='order_items_image_styling'/>
                                    </h6>
                                </div>)}
                                <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                                <div className='d-flex justify-content-between past_orders_footer'>
                                    <h6 className='mt-3 mb-3 ms-3' >Item Total:</h6>
                                    <h6 className='mt-3 mb-3 me-3' > ₹ {order.totalAmount}</h6>
                                </div>
                                <div className='d-flex justify-content-between past_orders_footer'>
                                    <h6 className='mt-3 mb-3 ms-3' >Discount:</h6>
                                    <h6 className='mt-3 mb-3 me-3' > ₹ {order.discount}</h6>
                                </div>
                                <div className='d-flex justify-content-between past_orders_footer'>
                                    <h6 className='mt-3 mb-3 ms-3' >Delivery Charges:</h6>
                                    <h6 className='mt-3 mb-3 me-3' > ₹ {order.deliveryCharges}</h6>
                                </div>
                                <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                                <div className='d-flex justify-content-between past_orders_footer'>
                                    <h6 className='mt-3 mb-3 ms-3' >Bill Total:</h6>
                                    <h6 className='mt-3 mb-3 me-3' > ₹ {order.billTotal}</h6>
                                </div>
                                {/* <div className='d-flex justify-content-between past_orders_footer'>
                                    <h6 className='mt-3 mb-3 ms-auto' > Paid: {order.paymentMode}</h6>
                                </div> */}
                                <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                                
                                {order.deliveryAddress && <div>
                                    <h6 className='mt-3 mb-3 ms-3' >Address:</h6>
                                    <p>{(Object.values({...order.deliveryAddress, _id:""})).toString()}</p>
                                </div>}
                                {order.isCancelled ? <div>
                                    <p className="text-danger text-center">Order Cancelled</p>
                                </div> : <div>
                                    {!order.isDelivered && <Button onClick={() => {setisCancel(true); setshow(true)}}>Cancel Order</Button>}
                                    {isCancel && 
                                        <Modal centered show={show} onHide={onHide} ClassName = "">
                                            <Modal.Header closeButton>
                                                <Modal.Title> <h1 className="text-center fw-bold mx-auto d-block">Reason For Cancellation</h1> </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <label className='form-label' htmlFor="message">Reason:</label>
                                                <input className='form-group' type="text" onChange={(e) => setmessage(e.target.value)} />
                                                {message && message!=" " && <Button onClick={() => cancelOrder(order._id)}>Confirm</Button> }
                                                
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={onHide}>Cancel</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    }
                                </div> }
                                
                            </div>
                
                            {order.orderStatus ? <div className='col-12 col-md-6 d-flex justify-content-between'>
                                <Form className=''>
                                    <Form.Check type="switch" label="Order confirmed" value="Order confirmed" onClick={(e) => updateTrackStatus(e, order.username)}/>
                                    <Form.Check type="switch" onClick={(e) => updateTrackStatus(e, order.username)} label="Order accepted by kitchen" value="Order accepted by kitchen"/>
                                    <Form.Check type="switch" value="Order preparation in progress" onClick={(e) => updateTrackStatus(e, order.username)} label="Order preparation in progress"/>
                                    <Form.Check type="switch" value="Ready for Packaging" onClick={(e) => updateTrackStatus(e, order.username)} label="Ready for Packaging"/>
                                    <Form.Check type="switch" value="Ready to Deliver" onClick={(e) => updateTrackStatus(e, order.username)} label="Ready to Deliver"/>
                                    {order.deliveryMode == "door delivery" ? <div>
                                            <Form.Check type="switch" value="Picked Up by Delivery Boy" onClick={(e) => updateTrackStatus(e, order.username)} label="Picked Up by Delivery Boy"/>
                                            <Form.Check type="switch" value="On the Way" onClick={(e) => updateTrackStatus(e, order.username)} label="On the Way"/>
                                            {order.paymentMode == "online" ? 
                                                <Form.Check type="switch" value="Delivered" onClick={(e) => updateTrackStatus(e, order.username)} label="Delivered"/> :
                                                <Form.Check type="switch" value="Payment received and Delivered" onClick={(e) => updateTrackStatus(e, order.username)} label="Payment received and Delivered"/>
                                            }
                                        </div> : <div>
                                            {order.paymentMode == "online" ? 
                                                <Form.Check type="switch" value="Delivered" onClick={(e) => updateTrackStatus(e, order.username)} label="Delivered"/> :
                                                <Form.Check type="switch" value="Payment received and Delivered" onClick={(e) => updateTrackStatus(e, order.username)} label="Payment received and Delivered"/>
                                            }

                                        </div> 
                                    }
                                    <Button variant='warning' 
                                        onClick={() => closeOrder(order._id)}
                                        >
                                            close the order
                                        </Button>
                                </Form>
                                <div>
                                    <label className='form-control' htmlFor="expectedTime"> Expected Time</label>
                                    <input className='form-control' type= "number" name='expectedTime' value={time} onChange={(e) => handleExpectedInput(e.target.value)}/>
                                    <Button onClick={updateExpectedTime}>Update</Button>
                                </div>
                            </div> : <p className="text-center text-danger">Order Closed</p> }
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onHide}>
                        Close 
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ViewOrderByAdmin;