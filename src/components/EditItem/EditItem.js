import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect} from 'react'
import React from 'react';
import axios from 'axios';
function EditItem(props) {
    let { register, handleSubmit, setValue } = useForm()
    useEffect(() => {
        setValue("itemName", props.itemObj.itemName)
        setValue("price", props.itemObj.price)
        setValue("description", props.itemObj.description)
        setValue("itemImage", props.itemObj.itemImage)
        setValue("category", props.itemObj.category)
        setValue("quantity", props.itemObj.quantity)
        props.setImageUrl(props.itemObj.itemImage)
    }, [])

    const getImageUrl= async (files) => {
        //create formdata object
        let formData = new FormData();
        //append file
        formData.append("photo", files);
        let res = await axios.post("http://localhost:5003/user/getimageurl", formData)
        // let resObj = res.data;
        props.setImageUrl(res.data.url);
    }


    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit the Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form className='w-100 mx-auto' onSubmit={handleSubmit(props.onHide)}>
                            <Row>
                                <Col xs={11} >

                                <Form.Group className="mb-3" >
                                    {props.imageUrl ? <img src={props.imageUrl} alt="" className='profile_pic_view d-block mx-auto border border-primary' /> :
                                    <img src="" alt="" className='profile_pic_view d-block mx-auto border border-primary' /> }
                                    <Form.Label>Item Image</Form.Label>
                                    <Form.Control type="file" placeholder="image" {...register("itemImage")} onChange = {event => getImageUrl(event.target.files[0])}/>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11}>
                                    <Form.Group className="mb-3" controlId="formBasicTaskName">
                                        <Form.Label>item name</Form.Label>
                                        <Form.Control type="text" placeholder="Task name" {...register("itemName")} disabled/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" placeholder="Edit date" {...register('price')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Description" {...register('description')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type="text" placeholder="Description" {...register('category')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="number" placeholder="Description" {...register('quantity')} />
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
export default React.memo(EditItem);