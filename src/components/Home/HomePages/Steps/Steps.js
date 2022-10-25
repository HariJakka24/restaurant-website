import React from 'react';
import './Steps.css';
function Steps(props) {
    return (
        <div class="step-container">

    <h1 class="heading">how it <span>works</span></h1>

    <section class="steps">

        <div class="box">
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647349814/Items/step-1_hvmyub.jpg" alt=""/>
            <h3>choose your favorite food</h3>
        </div>
        <div class="box">
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647349814/Items/step-2_ya9e7v.jpg" alt=""/>
            <h3>free and fast delivery</h3>
        </div>
        <div class="box">
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647349814/Items/step-3_xpqmv6.jpg" alt=""/>
            <h3>easy payments methods</h3>
        </div>
        <div class="box">
            <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647349814/Items/step-4_yzwjrl.jpg" alt=""/>
            <h3>and finally, enjoy your food</h3>
        </div>
    
    </section>

</div>
    );
}

export default Steps;