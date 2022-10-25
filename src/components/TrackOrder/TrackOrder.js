import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import './TrackOrder.css';
import { getActiveOrders } from '../../slices/activeOrderSlice';
import axios from 'axios';

function TrackOrder(props) {
    let {ordersList} = useSelector(state => state.activeorders);
    let {userObj} = useSelector(state => state.user);
    const [expectedTime, setexpectedTime] = useState(0);
    useEffect(() => {
        if(ordersList && ordersList.length != 0){
            setexpectedTime(ordersList[0].expectedDeliveryTime)
        }
    }, [ordersList]);
    setTimeout(()=>{
        if(expectedTime > 0){
          setexpectedTime(expectedTime - 1)
        }
    }, 60000);

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActiveOrders(userObj));
    }, []);
    const updateTrackingStatus = () => {
        dispatch(getActiveOrders(userObj));
    }

    const cancelOrder = async (id) => {
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.put(`http://localhost:5003/user/cancelorder/${id}`,{message:"cancelled"}, {
            headers:{ Authorization:"Bearer " + token}
        });
        alert(res.data.message);
        dispatch(getActiveOrders(userObj));
    }

    return (

        <div className='mt-5 container'>
            
            <Button className="d-block ms-auto" onClick={updateTrackingStatus}>refresh <i class="fa-solid fa-rotate-right"></i></Button>
            {ordersList && <div>
                
                {ordersList.length != 0 && <div className='row'>
                    <h6 data-testid = 'deliveryTime' className="text-danger stick_to_top mx-auto col-12 text-center" style={{fontSize:"1.5rem"}}>
                        Delivery in {expectedTime} min
                    </h6>
                    <div className='col-12 mx-auto border p-3 d-flex justify-content-between'>
                        <p className="text-primary order_tracking_messages ">1. Order Placed </p>
                        <i className="fa-solid fa-circle-check text-success order_tracking_messages"></i>
                    </div>
                    {ordersList[0].trackingStatus.map((status, index) => <div className='col-12 mx-auto border p-3 d-flex justify-content-between'>
                            <p className="text-primary order_tracking_messages">{index+2}. {status} </p>
                            <i className="fa-solid fa-circle-check text-success order_tracking_messages d-flex align-items-center"></i>

                        </div>
                    
                    )}
                    {ordersList[0].canCancel ? <div className="col-12 mx-auto button" onClick={() => cancelOrder(ordersList[0]._id)} style={{width:"fit-content"}}>
                            Cancel Order 
                        </div> : <p className="text-danger text-center">
                            Cancellation not available now
                        </p>
                    }
                    </div> }
            </div> }
        </div>
    );
}

export default TrackOrder;