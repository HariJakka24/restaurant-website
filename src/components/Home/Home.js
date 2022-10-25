import React from 'react';
import "./Home.css";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { itemDetails } from '../../slices/itemSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown, Form, Button, Card} from 'react-bootstrap';
import Intro from './HomePages/intro/Intro';
import Gallery from './HomePages/Gallery/Gallery';
import Popular_dishes from './HomePages/Popular_dishes/Popular_dishes';
import Special_dishes from './HomePages/Special_dishes/Special_dishes';
import Steps from './HomePages/Steps/Steps';
import UserProfile from '../userProfile/UserProfile';
import StarRatings from 'react-star-ratings';
import ItemCard from '../ItemCard/ItemCard';
import ShowingItems from '../ShowingItems/ShowingItems';






function Home({handleChangeInInput,handleSearch, searchInput, searchResults, ...props}) {
    let {isUserLogin, userObj} = useSelector(state => state.user);


    const [items, setitems] = useState(null);
    let dispatch = useDispatch();
    let {itemsList} = useSelector(state => state.items);
    const [categoryItems, setcategoryItems] = useState(null);
    const [category, setcategory] = useState(null);
    const [modalShow, setmodalShow] = useState(false);

    useEffect( () => {
        dispatch(itemDetails());
    }, []);


    const [isOn, setisOn] = useState(false);


    useEffect(() => {
        if(category && itemsList){
            if(isOn){
                let filteredItems = itemsList.filter(item => item.category.toLowerCase().includes((category).toLowerCase()) && item.itemType == "veg");
                setcategoryItems(filteredItems);
            }else{
                let filteredItems = itemsList.filter(item => item.category.toLowerCase().includes((category).toLowerCase()));
                setcategoryItems(filteredItems);
            }
        }
    }, [isOn, itemsList, category]);


    const onHide = () => {
        setmodalShow(false);
        setcategoryItems(null);
        setcategory(null)
    }


    return (
        <div >
        {userObj ?  <div>
            <div className="d-flex mx-auto align-items-center p-1 search-bar bg-light mt-3 mb-3">
                    <input
                    type="search"
                    placeholder="Search"
                    className="ps-3 bg-light search-bar-input"
                    onChange={(e) => handleChangeInInput(e)}
                    />
                    <a href='' className='search-bar-button text-dark'><i className="fa-solid fa-magnifying-glass" onClick={(e)=>handleSearch(e, searchInput)}></i></a>
                </div>
                {searchResults && <div>
                {searchResults.length != 0 ? <div className="popular">
                    <h1 className="text-center text-success">Search Results</h1>
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

            <Nav className='justify-content-around'>
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

        </div> : <header>
            <Intro/>
            <Special_dishes setmodalShow={setmodalShow} setcategory={setcategory}/>
            <Popular_dishes />
            <Steps/>
            <Gallery/>
            {categoryItems && 
                <ShowingItems
                    show = {modalShow}
                    onHide = {onHide}
                    items = {categoryItems}
                    addItemToCart={props.addItemToCart} 
                    setEditObj={props.setEditObj} 
                    removeitem={props.removeitem}
                    category={category}
                    setisOn={setisOn}
                    isOn={isOn}
                />
            }
        </header> }



       




        </div>
        
    );
}

export default Home;