import React from 'react';
import './Beverages.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { itemDetails } from '../../../../slices/itemSlice';
import EditItem from '../../../EditItem/EditItem';
import ItemCard from '../../../ItemCard/ItemCard';

function Beverages({editItemObj, ...props}) {
        let {itemsList} = useSelector(state => state.items);
    let {userObj} = useSelector(state => state.user);
    const [categoryItems, setcategoryItems] = useState(null);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(itemDetails());
        if(itemsList){
            let filteredItems = itemsList.filter(item => item.category.toLowerCase().includes(("Beverages").toLowerCase()));
            setcategoryItems(filteredItems);
        }
    }, []);


    return (
        <div className="">
            {categoryItems && <div>
                    {categoryItems.length != 0 ? <div className=" popular">
                    <div class="box-container">
                        {categoryItems.map(item => 
                            <ItemCard item={item} addItemToCart={props.addItemToCart} setEditObj={props.setEditObj} removeitem={props.removeitem} /> 
                        )}
                    </div>
                    {editItemObj != undefined &&
                            <EditItem
                                show={props.modalShow}
                                itemObj={editItemObj}
                                onHide={(editedItemObj) => props.afterEdit(editedItemObj)}
                                setfile = {props.setfile}
                                setImageUrl={props.setImageUrl}
                                imageUrl = {props.imageUrl}
                            />
                        }
                    </div> : <div>
                        <p className="text-danger">No Beverages available</p>
                    </div>
                    }
                </div> }
        </div>
        
    );
}

export default Beverages;