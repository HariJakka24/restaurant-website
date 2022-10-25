import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { getAddressesOfUser } from '../../slices/userAddressSlice';

import './EditAddress.css';

function EditAddress(props) {
    let { register, handleSubmit, setValue } = useForm();
    let {userObj} = useSelector(state => state.user);
    let dispatch = useDispatch();


    useEffect(() => {
        setValue("addressLine_1", props.addressObj.addressLine_1)
        setValue("addressLine_2", props.addressObj.addressLine_2)
        setValue("city", props.addressObj.city)
        setValue("pincode", props.addressObj.pincode)
    }, [])
    
    const saveEditedAddress = async (editedAddress) => {
        //get token
        let token = localStorage.getItem("token");
        let res = await axios.put(`http://localhost:5003/user/save-editedaddress/${userObj.username}`, {...props.addressObj, ...editedAddress}, {
            headers:{ Authorization:"Bearer " + token}
        })
        alert(res.data.message);
        dispatch(getAddressesOfUser(userObj));
        props.onHide();

    }
    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form className='w-100 mx-auto' onSubmit={handleSubmit(saveEditedAddress)}>
                            <Row>
                                <Col xs={11}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>address line 1</Form.Label>
                                        <Form.Control type="text" placeholder="address line 1" {...register("addressLine_1")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>address line 2</Form.Label>
                                        <Form.Control type="text" placeholder="address line 2" {...register("addressLine_2")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>city</Form.Label>
                                        <Form.Control type="text" placeholder="city" {...register("city")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>pincode</Form.Label>
                                        <Form.Control type="number" placeholder="pincode" {...register("pincode")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                           
                            <Button type="submit">Save</Button>
                        </Form>
                    </Container>
                </Modal.Body>
             
            </Modal>
        </div>
    );
}

export default EditAddress;