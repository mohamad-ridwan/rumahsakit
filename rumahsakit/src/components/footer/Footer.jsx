import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Footer.scss'
import API from '../../services/api'
import { PathContext } from '../../services/context/path/Path'

function Footer() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataFooter, setDataFooter] = useState([])

    const history = useHistory()

    function setAllAPI() {
        API.APIGetFooter()
            .then(res => {
                setDataFooter(res.data)
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    function toPage(path) {
        history.push(`/${path}`)
        updateParams(`/${path}`)

        window.location = window.location
    }

    return (
        <>
            <div className="wrapp-footer">
                <div className="container-menu-footer">
                    {dataFooter && dataFooter.length > 0 ? dataFooter.map((e, i) => {

                        const getPages = e.pages

                        return (
                            <>
                                <ul key={e._id}>
                                    <p className="title-menu-footer">
                                        {e.title}
                                    </p>
                                    {getPages.length > 0 ? getPages.map((e, i) => {
                                        return (
                                            <>
                                                <li key={e._id} className="link-page-footer"
                                                    onClick={() => toPage(e.path)}
                                                >
                                                    {e.name}
                                                </li>
                                            </>
                                        )
                                    }) : (
                                        <div></div>
                                    )}
                                </ul>
                            </>
                        )
                    }) : (
                        <div></div>
                    )}
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