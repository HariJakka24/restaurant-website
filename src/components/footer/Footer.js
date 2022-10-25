import React from 'react';
import "./Footer.css";

function Footer(props) {
    return (
        <div className="row mx-auto pt-5" style={{backgroundColor:"#212529", color:"white"}}>
            <div className="col-12 col-sm-6 col-md-3">
                <h5 className='fw-bold'>Our Social Media Links:</h5>
                <ul>
                    <li><a className='link' href="https://www.facebook.com/hari.anjaneyulu.3/" target="_blank"> <i className="fab fa-facebook"></i> Facebook</a></li>
                    <li><a className='link' href="https://twitter.com/" target="_blank"><i className="fab fa-twitter-square text-info"></i> Twitter</a></li>
                    <li><a className='link' href="https://www.instagram.com/harijakka24/" target="_blank"><i className="fab fa-instagram instagram"></i> Instagram</a></li>
                    <li><a className='link' href="https://www.youtube.com/watch?v=vwU6-diX9co" target="_blank"><i className="fab fa-youtube text-danger"></i> YouTube</a></li>
                    <li><a className='link' href="https://play.google.com/store/apps/details?id=com.Dominos&hl=en&shortlink=3e839899&pid=Brand-Home&c=brand-home" target="_blank"><i className="fab fa-google-play text-success"></i> Get App</a></li>
                </ul>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <h5 className='fw-bold'>Chat in Watsapp:</h5>
                <ul>
                    <li><a className='link' href="https://wa.me/7013671976">+91 7013671976</a></li>
                    <li><a className='link' href="https://wa.me/9010379293">+91 9010379293</a></li>
                </ul>
                <h5 className='fw-bold'>Mail Us at:</h5>
                <ul>
                    <li><a className='link' href="mailto: hari@example.com" target="_blank">hari@gmail.com</a></li>
                    <li><a className='link' href="mailto: harijakka24@example.com" target="_blank">harijakka24@gmail.com</a></li>
                </ul>
            </div>
            
            
            <div className="col-12 col-sm-6 col-md-3">
                <h5 className='fw-bold'>ABOUT:</h5>
                <ul>
                    <li><a className='link' href="#">About Us</a></li>
                    <li><a className='link' href="#">Careers</a></li>
                    <li><a className='link' href="#">Stories</a></li>
                    <li><a className='link' href="#">Corporate Information</a></li>
                </ul>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <h5 className='fw-bold'>Registered Office Address:</h5>
                <p className='text-primary'>
                    Food Garage Private Limited,<br/>
                    Anji Towers, Kadapa &<br/>
                    Outer Ring Road, Chennupalle Village,<br/>
                    Kadapa, 516217,<br/>
                    Andhra Pradesh, India<br/>
                    Telephone: 1800 202 9898
                </p>
            </div>
            <h5 className="text-primary text-center w-100 mx-auto">&copy; all copy rights belongs to "Hari Jakka"</h5>  
        </div>  
    );
}

export default Footer;