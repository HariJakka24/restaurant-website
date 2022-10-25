import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Popular_dishes.css';
function Popular_dishes(props) {
    let navigate = useNavigate();
    return (
        <section class="popular" id="popular">

    <h1 class="heading"> most <span>popular</span> foods </h1>

    <div class="box-container">

        <div class="box">
            {/* <span class="price"> $5 - $20 </span> */}
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647744551/Items/biryani_home_r4gaep.jpg" alt=""/>
            <h3>Tasty Biryani</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
        </div>
        <div class="box">
            {/* <span class="price"> $5 - $20 </span> */}
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647347489/Items/p-2_adi4fg.jpg" alt=""/>
            <h3>tasty cakes</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div href="#" class="button" onClick={() => navigate('/login')}>order now</div>
        </div>
        <div class="box">
            {/* <span class="price"> $5 - $20 </span> */}
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647753047/Items/sopus_home_jcm81m.jpg" alt=""/>
            <h3>tasty Soup</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div href="#" class="button" onClick={() => navigate('/login')}>order now</div>
        </div>
        <div class="box">
            {/* <span class="price"> $5 - $20 </span> */}
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647752973/Items/breakfast_home_w93t6n.png" alt=""/>
            <h3>Dosa</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div href="#" class="button" onClick={() => navigate('/login')}>order now</div>
        </div>
        <div class="box">
            {/* <span class="price"> $5 - $20 </span> */}
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647347489/Items/p-5_vssl62.jpg" alt=""/>
            <h3>cold drinks</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div href="#" class="button" onClick={() => navigate('/login')}>order now</div>
        </div>
        <div class="box">
            {/* <span class="price"> $5 - $20 </span> */}
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647347489/Items/p-6_slnzbq.jpg" alt=""/>
            <h3>cold ice-cream</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div href="#" class="button" onClick={() => navigate('/login')}>order now</div>
        </div>

    </div>

</section>
    );
}

export default Popular_dishes;