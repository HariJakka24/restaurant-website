import React from 'react';
import './SingleItemModal.css';
import {Button, Modal} from 'react-bootstrap'


function SingleItemModal({item, ...props}) {
    console.log(item);

    const onHide = () => {
        console.log("onhide");
        props.setsingleItem(null);
        props.setmodal(false);
        console.log("onhide");
    }
    

    return (
        <Modal centered {...props} ClassName = "" onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title> <h1 className="text-center fw-bold mx-auto d-block">{item.itemName}</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="mt-3 border border-primary p-3"
                //  style={{maxWidth:"50rem", height:"25rem"}}
                 >
                        <div className="row" 
                        // style={{height:"10rem"}}
                        >
                            <img src={item.itemImage} alt="" className='col-9 mx-auto'/>
                        </div>
                        <hr className='mx-auto' style={{width:"95%", borderTop: "2px dotted red"}} />
                        <div class="row ps-3 ">
                            {/* <span class="price"> {item.price} </span> */}

                            <div className='text-start col-11 col-sm-6'>
                                {item.itemType == 'veg' ?
                                    <h6><i className="fa-regular fa-square-caret-up text-success ms-auto"></i>VEG</h6> : 
                                    <h6><i className="fa-regular fa-square-caret-up text-danger ms-auto"></i>NON_VEG</h6>
                                }
                                {/* <h6 class="text-primary">Id: {item._id} </h6> */}
                                <h6 class="text-primary"> {item.itemName} </h6>
                                
                                <h6 className='w-100'><span className="fw-bold">Categories:</span> <span className="text-muted">{item.category}</span></h6>
                                <h6 class="text-primary"><span className="fw-bold">Price:</span> <span className="text-muted">₹ {item.price}</span></h6>
                                {/* <button className='past_orders_button fw-bold'>View Details</button> */}
                            </div>
                            <p className='col-11 col-sm-6 fw-bold' > Description: <span className='text-muted'>{item.description}</span></p>

                            {/* <p className='col-5 past_orders_content_end'>
                                {item.description}
                            </p> */}
                            
                        </div>
                        
                        {/* <div className='d-flex justify-content-between past_orders_footer'>
                            <h6 className='mt-3 mb-3 ms-3' >{item.name}</h6>
                            <h6 className='mt-3 mb-3 me-3' >Price: ₹ {item.price}</h6>
                        </div> */}
                        

                        {/* {order && <div className='show_order_page bg-warning'>
                            <ShowOrder 
                                show = {modalVisible}
                                setModalVisible={setModalVisible}
                                onStarClick={onStarClick} 
                                pastorder={order} 
                                onHide = {onHide} />
                        </div>
                        } */}
                        
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default SingleItemModal;