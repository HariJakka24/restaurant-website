import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav/AdminNav';
import './AdminProfile.css';
function AdminProfile(props) {
    return (
        <div>

            {/* create links for userview and addproduct */}
            <Nav className='justify-content-around'>
                <LinkContainer to="userview">
                    <Nav.Link >User view</Nav.Link>
                </LinkContainer>
                <LinkContainer to = "addproduct">
                    <Nav.Link >Add Product</Nav.Link>
                </LinkContainer>
            </Nav>
            <div className="container">
                <Outlet/>
            </div>
            
        </div>
        // <div className="container-fluid">
        //     <div className="row">
        //         <div className="col-md-2">
        //         <AdminNav />
        //         </div>

        //         <div className="col-md-10">
        //         <h4>Admin Dashboard</h4>
        //         {/* {JSON.stringify(orders)} */}
        //         {/* <Orders orders={orders} handleStatusChange={handleStatusChange} /> */}
        //         </div>
        //     </div>
        // </div>
    );
}

export default AdminProfile;