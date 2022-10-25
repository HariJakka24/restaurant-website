import React from 'react';
import './EditProfile.css';
import { Offcanvas, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import EditProfilePic from './EditProfilePic';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function EditProfile(props) {
    let { register, handleSubmit, setValue, formState:{errors} } = useForm();
    let {userObj} = useSelector(state => state.user);

    let navigate = useNavigate();
    useEffect(() => {
        setValue("username", props.userObj.username)
        setValue("email", props.userObj.email)
        setValue("city", props.userObj.city)
        setValue("name", props.userObj.name)
        setValue("mobile", props.userObj.mobile)
        setValue("profileImage", props.userObj.profileImage)
        props.setImageUrl(props.userObj.profileImage)
    }, [])

    // const [modalShow, setmodalShow] = useState(false);
    // const setEditObj = async(itemObj)=>{
    //     setmodalShow(true)
    //     seteditItemObj({...editItemObj, ...itemObj})
    // }



    return (
      <>
        {/* <Button variant="primary" onClick={handleShow} className="me-2">
          Edit Profile
        </Button> */}
        <Offcanvas {...props} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Edit Profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container>
                    <Form className='w-100 mx-auto' onSubmit={handleSubmit(props.onHide)}>
                        <Row>
                            <Col xs={11} >
                                <Form.Group className="mb-3" controlId="formBasicProfileImage">
                                    <Form.Label>Profile Pic</Form.Label>
                                    {/* <Form.Control type="file" label="image" 
                                    // {...register("profileImage")}
                                     onChange = {event => props.setfile(event.target.files[0])}
                                     /> */}
                                     {/* {props.imageUrl ? <img src={props.imageUrl} alt="" className='profile_pic_view d-block mx-auto border border-primary'/> :
                                        <img src="" alt="profile pic" className='profile_pic_view d-block mx-auto border border-primary'/>
                                     }
                                     <input type="file" class="custom-file-input" onChange = {event => props.getImageUrl(event.target.files[0])}></input> */}
                                     {props.imageUrl && <div className="m-2 profile_upload_styling">
                                            <img src={props.imageUrl} alt="" className='profile_pic_view d-block mx-auto border border-primary'/>
                                            <i class="fa-solid fa-camera camera_icon"></i>
                                            <input type="file" class="custom-file-input d-block mx-auto" onChange = {event => props.getImageUrl(event.target.files[0])}/>
                                        </div>
                                     }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={11}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" {...register("username")} disabled/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={11} >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Edit email" {...register('email')} disabled/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={11} >
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" {...register("name", {required:true})} />
                            </Form.Group>
                            {errors.name?.type=="required" && <p className="text-danger fw-bold">* Please Enter the name</p>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={11} >
                            <Form.Group className="mb-3" >
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="number" placeholder="mobile number" {...register("mobile", {required:true, minLength:10, maxLength:10})} />
                            </Form.Group>
                            {errors.mobile?.type=="required" && <p className="text-danger fw-bold">* Please enter mobile nuber</p>}
                            {errors.mobile?.type=="minLength" && <p className="text-danger fw-bold">* Invalid mobile nuber</p>}
                            {errors.mobile?.type=="maxLength" && <p className="text-danger fw-bold">* Invalid mobile nuber</p>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={11} >
                                <Form.Group className="mb-3" controlId="formBasicCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="City" {...register('city')} />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        {/* <Button onClick={setEditObj}>Upload Pic</Button> */}
                        <Button type="submit">Save</Button>
                    </Form>

                    {/* <Form.Group className="mb-3" controlId="formBasicProfileImage">
                        <Form.Label>User Profile Pic</Form.Label>
                        <Form.Control type="file" label="image" {...register("profileImage")}
                        //  onChange = {event =>  props.setfile(event.target.files[0])}
                        onClick={}
                            />
                    </Form.Group> */}
                    



                </Container>
                {/* {userObj && userObj.usertype == 'user' &&   
                    <Button onClick={() => {navigate('/orderhistory'); props.setShow(false)}}>View past Orders</Button>
                } */}
          </Offcanvas.Body>
        </Offcanvas>
        
        {/* {ModalShow  &&
            <EditProfilePic
                setmodalShow={setmodalShow}
                show={modalShow}
                // onHide = {(editedPic) => afterEdit(editedPic)}
                setfile = {props.setfile}
            />
        } */}
      </>
    );
  }

  export default EditProfile;

  
//   function Example() {
//     return (
//       <>
//         {['start', 'end', 'top', 'bottom'].map((placement, idx) => (
//           <OffCanvasExample key={idx} placement={placement} name={placement} />
//         ))}
//       </>
//     );
//   }
  
//   render(<Example />);