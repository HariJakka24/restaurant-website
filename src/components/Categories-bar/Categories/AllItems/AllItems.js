import React from 'react';
import './AllItems.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { itemDetails } from '../../../../slices/itemSlice';
import EditItem from '../../../EditItem/EditItem';
import ItemCard from '../../../ItemCard/ItemCard';

function AllItems({editItemObj, ...props}) {
    let {itemsList} = useSelector(state => state.items);
    let {userObj} = useSelector(state => state.user);
    const [categoryItems, setcategoryItems] = useState(null);
    let dispatch = useDispatch();
    const [isOn, setisOn] = useState(false);


    useEffect(() => {
        if(itemsList){
            if(isOn){
                let filteredItems = itemsList.filter(item => item.itemType == "veg");
                setcategoryItems(filteredItems);
            }else{
                setcategoryItems(itemsList);
            }
        }
    }, [isOn, itemsList]);


    return (
        <div className="">
            <div class="form-check form-switch ms-auto me-4 veg_switch_button_styling" style={{width:"fit-content"}}>
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isOn} onChange={()=>setisOn(!isOn)}/>
                <label class="form-check-label" for="flexSwitchCheckDefault">veg Only</label>
            </div>
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
                        <p className="text-danger">No Biryanis available</p>
                    </div>
                    }
                </div> }
        </div>
        
    );
}

export default AllItems;