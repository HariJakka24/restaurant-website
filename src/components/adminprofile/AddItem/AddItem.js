import React, {useState} from 'react';
import './AddItem.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';


function AddItem(props) {
    let {register, handleSubmit, formState:{errors}} = useForm();
    const [imageUrl, setImageUrl] = useState(null);

    const [file, setfile] = useState(null);
    let navigate = useNavigate();
    let {userObj} = useSelector(state => state.user);

    const [categoryValues, setcategoryValues] = useState(null);
    const [isError, setisError] = useState(true);

    const handleCategories = (e) => {
        setcategoryValues(e.map( category => category.label ))
        if(e.length == 0){
            setisError(true)
        }else{
            setisError(false)
        }
    }

    const onFormSubmit = async (itemObj) => {
        console.log(itemObj);
        console.log(categoryValues.toString());
        itemObj.category = categoryValues.toString();
        console.log(itemObj);
        let res = await axios.post("http://localhost:5003/item/createitem", {...itemObj, itemImage:imageUrl})
        let resObj = res.data;
        if(resObj.message == "item created"){
            alert(resObj.message)
            navigate(`/adminprofile/${userObj.username}`)
        }
        else{
            alert(resObj.message)
        }
        
    }

    const getImageUrl= async (files) => {
        //create formdata object
        let formData = new FormData();
        //append file
        formData.append("photo", files);
        let res = await axios.post("http://localhost:5003/user/getimageurl", formData)
        // let resObj = res.data;
        setImageUrl(res.data.url);
    }

    const categoryOptions = [
        {
            value:1,
            label:"Biryanis"
        },
        {
            value:2,
            label:"Soups"
        },
        {
            value:3,
            label:"Desserts"
        },
        {
            value:4,
            label:"Starters"
        },
        {
            value:5,
            label:"Beverages"
        },
        {
            value:6,
            label:"MainCourse"
        },
        {
            value:7,
            label:"Recommended"
        },
        {
            value:8,
            label:"Ice Creams"
        },
        {
            value:9,
            label:"Breakfasts"
        }
    ]


    return (
        <div className='row'>
            <div className="col-11 col-sm-8 col-md-6 mx-auto">
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" placeholder="Item Name" {...register("itemName", {required:true})} />
                    </Form.Group>
                    {errors.itemName?.type=="required" && <p className="text-danger fw-bold">* Item Name is required</p>}


                    {imageUrl ? <img src={imageUrl} alt="" className='profile_pic_view d-block mx-auto border border-primary' /> :
                    <img src="" alt="" className='profile_pic_view d-block mx-auto border border-primary' /> }

                    <Form.Group className="mb-3" >
                        <Form.Label>Item Image</Form.Label>
                        <Form.Control type="file" placeholder="image" {...register("itemImage", {required:true})} onChange = {event => getImageUrl(event.target.files[0])}/>
                    </Form.Group>
                    {errors.itemImage?.type=="required" && <p className="text-danger fw-bold">* Item Image is required</p>}


                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" {...register("description", {required:true})}/>
                    </Form.Group>
                    {errors.description?.type=="required" && <p className="text-danger fw-bold">* Description is required</p>}


                    <Form.Group className="mb-3" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price" {...register("price", {required:true})}/>
                    </Form.Group>
                    {errors.price?.type=="required" && <p className="text-danger fw-bold">* Price is required</p>}


                    <Form.Group className="mb-3" >
                        {/* <Form.Label>Category</Form.Label> */}
                        {/* <Form.Control type="text" placeholder="Category" {...register("category")}/> */}
                        {/* <Form.Select {...register("category", {required:true})}>
                            
                        </Form.Select> */}
                        <Select isMulti options = {categoryOptions} onChange={handleCategories}></Select>

                    </Form.Group>
                    {/* {errors.category?.type=="required" && <p className="text-danger fw-bold">* Category is required</p>} */}
                    {isError && <p className="text-danger fw-bold">* Category is required</p>}

                    
                    <Form.Group className="mb-3" >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="quantity" {...register("quantity", {required:true})} />
                    </Form.Group>
                    {errors.quantity?.type=="required" && <p className="text-danger fw-bold">* Quantity is required</p>}

                    <Form.Group className="mb-3" >
                        <Form.Label>Item Type</Form.Label>
                        <Form.Select {...register("itemType")}>
                            <option value="veg">VEG</option>
                            <option value="non-veg">NON-VEG</option>
                        </Form.Select>
                    </Form.Group>
                    {errors.itemType?.type=="required" && <p className="text-danger fw-bold">* Item Type is required</p>}
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddItem;