import axios from 'axios';
import React from 'react';
import './AddAddress.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressesOfUser, setAddressForDelivery } from '../../slices/userAddressSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {Form, Button} from 'react-bootstrap';


function AddAddress(props) {
    let dispatch = useDispatch();
    let {userObj} = useSelector(state => state.user);
    let navigate = useNavigate();
    let {register, handleSubmit, formState:{errors}} = useForm();

    const onAddressSubmit = async (address) => {
        console.log(address);
        let userAddressObj = {username:userObj.username, address:[address]};
        try{
            //get token
            let token = localStorage.getItem("token");
            let res = await axios.post("http://localhost:5003/user/add_address", userAddressObj, {
                headers:{ Authorization:"Bearer " + token}
            })
            alert(res.data.message);
            dispatch(getAddressesOfUser(userObj));
            navigate('/paymentpage');
        }
        catch(err){
            console.log(err);
        }
        
    }
    return (
        <div className='row'>
        
            <div className="col-11 col-sm-8 col-md-6 mx-auto">
                <Form onSubmit={handleSubmit(onAddressSubmit)}>
                    <Form.Group className="mb-3" >
                        <Form.Label>address line 1</Form.Label>
                        <Form.Control type="text" placeholder="address line 1" {...register("addressLine_1")} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>address line 2</Form.Label>
                        <Form.Control type="text" placeholder="address line 2" {...register("addressLine_2")}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>city</Form.Label>
                        <Form.Control type="text" placeholder="city" {...register("city")}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>pincode</Form.Label>
                        <Form.Control type="number" placeholder="pincode" {...register("pincode")}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        add address
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddAddress;