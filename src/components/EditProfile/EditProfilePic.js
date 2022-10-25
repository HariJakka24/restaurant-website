import React from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect} from 'react'

function EditProfilePic(props) {
    let { register, handleSubmit, setValue } = useForm()

    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit profile Pic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={11} >
                            <Form.Group className="mb-3" controlId="formBasicPhoto">
                                <Form.Label>Item Image</Form.Label>
                                <Form.Control type="file" label="image" onChange = {event => props.setfile(event.target.files[0])}/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Button onClick={() => props.setmodalShow(false)}>Save</Button>
                    </Container>
                </Modal.Body>
             
            </Modal>
        </div>
    );
}

export default EditProfilePic;