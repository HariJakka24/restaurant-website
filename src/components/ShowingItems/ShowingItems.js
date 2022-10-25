import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import './ShowingItems.css';
import {Button, Modal} from 'react-bootstrap'

function ShowingItems({items, isOn, setisOn, ...props}) {
    return (
        <div>
            <Modal centered {...props} ClassName = "" fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title> <h1 className="text-center fw-bold mx-auto d-block">{props.category}</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-check form-switch ms-auto me-4 veg_switch_button_styling" style={{width:"fit-content"}}>
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isOn} onChange={()=>setisOn(!isOn)}/>
                        <label class="form-check-label" for="flexSwitchCheckDefault">veg Only</label>
                    </div>
                    {items.length != 0 ? <div className="popular">
                        <div className="box-container">
                            {
                                items.map(item => 
                                    <ItemCard item={item} addItemToCart={props.addItemToCart} setEditObj={props.setEditObj} removeitem={props.removeitem} /> 
                                )
                            }
                        </div>
                    </div> : <div>
                        <p className="text-center text-danger">No Items Available</p>
                    </div> }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowingItems;