import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './OrderHistory.css';

import ShowOrder from './ShowOrder/ShowOrder';

function OrderHistory(props) {
    let {pastOrders} = useSelector(state => state.activeorders);


    const [order, setorder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


   

    const onHide = () => {
        setModalVisible(false);
        setorder(null)
    }

    return (
        <div className='container'>
            {pastOrders && <div>
                    {pastOrders.length != 0 ? <div>
                        
                        {
                            pastOrders.map((pastorder, index) => <div className='mb-5'>
                                {!pastorder.isCancelled ? <div className="mt-1 border border-primary p-3 order_box" key={index} >
                                    <div class="row ps-3 " onClick={() => {setorder(pastorder); setModalVisible(true)}} style={{cursor:"pointer"}}>
                                        <img src={pastorder.items[0].itemImage} alt="" className='col-3 past_orders_image'/>
                                        <div className='text-start col-4 past_orders_content'>
                                            <h6 class="text-primary"> {pastorder.paymentMode} </h6>
                                            <h6 class="text-primary">ORDER {pastorder._id} </h6>
                                            <h6 className='w-100'>
                                                {pastorder.items.length != 1 ? <p>{pastorder.items.length} items</p> :
                                                    <p>{pastorder.items.length} item</p>
                                                }
                                            </h6>
                                            {pastorder.rating != undefined ? <button className='past_orders_button fw-bold text-success'>Rated</button>:
                                                <button className='past_orders_button fw-bold'>rate</button>
                                            }
                                        </div>

                                        <p className='col-5 past_orders_content_end'>
                                            Delivered on {new Date(pastorder.createdAt).toLocaleString()} 
                                            <i className="fa-solid fa-circle-check text-success"></i>
                                        </p>
                                    </div>
                                    <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                                    <div className='d-flex justify-content-between past_orders_footer'>
                                        <div>
                                            {
                                                pastorder.items.map(item => 
                                                    <h6 className='mt-3 mb-3 ms-3' >{item.itemName} x {item.cartQuantity}</h6>
                                                )
                                            }
                                        </div>
                                        <h6 className='mt-3 mb-3 me-3' >Total Paid: ₹ {pastorder.billTotal}</h6>
                                    </div>
                                </div> : <div className="mt-1 border border-primary p-3 order_box cancelled_order" key={index} >
                                        <div class="row ps-3 ">
                                            <img src={pastorder.items[0].itemImage} alt="" className='col-3 past_orders_image'/>
                                            <div className='text-start col-4 past_orders_content'>
                                                {/* <h6 class="text-primary"> {pastorder.paymentMode} </h6> */}
                                                <h6 class="text-primary">ORDER {pastorder._id} </h6>
                                                <h6 className='w-100'>
                                                    {pastorder.items.length != 1 ? <p>{pastorder.items.length} items</p> :
                                                        <p>{pastorder.items.length} item</p>
                                                    }
                                                </h6>
                                                {pastorder.rating != undefined ? <button className='past_orders_button fw-bold text-success'>Rated</button>:
                                                    <button className='past_orders_button fw-bold text-danger'>Cancelled</button>
                                                }
                                            </div>

                                            <p className='col-5 past_orders_content_end'>
                                                Cancelled on {new Date(pastorder.createdAt).toLocaleString()} 
                                                <i className="fa-solid fa-circle-xmark text-danger"></i>
                                            </p>
                                        </div>
                                    <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                                    <div className='d-flex justify-content-between past_orders_footer'>
                                        <div>
                                            {
                                                pastorder.items.map(item => 
                                                    <h6 className='mt-3 mb-3 ms-3' >{item.itemName} x {item.cartQuantity}</h6>
                                                )
                                            }
                                        </div>
                                        <h6 className='mt-3 mb-3 me-3' >Bill Total: ₹ {pastorder.totalAmount}</h6>
                                    </div>
                                </div>}
                                </div> )
                            }
                            </div> : <div>
                                <p className="text-danger text-center display-6 mt-5">No Orders History yet... !</p>
                            </div>
                    }
                </div> 
                
            }
            {order && 
                <ShowOrder 
                    show = {modalVisible}
                    setModalVisible={setModalVisible}
                    pastorder={order} 
                    onHide = {onHide} 
                />
            }

        </div>
    );
}

export default OrderHistory;