import React, { useEffect } from 'react'
import './Footer.scss'

function Footer() {

    return (
        <>
            <div className="wrapp-footer">
                <div className="container-menu-footer">
                    <ul>
                        <p className="title-menu-footer">
                            Company
                        </p>
                        <li>
                            About Us
                        </li>
                        <li>
                            About Us
                        </li>
                        <li>
                            About Us
                        </li>
                    </ul>
                </div>
                <div className="footer-copy-right">
                    <p className="title-footer-copy-right">
                        © 2021 Permata Hospital. Developed by : Mohamad Ridwan Apriyadi
                    </p>

                    <div className="container-contact-us">
                        <p className="title-footer-copy-right">
                            Contact us on
                        </p>

                        <ul>
                            <li>
                                <a target='_blank' href="https://www.facebook.com/malingjemur/">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a target='_blank' href="https://www.instagram.com/ridwan.12">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a target='_blank' href="https://twitter.com/MohamadRidwan04">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer;