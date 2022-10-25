import React from 'react';
import './Special_dishes.css'

function Special_dishes(props) {
    return (
        <section class="speciality mx-auto" id="speciality">

        <h1 class="heading"> our <span data-testid = 'speciality-heading'>speciality</span> </h1>
    
        <div class="box-container">
    
            <div class="box" onClick={() => {props.setcategory("biryani"); props.setmodalShow(true)}}>
                <img class="image" src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647744551/Items/biryani_home_r4gaep.jpg" alt=""/>
                <div class="content">
                    <img src="" alt=""/>
                    <h3>tasty biryanis</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.</p>
                </div>
            </div>
            <div class="box" onClick={() => {props.setcategory("desserts"); props.setmodalShow(true)}}>
                <img class="image" src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647752498/Items/desserts_home_mml4tn.jpg" alt=""/>
                <div class="content">
                    <img src="" alt=""/>
                    <h3>tasty desserts</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.</p>
                </div>
            </div>
            <div class="box" onClick={() => {props.setcategory("ice creams"); props.setmodalShow(true)}}>
                <img class="image" src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647343169/Items/s-img-3_adejht.jpg" alt=""/>
                <div class="content">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647402817/Items/s-3_dkpsjf.png" alt=""/>
                    <h3>cold ice-cream</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.</p>
                </div>
            </div>
            <div class="box" onClick={() => {props.setcategory("beverages"); props.setmodalShow(true)}}>
                <img class="image" src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647343169/Items/s-img-4_ihgkoy.jpg" alt=""/>
                <div class="content">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647402817/Items/s-4_vg9uet.png" alt=""/>
                    <h3>Beverages</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.</p>
                </div>
            </div>
            <div class="box" onClick={() => {props.setcategory("soups"); props.setmodalShow(true)}}>
                <img class="image" src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647753047/Items/sopus_home_jcm81m.jpg" alt=""/>
                <div class="content">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647402817/Items/s-5_qejsoj.png" alt=""/>
                    <h3>tasty Soups</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.</p>
                </div>
            </div>
            <div class="box" onClick={() => {props.setcategory("breakfast"); props.setmodalShow(true)}}>
                <img class="image" src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647752973/Items/breakfast_home_w93t6n.png" alt=""/>
                <div class="content">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647402817/Items/s-6_pacjse.png" alt=""/>
                    <h3>healty breakfast</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.</p>
                </div>
            </div>
    
        </div>
    
    </section>
    );
}

export default Special_dishes;