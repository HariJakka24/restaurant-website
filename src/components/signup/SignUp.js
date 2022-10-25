import React from 'react';
import "./SignUp.css";
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function SignUp(props) {
    let {register, handleSubmit, formState:{errors}} = useForm();
    let navigate = useNavigate();
    // const [file, setfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    
    const onFormSubmit = async (data) => {
        let userObj = {...data, profileImage: imageUrl};

        //http post request
        let res = await axios.post("http://localhost:5003/user/createuser", userObj)
        let resObj = res.data;
        if(resObj.message == "user created"){
            //navigate to login
            navigate("/login")
            alert(resObj.message);
        }
        else{
            alert(resObj.message)
        }

    }
    const getImageUrl= async (files) => {
        //create formdata object
        let formData = new FormData();
        //append file
        formData.append("photo", files);
        let res = await axios.post("http://localhost:5003/user/getimageurl", formData)
        // let resObj = res.data;
        setImageUrl(res.data.url);
    }



    return (
        <div className='row signup_page_styling pb-5'>
        <h1 className="text-center fw-bold mb-4" style={{textAlign:"center"}}>SignUp</h1>
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
            <Form onSubmit={handleSubmit(onFormSubmit)}>
                {imageUrl ? <img src={imageUrl} alt="" className='profile_pic_view d-block mx-auto border border-primary' /> :
                <img src="" alt="" className='profile_pic_view d-block mx-auto border border-primary' /> }
                <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label>Profile Photo</Form.Label>
                    <Form.Control type="file" label="photo" {...register("photo", {required:true})} onChange = {event => getImageUrl(event.target.files[0])}/>
                </Form.Group>
                {errors.photo?.type=="required" && <p className="text-danger fw-bold">* Profile Pic is required</p>}

                
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" {...register("name", {required:true})} />
                </Form.Group>
                {errors.name?.type=="required" && <p className="text-danger fw-bold">* Please Enter the name</p>}

                <Form.Group className="mb-3" >
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" placeholder="mobile number" {...register("mobile", {required:true, minLength:10, maxLength:10})} />
                </Form.Group>
                {errors.mobile?.type=="required" && <p className="text-danger fw-bold">* Please enter mobile nuber</p>}
                {errors.mobile?.type=="minLength" && <p className="text-danger fw-bold">* Invalid mobile nuber</p>}
                {errors.mobile?.type=="maxLength" && <p className="text-danger fw-bold">* Invalid mobile nuber</p>}


                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" {...register("username", {required:true})} />
                </Form.Group>
                {errors.username?.type=="required" && <p className="text-danger fw-bold">* username is required</p>}


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password", {required:true})}/>
                </Form.Group>
                {errors.password?.type=="required" && <p className="text-danger fw-bold">* Please Enter password is required</p>}


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" label="Email" placeholder="Email" {...register("email", {required:true})}/>
                </Form.Group>
                {errors.email?.type=="required" && <p className="text-danger fw-bold">* Email is required</p>}


                <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" label="City" placeholder="City" {...register("city", {required:true})}/>
                </Form.Group>
                {errors.city?.type=="required" && <p className="text-danger fw-bold">* Please enter city</p>}


                <button className='button-success d-block mx-auto fw-bold' type="submit">
                    Submit
                </button>
            </Form>
        </div>
        </div>
    );
}

export default SignUp;