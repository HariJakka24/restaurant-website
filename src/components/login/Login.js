import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import "./Login.css";
import { userLoginDetails } from '../../slices/userSlice';
import { getCartItems, removeCartItems } from '../../slices/userCartSlice';
import { getAddressesOfUser, removeAddresses } from '../../slices/userAddressSlice';

function Login(props) {
    let {register, handleSubmit, formState:{errors}} = useForm();
    let navigate = useNavigate();
    let {userObj,isUserLogin, isError, errMsg} = useSelector(state => state.user);
    let dispatch = useDispatch();

    useEffect(() => {
        if(isUserLogin == true){
            navigate(`/${userObj.usertype}profile/${userObj.username}`)
        }
    }, [userObj]);

    const onLoginSubmit = async (userCredObj) => {
        let actionObj = userLoginDetails(userCredObj);
        dispatch(actionObj)
    }

    useEffect(() => {
        if(userObj != null){
            dispatch(getCartItems(userObj));
            dispatch(getAddressesOfUser(userObj));
        }else{
            dispatch(removeCartItems());
            dispatch(removeAddresses());
        }
    }, [userObj]);

    return (
        <div className='row login_page_styling'>
        
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
        <h1 className="text-center fw-bold mb-3" style={{fontSize:"3.5rem"}}>Login</h1>

        {isError && <p className="display-6 fw-bold text-center text-danger">{errMsg}</p> }
            <Form onSubmit={handleSubmit(onLoginSubmit)}>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" {...register("username", {required:true})} />
                </Form.Group>
                {errors.username?.type=="required" && <p className="text-danger fw-bold">* username is required</p>}


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password", {required:true})}/>
                </Form.Group>
                {errors.password?.type=="required" && <p className="text-danger fw-bold">* Password is required</p>}


                <button className='d-block mx-auto button-success' type="submit">
                    Submit
                </button>
            </Form>
        </div>
        </div>
    );
}

export default Login;