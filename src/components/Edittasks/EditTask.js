import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect} from 'react'
import React from 'react'
function Edittask(props) {
    let { register, handleSubmit, setValue } = useForm()
    useEffect(() => {
        setValue("taskName", props.taskObj.taskName)
        setValue("date", props.taskObj.date)
        setValue("description", props.taskObj.description)
        setValue("image", props.taskObj.image)
    }, [])
    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit the task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form className='w-100 mx-auto' onSubmit={handleSubmit(props.onHide)}>
                            <Row>
                                <Col xs={11}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Edit Task name</Form.Label>
                                        <Form.Control type="text" placeholder="Task name" {...register("taskName")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Edit Date</Form.Label>
                                        <Form.Control type="date" placeholder="Edit date" {...register('date')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Description" {...register('description')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                <Form.Group className="mb-3" controlId="formBasicPhoto">
                                    <Form.Label>Task Image</Form.Label>
                                    <Form.Control type="file" label="image" {...register("image")} onChange = {event => props.setfile(event.target.files[0])}/>
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
export default React.memo(Edittask);