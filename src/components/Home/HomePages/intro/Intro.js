import React from 'react';
import './intro.css';
import { useNavigate } from 'react-router-dom';



function Intro(props) {
    let navigate = useNavigate();
    return (
        // <div>
        //     <div className="row intro-styling mx-auto mt-3 p-5">
        //         <div className="col-12 col-md-7 intro-styling-box p-4 flex-column">
        //             <h1>WELCOME</h1>
        //             <h4>Food Made With Love</h4>
        //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque veniam</p>
        //             <button className='intro-button'>Order Now</button>
        //         </div>
        //         <div className="col-12 col-md-5 intro-styling-box">
        //             <img className='intro-image' src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647340490/Items/home-img_zqrkkg.png" alt="" />
                    
        //         </div>
        //     </div>
        // </div>
        <section class="home" id="home">

            <div class="content">
                <h3>food made with love</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas accusamus tempore temporibus rem amet laudantium animi optio voluptatum. Natus obcaecati unde porro nostrum ipsam itaque impedit incidunt rem quisquam eos!</p>
                <div onClick={() => navigate('/login')} class="button">order now</div>
            </div>

            <div class="image">
                <img src="https://res.cloudinary.com/dklq1vuce/image/upload/v1647340490/Items/home-img_zqrkkg.png" alt=""/>
            </div>

        </section>
    );
}

export default Intro;