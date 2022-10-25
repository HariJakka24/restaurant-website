import React from 'react';
import {Navbar, Nav, Container, NavDropdown, Form, Button, Card} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {updateUserDetails, userLogout} from '../slices/userSlice';
import { useState } from 'react';
import axios from 'axios';
import './Navbarcomponents.css';
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile/EditProfile';
import { updatePaymentStatus } from '../slices/userCartSlice';
import { getActiveOrders, updateOrdersList } from '../slices/activeOrderSlice';
import {useEffect} from 'react';


function Navbarcomponents(props) {
    let {isUserLogin, userObj} = useSelector(state => state.user);
    let {itemsList} = useSelector(state => state.items);
    let {isPaid} = useSelector(state => state.cart);
    let {ordersList} = useSelector(state => state.activeorders);
    let {usercart} = useSelector(state => state.cart);
    const [cartLength, setcartLength] = useState(0);
    useEffect(() => {
        if(usercart) setcartLength(usercart.length)
    }, [usercart]);


    let dispatch = useDispatch();
    let navigate = useNavigate;

    


    const [Show, setShow] = useState(false);
    const [editUserObj, seteditUserObj] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const getImageUrl= async (files) => {
        //create formdata object
        let formData = new FormData();
        //append file
        formData.append("photo", files, files.name);
        let res = await axios.post("http://localhost:5003/user/getimageurl", formData)
        // let resObj = res.data;
        setImageUrl(res.data.url);
    }


    const setEditObj = async(userObj)=>{
        setShow(true)
        seteditUserObj({...editUserObj, ...userObj})
    }

    useEffect(() => {
        if(userObj) setImageUrl(userObj.profileImage);
        dispatch(getActiveOrders(userObj));
    }, [userObj]);

    //on completion of edit
    const afterEdit = async (editedObj) =>{
        setShow(false)
        seteditUserObj(null)
        if(editedObj != undefined){
            let updatedUserObj = {...userObj, ...editedObj, profileImage:imageUrl};
            console.log(updatedUserObj);
            let response = await axios.put('http://localhost:5003/user/save-editeduser', updatedUserObj);
            if(response.data.message == "user details updated"){
                alert("user details updated")
                dispatch(updateUserDetails(response.data.payload))
            }else{
                alert(response.data);
            }
        }   
    }

    
    const handleLogout = () =>{
        dispatch(userLogout());
        dispatch(updatePaymentStatus(false));
        dispatch(updateOrdersList())
    }
    
    return (
        <div className='header'>
            {/* navbar */}
            <Navbar collapseOnSelect className='navbar-dark' expand="sm" >
                <Container>
                <Navbar.Brand href="#home" >FOOD GARAGE</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <LinkContainer to ="/">
                        <Nav.Link >Home</Nav.Link>
                    </LinkContainer>
                    


                    {isUserLogin && <div>
                        {userObj.usertype == "user" ? <div className='d-flex'> <LinkContainer to ="/cart">
                        <Nav.Link className='cart_nav_link '>Cart <i class="fa-solid fa-cart-shopping cart_icon"><span className='cart_length_display'>{cartLength}</span></i></Nav.Link>
                    </LinkContainer> {ordersList && ordersList.length != 0 &&
                        <LinkContainer to ="/trackorder">
                        <Nav.Link >Track Order</Nav.Link>
                    </LinkContainer>
                    } </div>: <div className='d-flex'>
                        <LinkContainer to ="/addproduct">
                            <Nav.Link >Add Products</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to ="/activeorders">
                            <Nav.Link >Active Orders</Nav.Link>
                        </LinkContainer>
                    </div> }
                    </div>
                    }

                    {isUserLogin ? <LinkContainer to ="/login">
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </LinkContainer> : 
                        <LinkContainer to ="/login">
                        <Nav.Link >Login</Nav.Link>
                    </LinkContainer>
                    }

                    {!isUserLogin && <LinkContainer to ="/signup">
                        <Nav.Link >SignUp</Nav.Link>
                    </LinkContainer>}

                    {isUserLogin && <NavDropdown title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={()=>setEditObj(userObj)}>Edit Profile</NavDropdown.Item>
                            
                        {userObj && userObj.usertype == 'user' &&  
                            <LinkContainer to ="/orderhistory">
                            <NavDropdown.Item >view past orders</NavDropdown.Item>
                        </LinkContainer>
                        }
                        {userObj && userObj.usertype == 'user' &&  
                            <LinkContainer to ="/viewaddress">
                            <NavDropdown.Item >Addresses</NavDropdown.Item>
                        </LinkContainer>
                        }
                        {/* <NavDropdown.Item onClick={() => navigate('/orderhistory')}>View past Orders</NavDropdown.Item> */}

                        
                        {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                    </NavDropdown>}

                    {isUserLogin ? 
                        <Nav.Link className='p-2'>
                            {/* <Button onClick={()=>setEditObj(userObj)}>
                                <img className='d-block ms-auto' src={userObj.profileImage} width="30px" alt="" style={{borderRadius: "50% 50%"}}/>
                            </Button> */}
                            {/* <Link to={userObj.profileImage} > */}
                                <a href={userObj.profileImage} target="_blank"><img className='d-block navbar_profile_pic_styling' src={userObj.profileImage} alt=""/></a>
                                
                            {/* </Link> */}

                            {/* <div className="text-primary user-details bg-warning">
                                <span className="text-primary">{userObj.username}</span> <br />
                                <span className="text-end text-primary">{userObj.email}</span>
                            </div> */}
                            
                        </Nav.Link>
                         : 
                         <Nav.Link className='p-2'>
                            <img className='d-block ms-auto' width="30px" alt="" style={{borderRadius: "50% 50%"}} src="https://cdn3.vectorstock.com/i/1000x1000/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg" />
                        </Nav.Link>

                    }

                    


                    
                    
                    
                    
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            {editUserObj != undefined &&
                <EditProfile
                    show={Show}
                    setShow = {setShow}
                    userObj={editUserObj}
                    onHide={(editedUserObj) => afterEdit(editedUserObj)}
                    setImageUrl = {setImageUrl}
                    getImageUrl= {getImageUrl}
                    imageUrl={imageUrl}
                />
            }
            
        </div>
    );
}

export default Navbarcomponents;