import React from 'react';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';


function Gallery(props) {
    let navigate = useNavigate();
    return (
        <section class="gallery" id="gallery">

            <h1 class="heading"> our food <span> gallery </span> </h1>

            <div class="box-container">

                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350202/Items/g-1_c494gk.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350202/Items/g-2_zfhez9.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350202/Items/g-3_kbyugw.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350202/Items/g-4_lngl4y.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350202/Items/g-5_w2cyqk.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350202/Items/g-6_enn9tz.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350203/Items/g-7_oywhv9.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350203/Items/g-8_hzs46i.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>
                <div class="box">
                    <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647350203/Items/g-9_wdgor4.jpg" alt=""/>
                    <div class="content">
                        <h3>tasty food</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.</p>
                        <div href="#" class="button" onClick={() => navigate('/login')} >order now</div>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default Gallery;