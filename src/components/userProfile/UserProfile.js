import React from 'react';
import './userProfile.css';
import { useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { Outlet } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown, Form, Button, Card} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import ItemCard from '../ItemCard/ItemCard';



function UserProfile({handleChangeInInput,handleSearch, searchInput, searchResults, ...props}) {
    let {userObj} = useSelector(state => state.user);
    return (
        <div className=''>
                <div className="d-flex">
                    <div className="d-flex mx-auto align-items-center p-1 search-bar bg-light mt-3 mb-3">
                        <input
                        type="search"
                        placeholder="Search"
                        className="ps-3 bg-light search-bar-input"
                        onChange={(e) => handleChangeInInput(e)}
                        />
                        <a href='' className='search-bar-button text-dark'><i className="fa-solid fa-magnifying-glass" onClick={(e)=>handleSearch(e, searchInput)}></i></a>
                    </div>
                    {/* <div className="d-flex align-items-center"input type="switch" value="veg" onChange={(e) => console.log(e)} label="Veg Only"/>
                    </div> */}
                    
                </div>
                
                {searchResults && <div> 
                {/* {searchResults.length != 0 ? <div className=" popular"> */}
                {searchResults.length != 0 ? <div className=" popular">
                <div class="box-container ">
                        {searchResults.map(item => 
                            <ItemCard item={item} addItemToCart={props.addItemToCart} setEditObj={props.setEditObj} removeitem={props.removeitem} /> 
                        )}
                        </div>
                </div>  : <div>
                    <p className="text-center text-danger display-6">No results found</p>
                </div>              
                }


            </div> }

            {/* create links for item categories */}
            <Nav className='justify-content-around shadow mb-4' style={{backgroundColor:"#D1E2C4"}}>
                <LinkContainer to="allitems">
                    <Nav.Link className='shadow bg-light nav_link_styling'>All</Nav.Link>
                </LinkContainer>

                <LinkContainer to="biryanis">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Biryanis</Nav.Link>
                </LinkContainer>
                <LinkContainer to = "desserts">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Desserts</Nav.Link>
                </LinkContainer>
                <LinkContainer to="beverages">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Beverages</Nav.Link>
                </LinkContainer>
                <LinkContainer to = "maincourse">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Main Course</Nav.Link>
                </LinkContainer>
                <LinkContainer to="recommended">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Recommended</Nav.Link>
                </LinkContainer>
                <LinkContainer to = "soups">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Soups</Nav.Link>
                </LinkContainer>
                <LinkContainer to="starters">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Starters</Nav.Link>
                </LinkContainer>
                <LinkContainer to="breakfast">
                    <Nav.Link className='shadow bg-light nav_link_styling'>Breakfast</Nav.Link>
                </LinkContainer>
            </Nav>
            <div className="container">
                <Outlet/>
            </div>
        </div>
    );
}

export default UserProfile;