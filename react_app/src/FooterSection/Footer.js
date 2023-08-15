import React from "react";
import './Footer.css';
const Footer = () => {
    return(
        <div className="FooterContainer" id='footerSection'>
            <div className="contactContainer">
                <h2>Contact</h2>
                <a href="mailto:sales@indpha.com">sales@indpha.com<br></br></a>
                <a href="mailto:support@indpha.com">support@indpha.com<br></br></a>
                <a href="mailto:press@tekion.com">press@tekion.com<br></br></a>
                <p>Tel: 833-835-4662</p>
            </div>
            <div className="companyContainer">
                <h2>Company</h2>
                <ul className="companyLinks">
                    <li><a href="https://www.google.com/">About Us</a></li>
                    <li><a href="https://www.google.com/">News</a></li>
                    <li><a href="https://www.google.com/">Career</a></li>
                    <li><a href="https://www.google.com/">Feedback</a></li>
                </ul>
            </div>
            <div className="customerHelpContainer">
                <h2>Customer Help</h2>
                <ul className="customerHelpLinks">
                    <li><a href="https://www.google.com/">Trust Portal</a></li>
                    <li><a href="https://www.google.com/">Legal</a></li>
                    <li><a href="https://www.google.com/">Privacy Policy</a></li>
                    <li><a href="https://www.google.com/">Do Not Sell My Information</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Footer;