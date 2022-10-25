import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import EditAddress from '../EditAddress/EditAddress';
import {Button} from 'react-bootstrap'
import './ViewAddress.css';
import { getAddressesOfUser } from '../../slices/userAddressSlice';
import axios from 'axios';

function ViewAddress(props) {
    let {addressList} = useSelector(state => state.address);
    let {userObj} = useSelector(state => state.user);

    let dispatch = useDispatch();


    const [address, setaddress] = useState(null);
    const [ModalView, setModalView] = useState(false);
    const onHide = () => {
        setModalView(false);
        setaddress(null);
    }
    const deleteAddress = async (address) => {
        if (window.confirm("Address will be deleted")) {
            //get token
            let token = localStorage.getItem("token");
            let res = await axios.put(`http://localhost:5003/user/deleteaddress/${userObj.username}`, address, {
                headers:{ Authorization:"Bearer " + token}
            })
            alert(res.data.message);
            dispatch(getAddressesOfUser(userObj));
        } else {
        }
    }
    return (
        <div className='mt-4'>
            {addressList && <div>
                {addressList.length != 0 ? <div>
                        {
                            addressList.map(address => <div className='bg-light mb-5 shadow mx-auto border d-flex flex-column pt-4 pb-4 ps-5 pe-4' style={{height:"25vh", width:"75%"}} key={address._id}>
                                <h6>{(Object.values({...address, _id:""})).toString()}</h6>
                                <br />
                                <div className="me-4">
                                    <Button className="me-4 ps-2 pe-2 fw-bold" style={{backgroundColor:"transparent", color:"red"}} onClick ={() => {setaddress(address);setModalView(true)}} >EDIT</Button>
                                    <Button className="me-4 ps-2 pe-2 fw-bold" style={{backgroundColor:"transparent", color:"red"}} onClick={() => deleteAddress(address)}>DELETE</Button>
                                </div>
                            </div>)
                        }
                    </div> : <p className="text-danger text-center display-6">
                            No Addresses Added yet ....!
                        </p>
                }
                </div> 
            }
            {address && 
                <EditAddress
                    show={ModalView}
                    onHide={onHide}
                    addressObj={address}
                />
            }
        </div>
    );
}

export default ViewAddress;