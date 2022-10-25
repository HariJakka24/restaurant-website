import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrders } from '../../../slices/activeOrderSlice';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './ActiveOrders.css';
import ViewOrderByAdmin from '../../ViewOrderByAdmin/ViewOrderByAdmin';

function ActiveOrders(props) {
    let {ordersList, pastOrders} = useSelector(state => state.activeorders);
    let {userObj} = useSelector(state => state.user);

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActiveOrders(userObj));
    }, []);



    const refreshOrders = () => {
        dispatch(getActiveOrders(userObj));
    }


    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState(null);
    const [presentStatus, setpresentStatus] = useState("Order Placed");
    const [isUpdating, setisUpdating] = useState(false);

    const onHide = () => {
        setModal(false)
        setOrder(null)
    }


    const updateTrackStatus = async(e, username) => {
        // console.log(e.target.value);
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.put(`http://localhost:5003/user/updateorderstatus/${username}`, {trackingStatus:e.target.value}, {
            headers:{ Authorization:"Bearer " + token}
        });
        
    }
    const closeOrder = async (id) => {
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.put(`http://localhost:5003/user/closeorder/${id}`, {
            headers:{ Authorization:"Bearer " + token}
        });
        alert(res.data.message);
        dispatch(getActiveOrders(userObj));

    }
    


    return (
        <div className='mt-3'>
            <Button onClick={refreshOrders}>Refresh</Button>

            <h5 className="text-success text-start mt-2">Active Orders:</h5>

            {ordersList || ordersList.length != 0 ? <div className="table-responsive">
            <table className=' mb-5 table align-middle'>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>username</th>
                        <th>items</th>
                        <th>billTotal</th>
                        <th>presentStatus</th>
                        <th>View & Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ordersList.map(order => <tr>
                            <td>{order._id}</td>
                            <td>{order.username}</td>
                            <td>
                                {
                                    order.items.map(item => <div>
                                        <img src={item.itemImage} alt="" style={{width:"2rem", height:"2rem"}}/>
                                        <p>{item.itemName} x {item.cartQuantity}</p>
                                    </div> )
                                }
                            </td>
                            <td>{order.billTotal}</td>
                            <td>{order.presentStatus}</td>
                            <td><i className="fa-solid fa-eye" onClick={() => {setOrder(order); setModal(true)}}></i></td>
                        </tr> )
                    }
                </tbody>
            </table>
            </div> : <div>
                <p className="text-danger display-6 text-center">No Active orders</p>
            </div> }

            <h5 className="text-danger text-start">Closed Orders:</h5>

            {pastOrders || pastOrders.length != 0 ? <div className="table-responsive">
            <table className='mb-5 table table-responsive'>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>username</th>
                        <th>items</th>
                        <th>billTotal</th>
                        <th>presentStatus</th>
                        <th>View & Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pastOrders.map(order => <tr>
                            <td>{order._id}</td>
                            <td>{order.username}</td>
                            <td>
                                {
                                    order.items.map(item => <div>
                                        <img src={item.itemImage} alt="" style={{width:"2rem", height:"2rem"}}/>
                                        <p>{item.itemName} x {item.cartQuantity}</p>
                                    </div> )
                                }
                            </td>
                            <td>{order.billTotal}</td>
                            <td>{order.presentStatus}</td>
                            <td>
                                <i className="fa-solid fa-eye" onClick={() => {setOrder(order); setModal(true)}}></i>

                            </td>
                        </tr> )
                    }
                </tbody>
            </table>
            </div> : <div>
                <p className="text-danger display-6 text-center">No Active orders</p>
            </div> }

            {order && 
                <ViewOrderByAdmin
                    show={modal}
                    onHide ={onHide}
                    order ={order}
                    updateTrackStatus={updateTrackStatus}
                    closeOrder={closeOrder}
                />
            }


            







            {/* <div className="d-flex justify-content-evenly" key={order._id}>
                <Card className="shadow">
                            <Card.Body>
                                <Card.Text>
                                    <p>username:{order.username}</p>
                                    <p>totalAmount:{order.totalAmount}</p>
                                    <p className=''>paymentMode:{order.paymentMode}</p>
                                    <p>deliveryMode:{order.deliveryMode}</p>
                                    <p>{order.orderStatus}</p>
                                    <p>date:{order.date}</p>
                                </Card.Text>
                                <Button variant='warning' 
                                // onClick={()=>props.setEditObj(item)}
                                >
                                    Edit
                                </Button>
                                <Button variant='warning'
                                    value="Order Cancelled" 
                                    onClick={(e) => cancelOrder(order._id)}
                                >
                                    Cancel Order
                                </Button>
                            </Card.Body>
                        </Card>
                        <Form >
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
                </div> */}
        </div>
    );
}

export default ActiveOrders;