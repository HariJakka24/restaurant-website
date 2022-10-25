import React, { useState } from 'react';
import './ItemCard.css';
import StarRatings from 'react-star-ratings';
import {useSelector, useDispatch} from 'react-redux';
import SingleItemModal from '../SingleItemModal/SingleItemModal';


function ItemCard({item, ...props}) {
    let {userObj} = useSelector(state => state.user);
    const [modal, setmodal] = useState(false);
    const [singleItem, setsingleItem] = useState(null);
    


    return (
        <div class="box">
            <span class="price"><i class="fas fa-star"></i> {item.ratingAverage.toFixed(1)} </span>
            
             <span class="veg_display">
                {item.itemType == 'veg' ?
                    <i class="fa-regular fa-square-caret-up text-success"></i> : 
                    <i class="fa-regular fa-square-caret-up text-danger"></i>
                }
             </span>
            

            <img src={item.itemImage} alt="" onClick={() => {setsingleItem(item); setmodal(true)}} style={{cursor:"pointer"}} />
            <div className='' 
            // style={{height:"3.75rem"}}
            >
                <h3>{item.itemName}</h3>
            </div>
            
            <span class="text-primary" data-testid = 'item-price'>₹ {item.price} <br /> </span>
            {(item.ratingAverage <= 3 && item.ratingAverage > 2) && <StarRatings
                rating={item.ratingAverage}
                starRatedColor='yellow'
                numberOfStars={5}
                isSelectable={true}
                isAggregateRating={true}
                starDimension="20px"
                starSpacing='0'
            /> }
            {item.ratingAverage > 3 && <StarRatings
                rating={item.ratingAverage}
                starRatedColor='green'
                numberOfStars={5}
                isSelectable={true}
                isAggregateRating={true}
                starDimension="20px"
                starSpacing='0'
            /> }
            {item.ratingAverage <= 2 && <StarRatings
                rating={item.ratingAverage}
                starRatedColor='red'
                numberOfStars={5}
                isSelectable={true}
                isAggregateRating={true}
                starDimension="20px"
                starSpacing='0'
            /> }
            <br />
            {/* <p className='item-description text-muted'>{item.description}</p> */}
            {userObj == null ? <div className='button-primary' onClick={() => props.addItemToCart(item)}>

                Add to cart
            </div> : <div>
                {userObj.usertype=="user" ? <div>
                    {item.quantity > 0 ? <div className='button-primary' onClick={() => props.addItemToCart(item)}>
                        Add to cart
                    </div>: <p className="text-danger">Out of Stock</p> }
                </div> : <div>
                        {item.quantity <= 0 ? <p className="text-danger">Out of Stock</p> : <p className="text-success">Available</p>}
                        <div className='button-primary' onClick={()=>props.setEditObj(item)}>
                            Edit
                        </div>
                        <div className='button' onClick={() => props.removeitem(item)}>
                            delete
                        </div>
                    </div>
                }
            </div> }
            {/* <div className='button' >show</div> */}
            {singleItem && 
                <SingleItemModal
                    show = {modal}
                    // onHide= {onHide}
                    item = {singleItem}
                    setsingleItem = {setsingleItem}
                    setmodal={setmodal}
                />
            }
            
        </div>
    );
}

export default ItemCard;